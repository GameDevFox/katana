export const Split = () => {
  let counter = 0;
  const outputs = new Map();

  const input = (...args) => {
    for(const output of outputs.values())
      output(...args);
  };

  const output = fn => {
    if(fn) {
      const outputId = ++counter;
      outputs.set(outputId, fn);
      return () => outputs.delete(outputId);
    }

    return Array.from(outputs.values());
  };

  return [input, output];
};

export const split = fn => {
  const [input, output] = Split();
  fn(input);

  return output;
};
