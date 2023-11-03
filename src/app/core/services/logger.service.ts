import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Servicio para hacer log de eventos, errores, etc
 */
@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    /** @ignore */
    constructor(
        private router: Router,
        private ngZone: NgZone
    ) {}

    logError(error: string | Error): void {
        console.error(error);
    }
}
