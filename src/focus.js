import { Split } from './split';
import { on } from './utils';

export const Focus = (target = global) => {
  const [input, output] = Split();

  on(target, 'focus', () => input(true));
  on(target, 'blur', () => input(false));

  return output;
};
