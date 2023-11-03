import { ErrorHandler, Injectable, Injector, NgZone, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GuiUtilsService } from './services/guiutils.service';
import { ErrorsService } from './services/errors.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { LoggerService } from './services/logger.service';
import { TranslocoService } from '@ngneat/transloco';
import { SessionStorageService } from './services/session-storage.service';

/**
 * Servicio para hacer un manejo global de los errores. Este servicio debe cargarse el primero por lo cual
 * no podemos inyectarle en el constructor las dependencias que necesita, las tendremos que conseguir de forma
 * manual con el Injector de Angular
 */

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(
        private _injector: Injector,
        private _translocoService: TranslocoService
    ) {}

    /**
     * Implementación del manejo del error. Consigue las instancias de los servicios que necesita y hace el tratamiento del error
     *
     * Utiliza los siguientes servicios:
     *
     * {@link ErrorsService} para extraer la información del error
     *
     * {@link LoggingService} para hacer log del error
     *
     * {@link GuiUtilsService} para mostrar los mensajes de error
     *
     * {@link AuthenticationService} para hacer logout si corresponde
     *
     * {@link Router} para navegar a la ruta que corresponda dependiendo del error
     *
     * Si el error es una HttpErrorResponse:
     *
     * 0 - Muestra error desconocido
     *
     * 400 - Navega a not-found-page
     *
     * 401 - Fuerza logout
     *
     * 403 - Navega a not-found-page
     *
     * 404 - Navega a not-found-page
     *
     * 500 y sucesivos muestra el error por pantalla
     *
     * En otro caso navega a la página de error
     *
     * Si no es un error de http, es decir, es un error de cliente se muestra un mensaje por pantalla
     *
     * @param error Error que se ha producido
     */

    handleError(error: Error | HttpErrorResponse): void {
        const errorService = this._injector.get<ErrorsService>(ErrorsService);
        const logger = this._injector.get<LoggerService>(LoggerService);
        const notifier = this._injector.get<GuiUtilsService>(GuiUtilsService);
        const router = this._injector.get(Router);
        const alertService = this._injector.get(AlertService);
        const _authService = this._injector.get(AuthService);
        const _sessionStorageService = this._injector.get(SessionStorageService);
        const ngZone = this._injector.get(NgZone);
        let message;
        let optional_message;
        let stackTrace;
        let showError: boolean = true;
        if (error instanceof HttpErrorResponse) {
            // Server Error
            if (error.status === 404) {
                ngZone.run(() => {
                    router.navigateByUrl('/error404', {
                        replaceUrl: false,
                        skipLocationChange: true,
                    });
                });
            } else if (error.status === 401) {
                if (error.url?.includes('/login')) {
                    alertService.error({ value: this._translocoService.translate('global_handler.incorrect_user'), raw: true });
                } else {
                    ngZone.run(() => {
                        router.navigate(['']).then(() => notifier.showError(this._translocoService.translate('global_handler.no_authorized')));
                    });
                }
            } else if (error.status === 405 || error.status >= 500) {
                message = errorService.getServerMessage(error);
                optional_message = errorService.getServerOptionalMessage(error);
                const translate_message = this._translocoService.translate(`global_handler.${message}`);
                if (translate_message === `global_handler.${message}`) {
                    message = optional_message;
                } else {
                    message = translate_message;
                }
                notifier.showError(message);
            } else if (error.status === 403) {
                if (error.url?.includes('/login')) {
                    alertService.error({ value: this._translocoService.translate('global_handler.incorrect_user'), raw: true });
                    return;
                } else {
                    if (_sessionStorageService.sessionExpired()) {
                        //TODO _authService.logOut();
                    }
                }
            } else if (error.status === 400 || error.status === 409) {
                showError = false;

                let msg;
                //TODO: REPASO GENERAL ERRORES
                if (error.status === 400) {
                    msg = this._translocoService.translate('global_handler.E10');
                    // } else if (error.error.additionalInformation) {
                    //     msg = error.error.additionalInformation;
                    // msg = error.error.errorCode;
                } else if (!error.error.message && !error.error.msg) {
                    if (error.error.error) {
                        msg = this._translocoService.translate(`global_handler.${error.error.error}`);
                    } else if (error.error.errorCode) {
                        msg = this._translocoService.translate(`global_handler.${error.error.errorCode}`);
                    } else {
                        msg = this._translocoService.translate('global_handler.call_error');
                    }
                } else {
                    msg = error.error.msg;
                }

                alertService.error({ value: msg, raw: true });
            } else {
                message = errorService.getServerMessage(error);
                stackTrace = errorService.getServerStack(error);
                notifier.showError(this._translocoService.translate(`global_handler.${message}`));
                ngZone.run(() => {
                    router.navigateByUrl(`/login`);
                });
            }
        } else {
            if (_sessionStorageService.sessionExpired()) {
                //TODO _authService.logOut();
            }
            // Client Error
            if (isDevMode()) {
                notifier.showError('Error de conexión');
            }
        }

        // Always log errors
        console.error(error);
    }
}
