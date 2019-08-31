import { Value } from './value';

// export const time = () => Date.now() / 1000;
export const time = () => window.performance.now() / 1000;

export const Time = () => {
  const v = Value(time());

  const result = update => update ? v(time()) : v();
  result.update = v.update;

  return result;
};
