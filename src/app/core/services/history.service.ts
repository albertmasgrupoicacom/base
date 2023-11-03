import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RoutingStateService {
    private history: any[] = [];

    constructor(
        private router: Router,
        @Inject(DOCUMENT) private _document: any
    ) {}

    public recordHistory(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
            this.history = [...this.history, event.url];
        });
    }

    public getHistory(): string[] {
        return this.history;
    }

    public getPreviousUrl(): string {
        return this.history[this.history.length - 1] || this._document.referrer;
    }
}
