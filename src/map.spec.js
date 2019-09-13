import { expect } from 'chai';

import { Map } from './map';

it('Map', () => {
  const map = Map({ abc: 123 });
  map().should.deep.equal({ abc: 123 });
  map('abc').should.equal(123);
  expect(map('def')).to.be.undefined;

  map('def', 'another one');
  map().should.deep.equal({ abc: 123, def: 'another one' });
  map('def').should.equal('another one');
});
