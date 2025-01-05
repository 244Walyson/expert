export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pages: number;
  page?: number;
  limit?: number;
}
