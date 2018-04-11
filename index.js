export const promiseEach = (items, next) => {
  if (items.length === 0) return Promise.resolve();

  return items.reduce(
    (acc, item) =>
      acc.then((value) =>
        next(item).then((nextValue) => value.concat(nextValue))
      )
    ,
    Promise.resolve([])
  );

}
