import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../services/menu.service';

@Injectable({
    providedIn: 'root',
})
export class PagesResolver implements Resolve<any> {
    constructor(private _menuService: MenuService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._menuService.getUserPages();
    }
}
