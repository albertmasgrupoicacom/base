import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { SessionStorageService } from '../services/session-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _sessionStorageService: SessionStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this._sessionStorageService.getToken();
        if (!authToken) {
            return next.handle(req);
        } else {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`),
            });
            return next.handle(authReq);
        }
    }
}
