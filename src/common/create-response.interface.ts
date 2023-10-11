export interface CreateApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: boolean;
}
