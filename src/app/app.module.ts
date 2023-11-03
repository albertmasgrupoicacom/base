import { NgModule, ErrorHandler, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './core/globalerrorhandler';
import { RootConfigurationService } from './core/services/configuration.service';
import { Observable } from 'rxjs';
import { TranslocoRootModule } from './transloco-root.module';
import { CoreModule } from './core/core.module';
import { MaterialImportModule } from './core/modules/material-import.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TranslocoRootModule, CoreModule, MaterialImportModule],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [RootConfigurationService],
            multi: true,
        },
        { provide: LOCALE_ID, useValue: 'es' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeAppFactory(config: RootConfigurationService): () => Observable<boolean> {
    return () => config.loadConfiguration();
}
