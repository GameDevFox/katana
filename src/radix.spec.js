import { expect } from 'chai';

import { Radix, alphaUpper, modSplit } from './radix';

describe('Radix', () => {
  it('should work', () => {
    Radix(12)(0).should.equal('0');

    Radix(16)(0x1234).should.equal('1234');
    Radix(16)(0xa0b1c2d3e4f5).should.equal('a0b1c2d3e4f5');

    Radix(alphaUpper.slice(0, 16))(0xa0b1c2d3e4f5).should.equal('KALBMCNDOEPF');

    Radix('!@#$%^&*()')(9876543210).should.equal(')(*&^%$#@!');
    Radix('QWERTY')(123456789).should.equal('EQWRQQRYWWR');

    // With mapFn
    const mapFn = base => value => `[${base[value].toUpperCase()}]`;
    Radix('zxcvbnm')(11228800).should.equal('xmbvznzxc');
    Radix('zxcvbnm', mapFn)(11228800).should.equal('[X][M][B][V][Z][N][Z][X][C]');
  });

  it('should throw error is base is too high', () => {
    expect(() => {
      Radix(36);
    }).to.not.throw();

    expect(() => {
      Radix(37);
    }).to.throw('If `base` is a number it can\'t be more than 36');
  });
});

describe('modSplit', () => {
  it('should work', () => {
    modSplit(20)(0).should.deep.equal([0]);

    modSplit(2)(0xaa).should.deep.equal([1, 0, 1, 0, 1, 0, 1, 0]);
    modSplit(7)(0x1234567).should.deep.equal([3, 2, 1, 1, 5, 2, 2, 1, 2]);
    modSplit(16)(0xba987654321).should.deep.equal([11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
