import { expect } from 'chai';

import { reduce, expand, Range } from './utils';

it('reduce', () => {
  let myReduce = x => reduce(x, 10, 50);

  myReduce(0).should.equal(-0.25);
  myReduce(5).should.equal(-0.125);
  myReduce(10).should.equal(0);
  myReduce(25).should.equal(0.375);
  myReduce(50).should.equal(1);
  myReduce(70).should.equal(1.5);

  myReduce = x => reduce(x, 25, -15);

  myReduce(-25).should.equal(1.25);
  myReduce(-15).should.equal(1);
  myReduce(0).should.equal(0.625);
  myReduce(15).should.equal(0.25);
  myReduce(25).should.equal(0);
  myReduce(35).should.equal(-0.25);
});

it('expand', () => {
  let myExpand = x => expand(x, 10, 50);

  myExpand(-0.25).should.equal(0);
  myExpand(-0.125).should.equal(5);
  myExpand(0).should.equal(10);
  myExpand(0.375).should.equal(25);
  myExpand(1).should.equal(50);
  myExpand(1.5).should.equal(70);

  myExpand = x => expand(x, 25, -15);

  myExpand(1.25).should.equal(-25);
  myExpand(1).should.equal(-15);
  myExpand(0.625).should.equal(0);
  myExpand(0.25).should.equal(15);
  myExpand(0).should.equal(25);
  myExpand(-0.25).should.equal(35);
});

it('Range', () => {
  const initRange = Range(123);
  expect(initRange).to.deep.equal([123, 123]);

  const range = Range();
  expect(range).to.deep.equal([]);

  range.extend(5);
  range.should.deep.equal([5, 5]);
  range.width().should.equal(0);

  range.extend(10);
  range.should.deep.equal([5, 10]);
  range.width().should.equal(5);

  range.extend(2);
  range.should.deep.equal([2, 10]);
  range.width().should.equal(8);

  range.extend(8);
  range.should.deep.equal([2, 10]);
  range.width().should.equal(8);

  range.extend(-5);
  range.should.deep.equal([-5, 10]);
  range.width().should.equal(15);

  range.min().should.equal(-5);
  range.max().should.equal(10);
});
