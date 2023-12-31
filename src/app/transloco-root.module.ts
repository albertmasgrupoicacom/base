import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TRANSLOCO_LOADER, Translation, TranslocoLoader, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { Injectable, NgModule, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string) {
        return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
    }
}

@NgModule({
    imports: [HttpClientModule],
    exports: [TranslocoModule],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    { id: 'es', label: 'Español' },
                    { id: 'ca', label: 'Català' },
                ],
                fallbackLang: 'es',
                defaultLang: 'es',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: environment.production,
                flatten: {
                    aot: !isDevMode(),
                },
            }),
        },
        { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    ],
})
export class TranslocoRootModule {}
