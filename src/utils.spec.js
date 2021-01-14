import { expect } from 'chai';

import { reduce, expand, Range } from './utils';

it('reduce', () => {
  let myReduce = x => reduce(x, 10, 50);

  expect(myReduce(0)).to.equal(-0.25);
  expect(myReduce(5)).to.equal(-0.125);
  expect(myReduce(10)).to.equal(0);
  expect(myReduce(25)).to.equal(0.375);
  expect(myReduce(50)).to.equal(1);
  expect(myReduce(70)).to.equal(1.5);

  myReduce = x => reduce(x, 25, -15);

  expect(myReduce(-25)).to.equal(1.25);
  expect(myReduce(-15)).to.equal(1);
  expect(myReduce(0)).to.equal(0.625);
  expect(myReduce(15)).to.equal(0.25);
  expect(myReduce(25)).to.equal(0);
  expect(myReduce(35)).to.equal(-0.25);
});

it('expand', () => {
  let myExpand = x => expand(x, 10, 50);

  expect(myExpand(-0.25)).to.equal(0);
  expect(myExpand(-0.125)).to.equal(5);
  expect(myExpand(0)).to.equal(10);
  expect(myExpand(0.375)).to.equal(25);
  expect(myExpand(1)).to.equal(50);
  expect(myExpand(1.5)).to.equal(70);

  myExpand = x => expand(x, 25, -15);

  expect(myExpand(1.25)).to.equal(-25);
  expect(myExpand(1)).to.equal(-15);
  expect(myExpand(0.625)).to.equal(0);
  expect(myExpand(0.25)).to.equal(15);
  expect(myExpand(0)).to.equal(25);
  expect(myExpand(-0.25)).to.equal(35);
});

it('Range', () => {
  const initRange = Range(123);
  expect(initRange).to.deep.equal([123, 123]);

  const range = Range();
  expect(range).to.deep.equal([]);

  range.extend(5);
  expect(range).to.deep.equal([5, 5]);
  expect(range.width()).to.equal(0);

  range.extend(10);
  expect(range).to.deep.equal([5, 10]);
  expect(range.width()).to.equal(5);

  range.extend(2);
  expect(range).to.deep.equal([2, 10]);
  expect(range.width()).to.equal(8);

  range.extend(8);
  expect(range).to.deep.equal([2, 10]);
  expect(range.width()).to.equal(8);

  range.extend(-5);
  expect(range).to.deep.equal([-5, 10]);
  expect(range.width()).to.equal(15);

  expect(range.min()).to.equal(-5);
  expect(range.max()).to.equal(10);
});
