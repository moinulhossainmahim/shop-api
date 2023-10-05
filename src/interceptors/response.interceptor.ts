import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    );
  }
}
