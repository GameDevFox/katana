export const Pipe = () => {
  let target = null;

  const active = (...args) => {
    if(!target)
      throw new Error('No target to call for this pipe');

    return target(...args);
  };

  const passive = (...args) => {
    if(args.length === 0)
      return target;

    const [fn] = args;
    target = fn;
  };

  return [active, passive];
};
