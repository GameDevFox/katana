import { fake } from 'sinon';

import { copies } from './copies';
import { Switch } from './switch';

describe('Switch', () => {
  it('should work', () => {
    const sw = Switch();

    const outEven = sw.path(value => value % 2 === 0);
    const outNegative = sw.path(value => value < 0);
    const outSmall = sw.path(value => value > 0 && value < 10);
    const outLarge = sw.path(value => value >= 10);
    const outPositive = sw.path(value => value > 0);

    const [fakeEven, fakeNegative, fakeLarge, fakeSmall, fakePositive] = copies(5, () => fake());

    outEven(fakeEven);
    outNegative(fakeNegative);
    outSmall(fakeSmall);
    outLarge(fakeLarge);
    outPositive(fakePositive);

    sw('missing');

    for(let i = -5; i < 15; i++) {
      sw.switch(i);
      sw(i);
    }

    fakeEven.args.should.deep.equal([[-4], [-2], [0], [2], [4], [6], [8], [10], [12], [14]]);
    fakeNegative.args.should.deep.equal([[-5], [-3], [-1]]);
    fakeSmall.args.should.deep.equal([[1], [3], [5], [7], [9]]);
    fakeLarge.args.should.deep.equal([[11], [13]]);
    fakePositive.args.should.deep.equal([]);
  });
});
