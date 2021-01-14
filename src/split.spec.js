import { expect } from 'chai';
import { fake } from 'sinon';

import { Split } from './split';

it('Split', () => {
  const [split, output] = Split();

  split(1);

  const fakeA = fake();
  const removeA = output(fakeA);
  split(2);

  const fakeB = fake();
  const removeB = output(fakeB);
  split(3);

  const fakeC = fake();
  const removeC = output(fakeC);
  split(4);

  removeC();
  split(5);

  removeB();
  split(6);

  removeA();
  split(7);

  expect(fakeA.args).to.deep.equal([[2], [3], [4], [5], [6]]);
  expect(fakeB.args).to.deep.equal([[3], [4], [5]]);
  expect(fakeC.args).to.deep.equal([[4]]);
});
