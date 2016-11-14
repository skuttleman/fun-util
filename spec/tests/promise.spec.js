const { chain, rejectThrough, resolveThrough } = require('../../src/promise');
const noop = () => null;

describe('promise', () => {
  describe('chain', () => {
    it('invokes all promises', done => {
      const promise1 = jasmine.createSpy('promise1').and.returnValue(new Promise(resolve => resolve()));
      const promise2 = jasmine.createSpy('promise2').and.returnValue(new Promise(resolve => resolve()));

      chain([promise1, promise2])
        .catch(fail)
        .then(() => {
          expect(promise1).toHaveBeenCalled();
          expect(promise2).toHaveBeenCalled();
        }).then(done, done);
    });

    it('rejects error on failure', done => {
      const promise1 = jasmine.createSpy('promise1').and.returnValue(new Promise(resolve => resolve()));
      const promise2 = jasmine.createSpy('promise2').and.returnValue(new Promise((_, reject) => reject('error')));

      chain([promise1, promise2])
        .then(fail)
        .catch(error => {
          expect(error).toEqual('error');
        }).then(done, done);
    });

    it('stops running promises when one fails', done => {
      const promise1 = jasmine.createSpy('promise1').and.returnValue(new Promise(resolve => resolve()));
      const promise2 = jasmine.createSpy('promise2').and.returnValue(new Promise((_, reject) => reject()));
      const promise3 = jasmine.createSpy('promise3').and.returnValue(new Promise(resolve => resolve()));

      chain([promise1, promise2, promise3])
        .then(fail)
        .catch(() => {
          expect(promise3).not.toHaveBeenCalled();
        }).then(done, done);
    });

    it('resolves an array of results when all run', done => {
      const promise1 = jasmine.createSpy('promise1').and.returnValue(new Promise(resolve => resolve(1)));
      const promise2 = jasmine.createSpy('promise2').and.returnValue(new Promise(resolve => resolve(2)));
      const promise3 = jasmine.createSpy('promise3').and.returnValue(new Promise(resolve => resolve(3)));

      chain([promise1, promise2, promise3])
        .catch(fail)
        .then(results => {
          expect(results).toEqual([1, 2, 3])
        }).then(done, done);
    });

    it('preserves order of responses', done => {
      const promise1 = () => new Promise(resolve => {
        setTimeout(() => resolve(1), 500);
      });
      const promise2 = () => new Promise(resolve => resolve(2));
      const promise3 = () => new Promise(resolve => resolve(3));
      const promise4 = () => new Promise(resolve => resolve(4));

      chain([promise1, promise2, promise3, promise4])
        .catch(fail)
        .then(results => {
            expect(results).toEqual([1, 2, 3, 4]);
        }).then(done, done);
    });
  });

  describe('rejectThrough', () => {
    it('returns a rejected promise', done => {
      const passSpy = jasmine.createSpy('passSpy');
      const failSpy = jasmine.createSpy('failSpy');

      Promise.reject(null)
        .then(rejectThrough(noop))
        .then(passSpy, failSpy)
        .then(() => {
          expect(passSpy).not.toHaveBeenCalled();
          expect(failSpy).toHaveBeenCalled();
        }).then(done, done);
    });

    it('rejects original data', done => {
      const spy = jasmine.createSpy('spy').and.returnValue('not error');

      Promise.reject('error')
        .catch(rejectThrough(spy))
        .catch(error => {
          expect(spy).toHaveBeenCalledWith('error');
          expect(error).toEqual('error');
        }).then(done, done);
    });
  });

  describe('resolveThrough', () => {
    it('returns a resolved promise', done => {
      const passSpy = jasmine.createSpy('passSpy');
      const failSpy = jasmine.createSpy('failSpy');

      Promise.resolve(null)
        .then(resolveThrough(noop))
        .then(passSpy, failSpy)
        .then(() => {
          expect(passSpy).toHaveBeenCalled();
          expect(failSpy).not.toHaveBeenCalled();
        }).then(done, done);
    });

    it('resolves original data', done => {
      const spy = jasmine.createSpy('spy').and.returnValue('not data');

      Promise.resolve('data')
        .then(resolveThrough(spy))
        .then(result => {
          expect(spy).toHaveBeenCalledWith('data');
          expect(result).toEqual('data');
        }).then(done, done);
    });
  });
})
