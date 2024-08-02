export function pushToArray<T>(prev: T[], item: T) {
  return [...prev, item];
}

export function removeFromArray<T>(
  prev: T[],
  filter: (item: T, idx: number) => void,
) {
  return prev.filter(filter);
}

export function replaceInArray<T>(prev: T[], item: T, idx: number) {
  return [...prev.slice(0, idx), item, ...prev.slice(idx + 1)];
}
