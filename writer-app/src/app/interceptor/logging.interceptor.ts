import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  console.log('Request: ', req);
  console.log('Response: ', next);

  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
    else if (event.type === HttpEventType.Sent) {
      console.log(req.url, 'was sent', new Date(Date.now()), req.body, req.headers);
    }

  }));
}


// 요청 수정

// 인터셉터에서의 종속성 주입


// export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
//   // console.log('Request: ', req);
//   return next(req).pipe(tap(event => {
//     if (event.type === Response) {
//       console.log('Request: ', req);
//     }
//   })
// };


/*
--> 요청 수정
const reqWithHeader = req.clone({
  headers: req.headers.set('X-New-Header', 'new header value'),
});

--> 인터셉터에서의 종속성 주입
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAuthToken();
  // Clone the request to add the authentication header.
  const newReq = req.clone({headers: {
    req.headers.append('X-Authentication-Token', authToken),
  }});
  return next(newReq);
}

*/
