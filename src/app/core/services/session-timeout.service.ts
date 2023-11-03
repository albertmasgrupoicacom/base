import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { RootConfigurationService } from './configuration.service';

/**
 * Servicio para gestionar el cierre automático de 'sesión' en caso de inactividad.
 * El servicio tiene un contador que se va aumentando cada segundo. Cuando llega al valor de advice se emite
 * un valor en EndSession$ indicando el número de segundos que quedan para el cierre.
 * Cuando el contador llega al valor de close se emite un valor 0 en EndSession$
 * Este servicio no hace nada más, solo se encarga de controlar el tiempo de inactividad y avisar,
 * será en otros componentes o servicios los que en base a la información proporcionada por este servicio
 * actuarán en consecuencia
 */
@Injectable({
    providedIn: 'root',
})
export class SessionTimeoutService {
    /** Contador de inactividad */
    private counter = 0;
    /** Límite en el cual se avisa para mostrar el aviso del próximo cierre de sesión */
    private advice = this._config.data.inactivityWarning as number; // 5; // 1080;
    /** Límite en el cual se cierra la sesión */
    private close = this._config.data.inactivityTimeout as number;
    private timer: any = null;

    /** Subject para emitir los eventos del servicio cuando superamos los límites establecidos */
    public EndSession$: Subject<number> = new Subject<number>();
    /** @ignore */
    constructor(
        private _config: RootConfigurationService,
        private _auth: AuthService
    ) {}

    /** Método para inicializar el servicio y empezar a contar  */
    start(): void {
        this.timer = setInterval(() => {
            this.counter++;
            if (this.counter >= this.close) {
                // aquí cerramos la sesión
                this.endByTimeout();
            } else if (this.counter >= this.advice) {
                // Aquí mostramos el aviso
                this.EndSession$.next(this.close - this.counter);
            }
        }, 1000);
    }

    /** Método para finalizar el servicio y no contar más hasta que se vuelva a empezar */
    end(): void {
        this.counter = 0;
        clearInterval(this.timer);
    }

    endByTimeout(): void {
        clearInterval(this.timer);
        this.EndSession$.next(0);
        this.counter = 0;
        this._auth.logOut();
    }

    /** Método para resetear a 0 el contador de inactividad */
    resetInactivityCounter(): void {
        this.counter = 0;
    }
}
