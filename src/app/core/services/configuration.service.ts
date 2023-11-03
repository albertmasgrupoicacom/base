import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RootConfiguration } from '../models/root-configuration.model';

@Injectable({
    providedIn: 'root',
})
export class RootConfigurationService {
    private config: RootConfiguration = new RootConfiguration();

    constructor(private _http: HttpClient) {}

    get data(): RootConfiguration {
        return this.config;
    }

    loadConfiguration(): Observable<boolean> {
        return this._http.get<RootConfiguration>(`${environment.href}/assets/config/config.json`).pipe(
            tap((config: RootConfiguration) => (this.config = new RootConfiguration(config))),
            map(() => true)
        );
    }

    getApiUrl(): string {
        const cad = environment.production ? this.config.apisBaseUrl : this.config.apisBaseUrlDev;
        return cad;
    }

    getSiteName(): string {
        return this.config.siteName!;
    }

    getSiteSubtitle(): string {
        return this.config.siteSubTitle!;
    }

    getSiteImage(): string {
        return this.config.siteImage!;
    }
}
