import type { Calculation, Operation, OperationWithOperator } from './solve.types';

export const solve = (numbers: number[], target: number): Promise<Calculation[]> => {
  const isValid = (n: number) => !isNaN(n) && isFinite(n) && n > 0 && Number.isInteger(n);

  const add: Operation = (a, b) => a + b;
  const multiply: Operation = (a, b) => a * b;
  const subtract: Operation = (a, b) => a - b;
  const divide: Operation = (a, b) => a / b;
  // const exponent: Operation = (a, b) => Math.pow(a, b);

  const calculate = (operation: Operation, a: number, b: number) => operation(a, b);

  const operations: OperationWithOperator[] = [
    ['+', add],
    ['×', multiply],
    ['-', subtract],
    ['÷', divide],
    // ['^', exponent],
  ];

  const removeFromArray = <T>(array: T[], value: T): T[] => array.filter((n) => n !== value);

  const findSolutions = (
    numbers: number[],
    target: number,
    operations: OperationWithOperator[]
  ): Calculation[] => {
    if (numbers.includes(target)) {
      return [{ numbers, steps: [] }];
    }

    let solutions: Calculation[] = [];

    numbers.forEach((a) => {
      const otherNumbers = removeFromArray(numbers, a);

      otherNumbers.forEach((b) => {
        operations.forEach(([operator, operation]) => {
          const result = calculate(operation, a, b);

          if (!isValid(result)) {
            return;
          }

          const remainingNumbers = removeFromArray(otherNumbers, b).concat(result);

          const partialCalculations = findSolutions(remainingNumbers, target, operations);

          solutions = solutions.concat(
            partialCalculations.map((partialCalculation) => ({
              numbers,
              steps: [`${a} ${operator} ${b} = ${result}`, ...partialCalculation.steps],
            }))
          );
        });
      });
    });

    return solutions;
  };

  return new Promise((resolve) => {
    console.time('solve');
    const solutions = findSolutions(numbers, target, operations).sort(
      (a, b) => a.steps.length - b.steps.length
    );
    console.timeEnd('solve');
    resolve(solutions);
  });
};
