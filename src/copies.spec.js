import { expect } from 'chai';

import { copies, namedCopies } from './copies';
import { identity } from './utils';

describe('copies', () => {
  it('copies (unnamed)', () => {
    let result = copies(5, identity);
    expect(result).to.deep.equal([0, 1, 2, 3, 4]);

    result = copies(5, i => `Hello ${i + 1}`);
    expect(result).to.deep.equal([
      'Hello 1',
      'Hello 2',
      'Hello 3',
      'Hello 4',
      'Hello 5',
    ]);
  });

  it('namedCopies', () => {
    let result = namedCopies(4);
    expect(result).to.deep.equal({
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    });

    result = namedCopies(4, (name, index) => {
      const number = (index + 1) * 2;
      return `myCopy${name.toUpperCase()}:${number}`;
    });
    expect(result).to.deep.equal({
      a: 'myCopyA:2',
      b: 'myCopyB:4',
      c: 'myCopyC:6',
      d: 'myCopyD:8',
    });

    result = namedCopies(4, index => `copy${(index + 1) * 2}`, identity);
    expect(result).to.deep.equal({
      copy2: 'copy2',
      copy4: 'copy4',
      copy6: 'copy6',
      copy8: 'copy8',
    });
  });
});
