import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    private tokenKey = 'token';
    private userLoged = 'userLogged';

    constructor() {}

    /** Guardamos el token en el session storage */
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    setUser(user: User | null): void {
        localStorage.setItem(this.userLoged, JSON.stringify(user));
    }

    /** Retornamos el token del session storage */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /** Eliminamos el token del session storage */
    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /** Guardamos en el session storage el payload decodificado del token */
    setPayloadToken(payloadToken: any): void {
        localStorage.setItem(this.userLoged, JSON.stringify(payloadToken));
    }

    /** Retornamos el valor del payload del token */
    getPayloadToken(): any {
        const payloadTokenLoged = localStorage.getItem(this.userLoged);
        return payloadTokenLoged ? JSON.parse(payloadTokenLoged) : null;
    }

    getUserToken(): User {
        const payloadTokenLoged = localStorage.getItem(this.userLoged);
        return payloadTokenLoged ? JSON.parse(payloadTokenLoged) : null;
    }

    /** Eliminamos la info del payload del user Loged */
    removePayloadTokenUserLoged(): void {
        localStorage.removeItem(this.userLoged);
    }

    sessionExpired(): boolean {
        const token = this.getToken();
        const { exp } = jwtDecode(token!) as any;
        const dataExpired = new Date(exp * 1000);
        const now = new Date();
        const retorn = dataExpired < now;
        return retorn;
    }
}
