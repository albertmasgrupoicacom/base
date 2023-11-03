export class Endpoint {
    endpointId: number;
    path?: string;
    method?: string;
    selected?: boolean;
    active?: boolean;
    originalPath?: string;

    constructor(endpointId: number, path?: string, method?: string, selected?: boolean, active?: boolean, originalPath?: string) {
        this.endpointId = endpointId;
        this.path = path;
        this.method = method;
        this.selected = selected;
        this.active = active;
        this.originalPath = originalPath;
    }
}
