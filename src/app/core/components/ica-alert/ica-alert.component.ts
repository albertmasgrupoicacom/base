import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { AlertList } from '../../models/alert-list.model';

interface AlertData {
    type: 'prompt' | 'success' | 'warning' | 'error' | 'import' | 'html' | 'list';
    title: string;
    icon: string;
    message: string;
    inputType: 'text' | 'number' | 'password';
    inputLabel: string;
    defaultValue: string;
    placeholder: string;
    validatorPattern: string;
    validationText: string;
    templateUrl: SafeUrl;
    templateFileName: string;
    html: string;
    lists: AlertList[];
    accept: string;
    cancel: string;
    acceptButtonDisabled: boolean;
}

@Component({
    selector: 'app-ica-alert',
    templateUrl: './ica-alert.component.html',
    styleUrls: ['./ica-alert.component.scss'],
})
export class IcaAlertComponent {
    public input = new UntypedFormControl('', Validators.required);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: AlertData,
        public dialogRef: MatDialogRef<IcaAlertComponent>
    ) {
        if (this.data.validatorPattern) {
            this.input.addValidators(Validators.pattern(this.data.validatorPattern));
        }
        if (this.data.defaultValue) {
            this.input.setValue(this.data.defaultValue);
        }
    }

    closeAlert() {
        if (this.data.type == 'prompt') {
            if (this.input.valid) {
                this.dialogRef.close({ isConfirmed: true, value: this.input.value });
            } else {
                return;
            }
        } else {
            this.dialogRef.close({ isConfirmed: true });
        }
    }
}
