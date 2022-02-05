import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url, body, query } = req;

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const finish = Date.now();
        const { statusCode } = res;
        if (body.password) {
          body.password = '******';
        }
        const message = `[LOG] ${new Date()} method:${method} url:${url} body:${JSON.stringify(
          body,
        )} query:${JSON.stringify(query)} code:${statusCode} [${
          finish - start
        }ms]\n`;
        console.log(`${message}\n`);
        fs.appendFile(
          path.resolve(process.cwd(), 'src/logs/logs.txt'),
          message,
          (err) => {
            if (err) console.log(err);
          },
        );
      }),
    );
  }
}
