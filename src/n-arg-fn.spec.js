import { NArgFn } from './n-arg-fn';

it('NArgFn', () => {
  const fn = NArgFn(
    () => 'Hello',
    first => `${first} world`,
    (first, second) => `${second} again ${first}`,
    null,
    (...list) => list.reverse(),
  );

  fn().should.equal('Hello');
  fn('one').should.equal('one world');
  fn(1, 'two').should.equal('two again 1');
  (() => {
    fn('a', 'b', 'c');
  }).should.throw();
  fn(...[1, 2, 3, 4]).should.deep.equal([4, 3, 2, 1]);
  (() => {
    fn(...'qwert'.split(''));
  }).should.throw();
});
