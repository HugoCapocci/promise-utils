import { promiseEach, promiseBatch } from './index';

const testPromise =  (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('resolve value ', value);
      resolve(value);
    }, 1500);
  });
}

const testPromiseError =  (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('reject value ', value);
      reject('FAIL');
    }, 500);
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

  it('Should reject when one promise reject', (done) => {
    const values = [1, 2, 3, 4, 5, 6];
    promiseEach(values, testPromiseError)
    .then((results) => {
      expect(results).toEqual(values);
      done('error');
    })
    .catch((error) => {
      expect(error).toEqual('FAIL');
      done();
    });
  }, 1000);
});

describe('promiseBatch', () => {
  it('Should execute batch of promises in series', (done) => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    promiseBatch(values, testPromise, 3)
    .then((results) => {
      expect(results).toEqual(values);
      done();
    });
  }, 10000);

  it('Should reject when one promise reject', (done) => {
    const values = [1, 2, 3, 4, 5, 6];
    promiseBatch(values, testPromiseError, 2)
    .then((results) => {
      expect(results).toEqual(values);
      done('error');
    })
    .catch((error) => {
      expect(error).toEqual('FAIL');
      done();
    });
  }, 1000);
});