import { NArgFn } from './n-arg-fn';
import { Split } from './split';

export const List = (initial = []) => {
  const list = initial;

  const [input, output] = Split();

  const result = NArgFn(
    () => list,
    item => {
      list.push(item);
      input(list);
    },
  );

  result.output = output;

  return result;
};
