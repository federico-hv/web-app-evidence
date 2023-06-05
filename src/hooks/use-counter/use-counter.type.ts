interface IUseCounterReturns {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export type UseCounterType = () => IUseCounterReturns;
