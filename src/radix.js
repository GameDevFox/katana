const numbers = [];
for(let i = 0; i < 26; i++)
  numbers.push(i);

export const numeric = numbers.slice(0, 10).map(x => x.toString());
export const alphaUpper = numbers.map(x => String.fromCharCode(0x41 + x));
export const alphaLower = numbers.map(x => String.fromCharCode(0x61 + x));

export const Radix = base => {
  if(typeof base === 'number') {
    if(base > 36)
      throw new Error('If `base` is a number it can\'t be more than 36');

    base = numeric.concat(alphaLower).slice(0, base);
  } else if(typeof base === 'string')
    base = base.split('');

  const split = modSplit(base.length);

  return value => {
    let mod = split(value);
    if(value === 0)
      mod = ['0'];

    return mod.map(x => base[x]).join('');
  };
};

export const modSplit = base => num => {
  const result = [];

  let index = 1;
  while(num > 0) {
    const value = Math.pow(base, index);
    const lowerValue = Math.pow(base, index - 1);

    const rem = num % value;
    num -= rem;

    const final = rem / lowerValue;
    result.unshift(final);

    index++;
  }

  return result;
};
