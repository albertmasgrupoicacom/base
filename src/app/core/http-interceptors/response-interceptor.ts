import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((resp: HttpEvent<any>) => {
                if (resp instanceof HttpResponse && resp.body === null) {
                    resp = resp.clone<any>({ body: { ...resp.body, status: resp.status } });
                }
                return resp;
            })
        );
    }
}
