import { expect } from 'chai';

import { Map } from './map';

it('Map', () => {
  const map = Map({ abc: 123 });
  expect(map()).to.deep.equal({ abc: 123 });
  expect(map('abc')).to.equal(123);
  expect(map('def')).to.be.undefined;

  map('def', 'another one');
  expect(map()).to.deep.equal({ abc: 123, def: 'another one' });
  expect(map('def')).to.equal('another one');
});
