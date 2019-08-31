import { expect } from 'chai';
import { fake } from 'sinon';

import { ComplexValue, Value } from './value';

it('Value', () => {
  const value = Value(123);

  value().should.equal(123);
  value(234);
  value().should.equal(234);

  let outputValue;
  const outputFn = value => (outputValue = value);
  const removeOutput = value.output(outputFn);
  value.output().should.deep.equal([outputFn]);

  expect(outputValue).to.be.undefined;
  value(345);
  outputValue.should.equal(345);

  let outputValueB;
  value.output(value => (outputValueB = value * 2));
  value(456);
  outputValue.should.equal(456);
  outputValueB.should.equal(912);

  removeOutput();
  value(789);
  outputValue.should.equal(456);
  outputValueB.should.equal(1578);
});

it('ComplexValue', () => {
  const a = Value(4);
  const b = Value(10);
  const c = Value(26);

  const otherA = Value(1);

  const aOut = fake();
  const otherAOut = fake();

  a.output(aOut);
  otherA.output(otherAOut);

  const x = ComplexValue(({ a, b, c }) => {
    if(a() > 10)
      return (a() + b()) * c();

    return (c() + b()) * a();
  }, { a, b, c });

  const xOut = fake();
  x.output(xOut);

  x().should.equal(144);
  a(12);
  x().should.equal(572);

  x.bind({ a: otherA });

  a(2);
  otherA(3);

  aOut.args.should.deep.equal([[12], [2]]);
  otherAOut.args.should.deep.equal([[3]]);

  xOut.args.should.deep.equal([[572], [36], [108]]);
});
