import { fake } from 'sinon';

import { Pipe } from './pipe';

describe('Pipe', () => {
  it('should work', () => {
    const fakeA = fake();
    const fakeB = fake();

    const [input, output] = Pipe();

    input(1);

    output(fakeA);
    input(2);

    output(fakeB);
    input(3);

    output(null);
    input(4);

    fakeA.args.should.deep.equal([[2]]);
    fakeB.args.should.deep.equal([[3]]);
  });

  it('should work the other way too', () => {
    const fakeA = fake();
    const fakeB = fake();
    const fakeC = fake();

    const [output, input] = Pipe();

    output(fakeA);

    let count = 10;
    input(fn => fn(count--));

    for(let i = 0; i < 5; i++)
      output(fakeB);

    input((value, fn) => fn(value * value));

    for(let i = 0; i < 5; i++)
      output(i, fakeC);

    fakeA.args.should.deep.equal([]);
    fakeB.args.should.deep.equal([[10], [9], [8], [7], [6]]);
    fakeC.args.should.deep.equal([[0], [1], [4], [9], [16]]);
  });
});
