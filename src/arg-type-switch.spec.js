import { ArgTypeSwitch } from './arg-type-switch';

describe('ArgTypeSwitch', () => {
  it('should work', () => {
    const fn = ArgTypeSwitch({
      'arr:num': (arr, num) => `Alpha:${arr}:${num}`,
      'arr:num:str': (arr, num, str) => `Beta:${arr}:${num}:${str}`,
      'arr:num:fn': (arr, num, fn) => `Delta:${arr}:${num} - "${fn('Henry')}"`,
      'str:num:obj:arr:fn': () => 'Omega',
    });

    fn([1, 2, 3], 456).should.equal('Alpha:1,2,3:456');
    fn([7, 8, 9, 10], 1112, 'Hello World').should.equal('Beta:7,8,9,10:1112:Hello World');
    fn([4, 5, 6], 123, name => `Hi, ${name}!`).should.equal('Delta:4,5,6:123 - "Hi, Henry!"');
    fn('hello', 123, { name: 'John ' }, [4, 5, 6], () => {}).should.equal('Omega');
  });
});
