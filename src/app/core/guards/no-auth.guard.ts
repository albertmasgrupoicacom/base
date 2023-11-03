import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _sessionStorageService: SessionStorageService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._sessionStorageService.getToken()) {
            this._router.navigate(['inicio'], { relativeTo: this._route });
            return false;
        }
        return true;
    }
}
