export type Builder = (name: string) => any;
export type BuildFunction = (builder: Builder) => any;

export const AsyncBuilder = (config: { [key: string]: any }) => {
  const cache: { [key: string]: any } = {};

  const resolver = async (name: string) => {
    if(name in cache)
      return cache[name];

    if(!(name in config))
      throw new Error(`No such name in config: ${name}`);

    let value = config[name];

    let afterFn = (builder: Builder) => {};
    if(typeof value === 'function') {
      const after = (fn: BuildFunction) => (afterFn = fn);
      value = await value(resolver, after);
    }

    cache[name] = value;

    // Run afterFn is it's been set
    await afterFn(resolver);

    return value;
  };

  resolver.builder = (name: string, buildFn: BuildFunction) => config[name] = buildFn;

  resolver.literal = (name: string, value: any) => {
    if(typeof value === 'function')
      config[name] = () => value;
    else
      config[name] = value;
  };

  return resolver;
};
