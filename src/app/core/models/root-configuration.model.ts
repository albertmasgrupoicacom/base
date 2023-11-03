export class RootConfiguration {
    public runAsDemo?: boolean;
    public authenticationUrl?: string;
    public loginClaveUrl?: string;
    public logoutClaveUrl?: string;
    public apisBaseUrl!: string;
    public apisBaseUrlDev!: string;
    public removeHeader?: string[];
    public removeFooter?: string[];
    public redirectWhenLogin?: string;
    public redirectWhenLogOut?: string;
    public redirectWhenExpireToken?: string;
    public redirectWhenTimeout?: string;
    public redirectWhenForbidden?: string;
    public inactivityTimeout?: number;
    public inactivityWarning?: number;
    public webpolUrl?: string;
    public siteName?: string;
    public siteSubTitle?: string;
    public siteImage?: string;

    constructor(object?: object) {
        if (object) {
            this.fill(object);
        }
    }

    fill(data: object): RootConfiguration {
        Object.assign(this, data);
        return this;
    }
}
