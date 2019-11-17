import { copies, namedCopies } from './copies';
import { identity } from './utils';

describe('copies', () => {
  it('copies (unnamed)', () => {
    let result = copies(5, identity);
    result.should.deep.equal([0, 1, 2, 3, 4]);

    result = copies(5, i => `Hello ${i + 1}`);
    result.should.deep.equal([
      'Hello 1',
      'Hello 2',
      'Hello 3',
      'Hello 4',
      'Hello 5',
    ]);
  });

  it('namedCopies', () => {
    let result = namedCopies(4, x => `copy${x + 1}`);
    result.should.deep.equal({
      copy1: 0,
      copy2: 1,
      copy3: 2,
      copy4: 3,
    });

    result = namedCopies(4, i => `${i}custom-name${i}`);
    result.should.deep.equal({
      '0custom-name0': 0,
      '1custom-name1': 1,
      '2custom-name2': 2,
      '3custom-name3': 3,
    });
  });
});
