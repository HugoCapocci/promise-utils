import { promiseEach } from './index';

describe('promiseEach', () => {
  it('Should resolve promise one by one', (done) => {
    const values = [1, 2, 3, 4, 5, 6];
    promiseEach(values, (value) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('resolve value ', value);
          resolve(value);
        }, 100);
      });
    })
    .then((results) => {
      expect(results).toEqual(values);
      done();
    });
  });
});