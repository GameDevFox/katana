import { expect } from 'chai';
import { ArgCountSwitch } from './arg-count-switch';

it('ArgCountSwitch', () => {
  const fn = ArgCountSwitch(
    () => 'Hello',
    first => `${first} world`,
    (first, second) => `${second} again ${first}`,
    null,
    (...list) => list.reverse(),
  );

  expect(fn()).to.equal('Hello');
  expect(fn('one')).to.equal('one world');
  expect(fn(1, 'two')).to.equal('two again 1');
  expect(() => {
    fn('a', 'b', 'c');
  }).to.throw();
  expect(fn(...[1, 2, 3, 4])).to.deep.equal([4, 3, 2, 1]);
  expect(() => {
    fn(...'qwert'.split(''));
  }).to.throw();
});
