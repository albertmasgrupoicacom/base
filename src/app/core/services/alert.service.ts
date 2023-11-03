import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { IcaAlertComponent } from '../components/ica-alert/ica-alert.component';
import { AlertList, TranslationData } from '../models/alert-list.model';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService
    ) {}

    open(type?: string, title?: TranslationData, icon?: string, message?: TranslationData, acceptButton?: TranslationData, cancelButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: type,
                title: title ? (title.raw ? title.value : this._translocoService.translate(title.value, title.params)) : undefined,
                icon: icon,
                message: message ? (message.raw ? message.value : this._translocoService.translate(message.value, message.params)) : undefined,
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_ok'),
                cancel: cancelButton && cancelButton.raw ? cancelButton.value : this._translocoService.translate(cancelButton?.value || 'general.button_cancel'),
            },
        });
        return dialogRef.afterClosed();
    }

    success(message: TranslationData, acceptButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'success',
                icon: 'check_circle',
                message: message.raw ? message.value : this._translocoService.translate(message.value, message.params),
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_ok'),
            },
        });
        return dialogRef.afterClosed();
    }

    warning(message: TranslationData, acceptButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'warning',
                icon: 'warning',
                message: message.raw ? message.value : this._translocoService.translate(message.value),
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_ok'),
            },
        });
        return dialogRef.afterClosed();
    }

    confirmation(type: 'warning' | 'success', title: TranslationData, message: TranslationData, acceptButton?: TranslationData, cancelButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: type,
                title: title.raw ? title.value : this._translocoService.translate(title.value, title.params),
                icon: type == 'warning' ? 'help' : 'check_circle',
                message: message.raw ? message.value : this._translocoService.translate(message.value, message.params),
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_ok'),
                cancel: cancelButton && cancelButton.raw ? cancelButton.value : this._translocoService.translate(cancelButton?.value || 'general.button_cancel'),
            },
        });
        return dialogRef.afterClosed();
    }

    error(message: TranslationData, cancelButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'error',
                icon: 'error',
                message: message.raw ? message.value : this._translocoService.translate(message.value),
                cancel: cancelButton && cancelButton.raw ? cancelButton.value : this._translocoService.translate(cancelButton?.value || 'general.button_cancel'),
            },
        });
        return dialogRef.afterClosed();
    }

    prompt(
        title: TranslationData,
        message: TranslationData,
        inputType: string,
        inputLabel?: TranslationData,
        defaultValue?: string,
        placeholder?: TranslationData,
        validationPattern?: string,
        validationText?: TranslationData,
        acceptButton?: TranslationData,
        cancelButton?: TranslationData
    ) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'prompt',
                title: title.raw ? title.value : this._translocoService.translate(title.value, title.params),
                message: message.raw ? message.value : this._translocoService.translate(message.value, message.params),
                inputType: inputType,
                inputLabel: inputLabel ? (inputLabel.raw ? inputLabel.value : this._translocoService.translate(inputLabel.value, inputLabel.params)) : undefined,
                defaultValue: defaultValue,
                placeholder: placeholder
                    ? placeholder.raw
                        ? placeholder.value
                        : this._translocoService.translate(placeholder.value, placeholder.params)
                    : undefined,
                validatorPattern: validationPattern,
                validationText: validationText
                    ? validationText.raw
                        ? validationText.value
                        : this._translocoService.translate(validationText.value, validationText.params)
                    : undefined,
                accept: acceptButton
                    ? acceptButton.raw
                        ? acceptButton.value
                        : this._translocoService.translate(acceptButton.value)
                    : this._translocoService.translate('general.button_ok'),
                cancel: cancelButton
                    ? cancelButton.raw
                        ? cancelButton.value
                        : this._translocoService.translate(cancelButton.value)
                    : this._translocoService.translate('general.button_cancel'),
            },
        });
        return dialogRef.afterClosed();
    }

    importPrompt(
        title: TranslationData,
        message: TranslationData,
        templateUrl?: SafeUrl,
        templateFileName?: TranslationData,
        acceptButton?: TranslationData,
        cancelButton?: TranslationData
    ) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'import',
                title: title.raw ? title.value : this._translocoService.translate(title.value, title.params),
                message: message.raw ? message.value : this._translocoService.translate(message.value, message.params),
                templateUrl: templateUrl,
                templateFileName: templateFileName
                    ? templateFileName.raw
                        ? templateFileName.value
                        : this._translocoService.translate(templateFileName.value, templateFileName.params)
                    : undefined,
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_import'),
                cancel: cancelButton && cancelButton.raw ? cancelButton.value : this._translocoService.translate(cancelButton?.value || 'general.button_close'),
            },
        });
        return dialogRef.afterClosed();
    }

    list(title: TranslationData, lists: AlertList[], acceptButton?: TranslationData) {
        const dialogRef = this._dialog.open(IcaAlertComponent, {
            data: {
                type: 'list',
                title: title.raw ? title.value : this._translocoService.translate(title.value, title.params),
                lists: lists,
                accept: acceptButton && acceptButton.raw ? acceptButton.value : this._translocoService.translate(acceptButton?.value || 'general.button_ok'),
            },
        });
        return dialogRef.afterClosed();
    }
}
