import type { Operation, OperationDetails } from './numbers.types';

const isValid = (n: number) =>
  !isNaN(n) && isFinite(n) && n > 0 && n <= 999_999_999 && Number.isInteger(n);

const add: Operation = (a, b) => a + b;
const multiply: Operation = (a, b) => a * b;
const subtract: Operation = (a, b) => a - b;
const divide: Operation = (a, b) => a / b;
const exponent: Operation = (a, b) => Math.pow(a, b);
const modulo: Operation = (a, b) => a % b;
const floorDivide: Operation = (a, b) => Math.floor(a / b);

export const calculate = (operation: Operation, a: number, b: number): number | null => {
  const result = operation(a, b);
  return isValid(result) ? result : null;
};

export const operations: Record<string, OperationDetails> = {
  add: {
    label: 'add',
    symbol: '+',
    operation: add,
  },
  multiply: {
    label: 'multiply',
    symbol: '×',
    operation: multiply,
  },
  subtract: {
    label: 'subtract',
    symbol: '-',
    operation: subtract,
  },
  divide: {
    label: 'divide',
    symbol: '÷',
    operation: divide,
  },
  exponent: {
    label: 'exponent',
    symbol: '^',
    operation: exponent,
  },
  modulo: {
    label: 'modulo',
    symbol: '%',
    operation: modulo,
  },
  floorDivide: {
    label: 'floorDivide',
    symbol: '//',
    operation: floorDivide,
  },
};
