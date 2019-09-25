import { NArgFn } from './n-arg-fn';
import { Split } from './split';
import { on } from './utils';

export const Keyboard = (target = global) => {
  let keys = {};

  const [changeInput, change] = Split();
  const [downInput, down] = Split();
  const [upInput, up] = Split();

  on(target, 'keydown', ({ code: key, repeat }) => {
    if(repeat)
      return;

    keys[key] = true;

    changeInput({ key, value: true });
    downInput(key);
  });

  on(target, 'keyup', ({ code: key }) => {
    delete keys[key];

    changeInput({ key, value: false });
    upInput(key);
  });

  const result = NArgFn(
    () => keys,
    key => keys[key],
  );

  result.clear = () => {
    keys = {};
    changeInput({});
  };

  result.output = { change, down, up };

  return result;
};
