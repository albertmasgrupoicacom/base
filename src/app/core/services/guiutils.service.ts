import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Servicio de utilidades para la interface gráfica.
 * Centraliza funcionalidades comunes a toda la aplicación como el mostrar mensajes al usuario,
 *  establecer el título de la aplicación, etc.
 */
@Injectable({
    providedIn: 'root',
})
export class GuiUtilsService {
    /** @ignore */
    constructor(
        private router: Router,
        private ngZone: NgZone,
        private snackBar: MatSnackBar
    ) {}

    // private _currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    // public get currentUser$(): Observable<User | null> {
    //     return this._currentUser$.asObservable();
    // }

    // tslint:disable-next-line: variable-name
    private _tituloPrincipal$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public get tituloPrincipal$(): Observable<string | null> {
        return this._tituloPrincipal$.asObservable();
    }
    /**
     * Método para establecer el título principal de la página
     */
    set tituloPrincipal(titulo: string | null) {
        this._tituloPrincipal$.next(titulo);
    }

    get tituloPrincipal(): string | null {
        return this._tituloPrincipal$.value;
    }

    // public Messages = new EventEmitter<any>();

    /** Subject al que suscribirse para recibir los mensajes que reciba el servicio */
    // tslint:disable-next-line: variable-name
    private _mensajes$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public get mensajes$(): Observable<any> {
        return this._mensajes$.asObservable();
    }

    /** Método para emitir un mensaje de error
     * @param mensaje Mensaje de error
     */
    public showError(error: string | Error): void {
        if (error instanceof Error) {
            const mensaje = `${error.message} -- ${error.stack}`;
            this.throwMessage(mensaje, 'error');
        } else {
            this.throwMessage(error, 'error');
        }
    }
    /** Método para emitir un mensaje de éxito
     * @param mensaje Mensaje de éxito
     */
    public showSuccess(mensaje: string): void {
        this.throwMessage(mensaje, 'success');
    }
    /**
     * Método para mostrar un mensaje informativo
     * @param mensaje Mensaje informativo
     */
    public showInfo(mensaje: string): void {
        this.throwMessage(mensaje, 'info');
    }
    /**
     * Método para mostrar un mensaje de warning
     * @param mensaje Mensaje de warning
     */
    public showWarning(mensaje: string): void {
        this.throwMessage(mensaje, 'warning');
    }

    /**
     * Método interno que lanza el mensaje
     * @param mensaje Mensaje a mostrar
     * @param tipo Tipo del mensaje (error, warning, success o info)
     */
    private throwMessage(mensaje: string, tipo: string): void {
        const typo = `style_${tipo}`;
        this.snackBar.open(mensaje, tipo, {
            duration: tipo === 'success' ? 1000 : 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: [typo],
        });
        // this._mensajes$.next({
        //     mensaje,
        //     tipo
        // });
    }

    /**
     * Método que muestra la página de error
     * @param codigoerror Código del error producido
     */
    public showErrorPage(codigoerror: string | null = null): void {
        const actual = this.router.routerState.snapshot.url;

        this.ngZone.run(() => {
            this.router.navigateByUrl(`/error?previous=${actual}&error=${codigoerror}`);
        });
    }
    /** Método que muestra la página de no no encontrado */
    public showNotFoundPage(): void {
        this.ngZone.run(() => {
            this.router.navigateByUrl('/error404', { replaceUrl: false, skipLocationChange: true });
        });
    }

    /** Método que navega a una url
     * @param url Url para navegar
     * @param ventananueva Boolen indicando si se abre en ventana nueva o en la misma
     */
    public openUrl(url: string, ventananueva: boolean = true): void {
        const target = ventananueva ? '_blank' : '_self';
        window.open(url, target);
    }
}
