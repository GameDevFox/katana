export const Iterator = list => {
  let index = 0;

  const isDone = () => list.length === index;
  const result = () => {
    if(isDone())
      return;

    return list[index++];
  };

  result.isDone = isDone;

  return result;
};
