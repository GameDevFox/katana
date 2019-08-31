// reduce and expand
export const reduce = (x, start, end) => (x - start) / (end - start);
export const expand = (x, start, end) => (x * (end - start)) + start;

export const chainFns = fns => value => {
  fns.forEach(fn => (value = fn(value)));
  return value;
};

export const noOp = () => {};

export const on = (event, fn) => {
  const listener = (...args) => fn(...args);

  global.window.addEventListener(event, listener);
  return () => global.window.removeEventListener(event, listener);
};

export const Range = initial => {
  const range = initial ? [initial, initial] : [];
  let empty = initial === undefined;

  range.extend = value => {
    if(empty) {
      range.push(value, value);
      empty = false;
      return;
    }

    if(value < range[0])
      range[0] = value;
    if(value > range[1])
      range[1] = value;
  };

  range.min = () => range[0];
  range.max = () => range[1];
  range.width = () => range[1] - range[0];

  return range;
};
