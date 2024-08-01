import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
//   // console.log('Request: ', req);
//   return next(req).pipe(tap(event => {
//     if (event.type === Response) {
//       console.log('Request: ', req);
//     }
//   })
// };

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
    else if (event.type === HttpEventType.Sent) {
      console.log(req.url, 'was sent', new Date(Date.now()), req.body, req.headers);
    }

  }));
}
