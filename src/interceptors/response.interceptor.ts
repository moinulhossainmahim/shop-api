import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.error) {
          return {
            success: data.success,
            data: [],
            message: data.message,
          };
        }
        return {
          success: data.success,
          data: data.data,
          meta: data.meta,
          message: data.message,
        };
      }),
      catchError((error) => {
        return throwError({
          success: false,
          data: [],
          meta: {},
          message: error.message || 'Internal Server Error',
        });
      }),
    );
  }
}
