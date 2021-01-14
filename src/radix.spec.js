import { expect } from 'chai';

import { Radix, alphaUpper, modSplit } from './radix';

describe('Radix', () => {
  it('should work', () => {
    expect(Radix(12)(0)).to.equal('0');

    expect(Radix(16)(0x1234)).to.equal('1234');
    expect(Radix(16)(0xa0b1c2d3e4f5)).to.equal('a0b1c2d3e4f5');

    expect(Radix(alphaUpper.slice(0, 16))(0xa0b1c2d3e4f5)).to.equal('KALBMCNDOEPF');

    expect(Radix('!@#$%^&*()')(9876543210)).to.equal(')(*&^%$#@!');
    expect(Radix('QWERTY')(123456789)).to.equal('EQWRQQRYWWR');

    // With mapFn
    const mapFn = base => value => `[${base[value].toUpperCase()}]`;
    expect(Radix('zxcvbnm')(11228800)).to.equal('xmbvznzxc');
    expect(Radix('zxcvbnm', mapFn)(11228800)).to.equal('[X][M][B][V][Z][N][Z][X][C]');
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
    expect(modSplit(20)(0)).to.deep.equal([0]);

    expect(modSplit(2)(0xaa)).to.deep.equal([1, 0, 1, 0, 1, 0, 1, 0]);
    expect(modSplit(7)(0x1234567)).to.deep.equal([3, 2, 1, 1, 5, 2, 2, 1, 2]);
    expect(modSplit(16)(0xba987654321)).to.deep.equal([11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
