import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { ResponseInterceptor } from './response-interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
];
