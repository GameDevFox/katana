import { NArgFn } from './n-arg-fn';

export const Map = (initial = {}) => {
  const map = initial;

  const result = NArgFn(
    () => map,
    key => map[key],
    (key, value) => (map[key] = value),
  );

  result.each = fn => Object.entries(map).forEach(([key, value]) => fn(key, value));
  result.map = fn => Object.entries(map).map(([key, value]) => fn(key, value));

  result.has = key => key in map;
  result.delete = key => delete map[key];

  return result;
};
