export const generateArray = <T>(length: number, generatorFn: T | (() => T)): T[] =>
  new Array(length).fill(null).map(() => {
    if (typeof generatorFn === 'function') {
      return (generatorFn as () => T)();
    }

    return generatorFn;
  });
