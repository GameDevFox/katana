import { Split } from './split';

export const Filter = fn => {
  const [input, output] = Split();

  const result = value => {
    if(fn(value))
      input(value);
  };

  result.output = output;

  return result;
};
