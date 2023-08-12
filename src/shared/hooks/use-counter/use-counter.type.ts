interface IUseCounterReturns {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export type UseCounterType = (defaultValue?: number) => IUseCounterReturns;
