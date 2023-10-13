import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.error) {
          return {
            success: data.success,
            content: [],
            message: data.message,
          };
        }
        return {
          success: data.success,
          content: data.data,
          meta: data.meta,
          message: data.message,
        };
      }),
      catchError(async (error) => {
        return {
          success: false,
          content: [],
          message: error.response.message,
        };
      }),
    );
  }
}
