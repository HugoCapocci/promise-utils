import { promiseEach, promiseBatch } from './index';

const testPromise =  (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('resolve value ', value);
      resolve(value);
    }, 1500);
  });
}

describe('promiseEach', () => {
  it('Should resolve promise one by one', (done) => {
    const values = [1, 2, 3, 4, 5, 6];
    promiseEach(values, testPromise)
    .then((results) => {
      expect(results).toEqual(values);
      done();
    });
  }, 10000);
});

describe('promiseBatch', () => {
  it('Should execute batch of promises in series', (done) => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    promiseBatch(values, testPromise, 2)
    .then((results) => {
      expect(results).toEqual(values);
      done();
    });
  }, 10000);
});