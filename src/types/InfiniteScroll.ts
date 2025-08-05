export type LoadMoreDataApiType<T> = (
  pageNumber: number,
  pageSize: number,
  signal: AbortSignal
) => Promise<{
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}>;
export type LoadMoreDataResponse<T> = Promise<{
  totalCount: number;
  data: T[];
  currentPage: number;
  pageSize: number;
}>;
