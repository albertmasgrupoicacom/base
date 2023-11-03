import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private IDGENERAL = 'LOADINGGENERAL';
    constructor(private loadingService: LoadingService) {}

    /**
     * Contador del número de peticiones pendientes de que finalicen
     */
    requestCounter = 0;
    /**
     * Descripción de la última petición interceptada por el interceptor
     */
    ultima = '';
    /**
     * Intercepta las peticiones http y las respuestas y actualiza el contador de peticiones pendientes
     * Si el contador es mayor que cero activa el spinner y si es menor o igual a cero lo desactiva
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.hayqueincrementar(request)) {
            this.requestCounter++;
        }
        this.setLoading();

        return next.handle(request).pipe(
            finalize(() => {
                if (this.hayquedecrementar(request)) {
                    this.requestCounter--;
                }
                // this.ultima = request.url;
                this.setLoading();
            })
        );
    }
    /** @ignore */
    private hayqueincrementar(request: HttpRequest<any>): boolean {
        const r: RegExp = new RegExp('.*html$');
        const r2: RegExp = new RegExp('.*/upload/.*$');
        const r3: RegExp = new RegExp('.*/notificaciones/pendientes.*$');
        return !r.test(request.url) && !r2.test(request.url) && !r3.test(request.url);
    }
    /** @ignore */
    private hayquedecrementar(request: HttpRequest<any>): boolean {
        const r: RegExp = new RegExp('.*html$');
        const r2: RegExp = new RegExp('.*/upload/.*$');
        const r3: RegExp = new RegExp('.*/notificaciones/pendientes.*$');
        return !r.test(request.url) && !r2.test(request.url) && !r3.test(request.url);
    }
    /** @ignore */
    private setLoading(): void {
        if (this.requestCounter > 0) {
            this.loadingService.start();
            // this.spinner.show();
        } else {
            this.loadingService.stop();
            // this.spinner.hide();
        }
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     this.loadingService.start();
    //     return next.handle(req).pipe(finalize(() => this.loadingService.stop()));
    // }
}
