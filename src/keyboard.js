import { NArgFn } from './n-arg-fn';
import { Split } from './split';
import { on } from './utils';
import { Value } from './value';

export const Keyboard = (target = global) => {
  const keys = {};

  const [changeInput, change] = Split();
  const [downInput, down] = Split();
  const [upInput, up] = Split();

  const getKey = key => {
    let keyVar = keys[key];
    if(!keyVar) {
      keyVar = Value(false);
      keys[key] = keyVar;
    }

    return keyVar;
  };

  on(target, 'keydown', ({ code: key, repeat }) => {
    if(repeat)
      return;

    getKey(key)(true);

    changeInput({ key, value: true });
    downInput(key);
  });

  on(target, 'keyup', ({ code: key }) => {
    getKey(key)(false);

    changeInput({ key, value: false });
    upInput(key);
  });

  const result = NArgFn(
    () => keys,
    getKey,
  );

  result.clear = () => {
    Object.values(keys).forEach(value => value(false));
    changeInput({});
  };

  result.output = { change, down, up };

  return result;
};
