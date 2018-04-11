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
};

export const promiseBatch = (items, next, batchSize) => {
  if (items.length === 0) return Promise.resolve();

  const matrix = [];
  for (let start = 0; start < items.length; start += batchSize) {
    matrix.push(items.slice(start, start + batchSize));
  }

  return promiseEach(matrix, (array) => Promise.all(array.map(next)));
}
