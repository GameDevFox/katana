import { noOp } from './utils';

export const Var = initial => {
  let value = initial;
  let updateFn = noOp;

  const result = newValue => {
    if(newValue) {
      value = newValue;
      updateFn(value);
    } else {
      return value;
    }
  };

  result.update = newFn => (updateFn = newFn);

  return result;
};

export const Val = (fn, deps) => {
  const v = Var(fn(deps));

  const recalc = () => v(fn(deps));
  Object.values(deps).forEach(dep => dep.update(recalc));

  const result = () => v();
  result.update = v.update;

  return result;
};
