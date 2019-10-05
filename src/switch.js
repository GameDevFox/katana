import { Split } from './split';
import { noOp } from './utils';
import { Value } from './value';

export const Switch = initial => {
  const switchValue = initial || Value();
  const paths = [];

  let pathInput = noOp;

  const result = value => {
    pathInput(value);
  };

  const updatePathInput = value => {
    for(const [fn, input] of paths) {
      if(fn(value)) {
        pathInput = input;
        return;
      }
    }

    pathInput = noOp;
  };

  result.switch = switchValue;
  switchValue.output(updatePathInput);

  result.path = fn => {
    const [input, output] = Split();
    paths.push([fn, input]);

    updatePathInput(switchValue());

    return output;
  };

  return result;
};
