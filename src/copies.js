import { identity } from './utils';

export const copies = (count, fn = identity) => {
  const results = [];

  for(let i = 0; i < count; i++)
    results.push(fn(i));

  return results;
};

export const namedCopies = (count, nameFn, fn = identity) => {
  const results = {};

  for(let i = 0; i < count; i++) {
    const name = nameFn(i);
    if(name in results)
      throw new Error(`The nameFn generated a name that already exists: ${i} => ${name}`);

    results[name] = fn(i);
  }

  return results;
};
