import { NArgFn } from './n-arg-fn';

export const Map = (base = {}) => {
  const map = base;

  const result = NArgFn(
    () => map,
    key => {
      if(typeof key === 'function')
        return Object.entries(map).map(([k, v]) => key(k, v));

      return map[key];
    },
    (key, value) => (map[key] = value),
  );

  result.delete = key => delete map[key];

  return result;
};
