import _ from 'lodash';

export const diff = (a, b) => {
  if(a === b)
    return null;

  const result = {};

  Object.entries(a).forEach(([key, aVal]) => {
    const bVal = b[key];

    if(aVal === bVal)
      return;

    let delta;
    if(_.isPlainObject(bVal))
      delta = diff(aVal, bVal);
    else
      delta = bVal;

    result[key] = delta;
  });

  return result;
};

export const apply = (obj, delta) => {
  if(delta === null)
    return obj;

  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    let newVal = value;

    if(key in delta) {
      const deltaVal = delta[key];

      if(deltaVal === undefined)
        return;

      newVal = _.isPlainObject(deltaVal) ? apply(newVal, deltaVal) : deltaVal;
    }

    result[key] = newVal;
  });

  // Add new properties
  Object.entries(delta).forEach(([key, value]) => {
    if(!(key in obj))
      result[key] = value;
  });

  return result;
};
