export type Operation = (a: number, b: number) => number;
export type OperationWithOperator = [string, Operation];
export type Calculation = {
  numbers: number[];
  steps: string[];
};
