import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'ica-spinner',
    templateUrl: './ica-spinner.component.html',
    styleUrls: ['./ica-spinner.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class IcaSpinnerComponent {
    constructor(public loadingService: LoadingService) {}
}
