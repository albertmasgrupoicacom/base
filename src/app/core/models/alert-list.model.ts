export interface TranslationData {
    value: string;
    params?: { [key: string]: string };
    raw?: boolean;
}

export class AlertList {
    label: TranslationData;
    items: string[];

    constructor(label: TranslationData, items: string[]) {
        this.label = label;
        this.items = items;
    }
}
