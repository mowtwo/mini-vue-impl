export function hasChanged<T, N>(a: T, b: N): boolean {
  return Object.is(a, b) ? false : JSON.stringify(a) !== JSON.stringify(b)
}