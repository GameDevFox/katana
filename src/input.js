import { on } from './utils';
import { Value } from './value';

export const Keys = (target = global) => {
  const keys = {};

  const addKey = code => {
    const key = Value();
    keys[code] = key;
    return key;
  };

  on(target, 'keydown', ({ code }) => {
    let key = keys[code];

    // Create key value if it doesn't exist
    if(!key)
      key = addKey(code);

    // Prevent repeating `true` values from being send
    if(key())
      return;

    // Send update
    key(true);
  });

  on(target, 'keyup', ({ code }) => {
    let key = keys[code];

    if(!key)
      key = addKey(code);

    key(false);
  });

  return (...args) => {
    if(args.length === 0)
      return keys;

    const [code] = args;
    let key = keys[code];

    // Create key value if it doesn't exist
    if(!key) {
      key = Value(false);
      keys[code] = key;
    }

    return key;
  };
};
