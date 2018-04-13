const flatten = (matrix) =>
  matrix.reduce( (acc, array) => acc.concat(array), [])

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
  const medium = Math.ceil(items.length / batchSize);

  for (let start = 0; start < items.length; start += medium) {
    matrix.push(items.slice(start, start + medium));
  }
  console.log('matrix: ', matrix);
  const promises = matrix.map((array) => promiseEach(array, next));
  return Promise.all(promises)
  .then(flatten);
}
