import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { AsyncBuilder, Builder } from './async-builder';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('AsyncBuilder', () => {
  it('should build', async () => {
    const build = AsyncBuilder({
      test: () => 10 + 20,
      msg: async (build: any) => `The ${await build('hello')} has ${await build('test')} people... that's ${await build('test')}!!!`,
      random: () => Math.random(),
    });

    build.literal('hello', 'world');
    build.literal('builder', (name: string) => `Good Morning, ${name}.`);
    build.literal('async-builder', async (name: string) => `Good Night, ${name}.`);

    build.builder('another', () => 123 + 456 * 789);
    build.builder('async-another', async (build: Builder) => `The test is ${await build('test')}, isn't it?`);

    expect(await build('test')).to.equal(30);
    expect(await build('msg')).to.equal(`The world has 30 people... that's 30!!!`);
    expect(await build('random')).to.equal(await build('random'));

    expect(await build('hello')).to.equal('world');
    expect((await build('builder'))('Adam')).to.equal('Good Morning, Adam.');
    expect(await (await build('async-builder'))('Adam')).to.equal('Good Night, Adam.');

    expect(await build('another')).to.equal(359907);
    expect(await build('async-another')).to.equal(`The test is 30, isn't it?`);

    await expect(build('not-found')).to.be.rejectedWith(`No such name in config: not-found`);
  });

  it('should support circular dependencies via after function', async () => {
    const build = AsyncBuilder({
      adam: (build: Builder, after: any) => {
        const adam = { name: 'Adam', spouse: null };
        after(async (build: Builder) => (adam.spouse = await build('eve')));
        return adam;
      },
      eve: (build: Builder, after: any) => {
        const eve = { name: 'Eve', spouse: null };
        after(async (build: Builder) => (eve.spouse = await build('adam')));
        return eve;
      },
    });

    const [adam, eve] = await Promise.all(['adam', 'eve'].map(build));
    expect(adam).to.deep.equal({ name: 'Adam', spouse: eve });
    expect(eve).to.deep.equal({ name: 'Eve', spouse: adam });
  });
});
