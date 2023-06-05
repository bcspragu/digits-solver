export type Operation = (a: number, b: number) => number;
export type OperationDetails = {
  label: string;
  symbol: string;
  operation: Operation;
};
