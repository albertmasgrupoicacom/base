import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { iconSets } from 'src/assets/icons/_index';
import { Observable, forkJoin, map } from 'rxjs';
import { generationIcons } from 'src/assets/icons/set-generator/_index';

@Injectable({
    providedIn: 'root',
})
export class IconService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private http: HttpClient
    ) {
        //this.createIconSet();
    }

    preloadIcons(): void {
        iconSets.forEach(collection => {
            if (collection.pre) {
                this.matIconRegistry.addSvgIconSetInNamespace('custom', this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${collection.src}`));
            } else {
                this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${collection.src}`));
            }
        });
    }

    getIcons() {
        let observables: Observable<any>[] = [];
        iconSets.forEach(collection => {
            observables.push(this.http.get(`assets/icons/${collection.src}`, { responseType: 'text' }));
        });
        return forkJoin(observables).pipe(
            map((data: any) => {
                let resp: any[] = [];
                data.forEach((d: any, index: number) => {
                    let a = document.createElement('div');
                    a.innerHTML = d;
                    let pre = iconSets[index].pre || '';
                    let icons = [];
                    let items = a.getElementsByTagName('symbol');
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i];
                        icons.push({
                            name: pre ? `${pre}:${item.id}` : item.id,
                            categories: item.getAttribute('categories')?.split(','),
                            tags: item.getAttribute('tags')?.split(','),
                        });
                    }
                    resp = resp.concat(icons);
                });
                return resp;
            })
        );
    }

    createIconSet() {
        let result = '<svg xmlns="http://www.w3.org/2000/svg">';
        generationIcons.forEach(async (icon, index) => {
            this.http
                .get(`assets/icons/set-generator/${icon.name}.svg`, { responseType: 'text' })
                .toPromise()
                .then(value => {
                    let viewBox = value!.match(/viewBox="([^"]+)"/)![1];
                    result += `<symbol id="${icon.name}" viewBox="${viewBox}" categories="${icon.categories}" tags="${icon.tags}"><g>`;
                    result += value!.slice(value!.indexOf('<path'), value!.lastIndexOf('/>') + 2);
                    result += '</g></symbol>';
                    if (index == generationIcons.length - 1) {
                        result += '</svg>';
                    }
                });
        });
    }
}
