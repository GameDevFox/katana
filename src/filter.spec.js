import { expect } from 'chai';
import { fake } from 'sinon';

import { Filter } from './filter';
import { Value } from './value';

describe('Filter', () => {
  it('should work', () => {
    const val = Value();

    const filter1 = Filter(value => value === 1);
    const filter2to9 = Filter(value => value >= 2 && value <= 9);
    const filterOver100 = Filter(value => value > 100);
    const filterEven = Filter(value => value % 2 === 0);

    [filter1, filter2to9, filterOver100, filterEven]
      .forEach(filter => val.output(filter));

    const [fake1, fake2to9, fakeOver100, fakeEven] =
      [fake(), fake(), fake(), fake()];

    filter1.output(fake1);
    filter2to9.output(fake2to9);
    filterOver100.output(fakeOver100);
    filterEven.output(fakeEven);

    val('hello');

    val(1);
    expect(fake1.args[0]).to.deep.equal([1]);

    val(6);
    expect(fake2to9.args[0]).to.deep.equal([6]);
    expect(fakeEven.args[0]).to.deep.equal([6]);

    val(105);
    expect(fakeOver100.args[0]).to.deep.equal([105]);

    val(200);
    expect(fakeOver100.args[1]).to.deep.equal([200]);
    expect(fakeEven.args[1]).to.deep.equal([200]);

    val(51);

    expect(fake1.args).to.deep.equal([[1]]);
    expect(fake2to9.args).to.deep.equal([[6]]);
    expect(fakeOver100.args).to.deep.equal([[105], [200]]);
    expect(fakeEven.args).to.deep.equal([[6], [200]]);
  });
});
