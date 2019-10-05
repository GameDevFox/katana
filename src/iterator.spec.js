import { Iterator } from './iterator';

describe('Iterator', () => {
  it('should work', () => {
    const originalList = [1, 2, 3, 'a', 'b', 'c'];
    const iterator = Iterator(originalList);

    const list = [];
    while(!iterator.isDone())
      list.push(iterator());

    list.should.deep.equal(originalList);
  });
});
