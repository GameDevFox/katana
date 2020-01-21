import { ArgCountSwitch } from './arg-count-switch';
import { Split } from './split';

export const Value = initial => {
  let value = initial;

  const [input, output] = Split();

  const result = ArgCountSwitch(
    () => value,
    newValue => {
      value = newValue;
      input(value);
    },
  );

  result.output = output;

  return result;
};

export const ComplexValue = (fn, initialDeps) => {
  const deps = {};
  const removeDepFns = {};

  const [input, output] = Split();

  const updateValue = () => {
    value = fn(deps);
    input(value);
  };

  let value = null;
  const result = ArgCountSwitch(
    () => value,
    () => updateValue(),
  );

  const unbindDep = name => {
    const removeFn = removeDepFns[name];

    if(removeFn)
      removeFn();
  };

  const unbind = () => Object.keys(deps).forEach(unbindDep);

  const bind = newDeps => {
    Object.keys(newDeps).forEach(unbindDep);
    Object.assign(deps, newDeps);
    Object.entries(newDeps).forEach(([name, dep]) => {
      removeDepFns[name] = dep.output(result);
    });

    updateValue();
  };

  if(initialDeps)
    bind(initialDeps);

  result.bind = bind;
  result.unbind = unbind;
  result.output = output;

  return result;
};
