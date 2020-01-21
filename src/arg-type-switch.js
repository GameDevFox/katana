const typeMap = {
  number: 'number',
  num: 'number',
  n: 'number',

  string: 'string',
  str: 'string',
  s: 'string',

  array: 'array',
  arr: 'array',
  a: 'array',

  object: 'object',
  obj: 'object',
  o: 'object',

  function: 'function',
  func: 'function',
  fun: 'function',
  fn: 'function',
  f: 'function',
};

const buildFnTree = config => {
  const fnTree = {};

  Object.entries(config).forEach(([argTypeStr, fn]) => {
    const argTypes = argTypeStr.split(':').map(type => typeMap[type]);

    let subTree = fnTree;
    argTypes.forEach(argType => {
      if(!(argType in subTree))
        subTree[argType] = {};

      subTree = subTree[argType];
    });

    subTree.fn = fn;
  });

  return fnTree;
};

const getType = value => {
  let type = typeof (value);

  if(type === 'object' && Array.isArray(value))
    type = 'array';

  return type;
};

export const ArgTypeSwitch = config => {
  const fnTree = buildFnTree(config);

  return (...args) => {
    const types = args.map(getType);
    types.push('fn');

    let subTree = fnTree;
    types.forEach(type => {
      if(!(type in subTree))
        throw new Error(`No handler defined for (${types.join(', ')})`);

      subTree = subTree[type];
    });

    // subTree is now the function we want
    return subTree(...args);
  };
};
