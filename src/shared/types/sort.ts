export type Order = 'asc' | 'desc';

export interface SortOrder<T> {
  key: keyof(T);
  order: Order;
  label?: string;
  sortFn?: (a: T, b: T) => boolean;
}