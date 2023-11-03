import { NgModule } from '@angular/core';
import { HttpInterceptorProviders } from './http-interceptors/_index';
import { MaterialImportModule } from './modules/material-import.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { IcaSpinnerComponent } from './components/ica-spinner/ica-spinner.component';
import { IcaAlertComponent } from './components/ica-alert/ica-alert.component';

const COMPONENTS = [IcaSpinnerComponent, IcaAlertComponent];

@NgModule({
    imports: [CommonModule, MaterialImportModule, FormsModule, ReactiveFormsModule, TranslocoModule],
    providers: [HttpInterceptorProviders],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class CoreModule {}
