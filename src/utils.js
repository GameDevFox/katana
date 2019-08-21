export const noOp = () => {};

export const on = (event, fn) => {
  const listener = (...args) => fn(...args);

  global.window.addEventListener(event, listener);
  return () => global.window.removeEventListener(event, listener);
};

export const chainFns = fns => value => {
  fns.forEach(fn => (value = fn(value)));
  return value;
};
