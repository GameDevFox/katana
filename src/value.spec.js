import { expect } from 'chai';
import { fake } from 'sinon';

import { ComplexValue, Value } from './value';

it('Value', () => {
  const value = Value(123);

  expect(value()).to.equal(123);
  value(234);
  expect(value()).to.equal(234);

  let outputValue;
  const outputFn = value => (outputValue = value);
  const removeOutput = value.output(outputFn);
  expect(value.output()).to.deep.equal([outputFn]);

  expect(outputValue).to.be.undefined;
  value(345);
  expect(outputValue).to.equal(345);

  let outputValueB;
  value.output(value => (outputValueB = value * 2));
  value(456);
  expect(outputValue).to.equal(456);
  expect(outputValueB).to.equal(912);

  removeOutput();
  value(789);
  expect(outputValue).to.equal(456);
  expect(outputValueB).to.equal(1578);
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

  expect(x()).to.equal(144);
  a(12);
  expect(x()).to.equal(572);

  x.bind({ a: otherA });

  a(2);
  otherA(3);

  expect(aOut.args).to.deep.equal([[12], [2]]);
  expect(otherAOut.args).to.deep.equal([[3]]);

  expect(xOut.args).to.deep.equal([[572], [36], [108]]);
});
