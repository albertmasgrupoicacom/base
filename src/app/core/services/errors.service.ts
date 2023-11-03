import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Servicio para centralizar la gestión de errores. Solo funciona si environment.debug = true
 */
@Injectable({
    providedIn: 'root',
})
export class ErrorsService {
    /** Subject donde se emiten los errores que se registran */
    public Errores = new Subject<any>();
    /** Subject donde se emiten los objetos que se reciben para depurar */
    public Objetos$ = new Subject<any>();
    /** Objeto para almacenar el último error resgistrado */
    public UltimoError: any = null;
    /** @ignore */
    constructor() {}

    /** @ignore */
    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : error.toString();
    }
    /** @ignore */
    getClientStack(error: Error): string | undefined {
        return error.stack;
    }
    /** @ignore */
    getServerMessage(error: HttpErrorResponse): string {
        return error.error.errorCode;
    }
    /** @ignore */
    getServerOptionalMessage(error: HttpErrorResponse): string {
        return error.error.additionalInformation ? error.error.additionalInformation : 'undefined error';
    }
    /** @ignore */
    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return `${error.error.error}-(${error.error.status})`;
    }
}
