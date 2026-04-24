export interface ILoadingState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
