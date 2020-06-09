export class ApiResult<T> {
  public data: T;
  public error: string;
  public isSuccess: boolean;
}
