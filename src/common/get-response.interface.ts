export interface ApiGetResponse<T = any> {
  success: boolean;
  data: T[];
  meta: Record<string, any>;
  message: string;
}
