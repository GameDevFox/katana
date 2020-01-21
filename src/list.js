import { ArgCountSwitch } from './arg-count-switch';
import { Split } from './split';

export const List = (initial = []) => {
  const list = initial;

  const [input, output] = Split();

  const result = ArgCountSwitch(
    () => list,
    item => {
      list.push(item);
      input(list);
    },
  );

  result.output = output;

  return result;
};
