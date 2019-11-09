export const order = orderMap => {
  const afterMeMap = {};
  Object.entries(orderMap).forEach(([key, value]) => {
    const { afterMe = [] } = value;
    afterMe.forEach(afterItem => {
      if(!(afterItem in afterMeMap))
        afterMeMap[afterItem] = new Set();

      afterMeMap[afterItem].add(key);
    });
  });

  const result = [];
  const complete = new Set();

  const addResult = item => {
    const { beforeMe = [] } = orderMap[item];
    beforeMe.forEach(item => addResult(item));
    const afterSet = afterMeMap[item] || new Set();
    afterSet.forEach(item => addResult(item));

    if(complete.has(item))
      return;

    complete.add(item);
    result.push(item);
  };

  Object.keys(orderMap).forEach(addResult);

  return result;
};
