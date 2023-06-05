interface UseMenuNavigateReturnType {
  goto: Record<string, VoidFunction>;
}

export type UseMenuNavigate = () => UseMenuNavigateReturnType;
