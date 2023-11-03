import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormBuilderService {
    constructor() {}

    allowOnlyNumbers(event: any) {
        return event.charCode === 8 || event.charCode === 0 || event.charCode === 13 ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    date(event: any) {
        const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
        return dateRegEx.test(event.value) ? null : { date: true };
    }
}
