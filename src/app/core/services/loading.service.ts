import { Injectable } from '@angular/core';
import { IcaSpinnerComponent } from '../components/ica-spinner/ica-spinner.component';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    public isLoading: boolean = false;
    private IDGENERAL = 'LOADINGGENERAL';

    start(id: string = this.IDGENERAL): void {
        if (id === this.IDGENERAL) {
            this.isLoading = true;
        }
    }

    stop(id: string = this.IDGENERAL): void {
        if (id === this.IDGENERAL) {
            this.isLoading = false;
        }
    }

    simulate(segundos: number): void {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, segundos * 1000);
    }
}
