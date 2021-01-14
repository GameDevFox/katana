import { expect } from 'chai';

import { ArgTypeSwitch } from './arg-type-switch';

describe('ArgTypeSwitch', () => {
  it('should work', () => {
    const fn = ArgTypeSwitch({
      'arr:num': (arr, num) => `Alpha:${arr}:${num}`,
      'arr:num:str': (arr, num, str) => `Beta:${arr}:${num}:${str}`,
      'arr:num:fn': (arr, num, fn) => `Delta:${arr}:${num} - "${fn('Henry')}"`,
      'str:num:obj:arr:fn': () => 'Omega',
    });

    expect(fn([1, 2, 3], 456)).to.equal('Alpha:1,2,3:456');
    expect(fn([7, 8, 9, 10], 1112, 'Hello World')).to.equal('Beta:7,8,9,10:1112:Hello World');
    expect(fn([4, 5, 6], 123, name => `Hi, ${name}!`)).to.equal('Delta:4,5,6:123 - "Hi, Henry!"');
    expect(fn('hello', 123, { name: 'John ' }, [4, 5, 6], () => {})).to.equal('Omega');
  });
});
