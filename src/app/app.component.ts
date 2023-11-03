import { Component } from '@angular/core';
import { IconService } from './core/services/icon.service';
import { TranslocoService } from '@ngneat/transloco';
import { ThemeManagerService } from './core/services/theme-manager.service';
import { Theme } from './core/models/theme.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'example-16';

    constructor(
        private _iconService: IconService,
        private _translocoService: TranslocoService,
        public themeManagerService: ThemeManagerService
    ) {
        this._iconService.preloadIcons();
        this.setTheme(this.themes[0]);
    }

    setLanguage(id: string) {
        this._translocoService.setActiveLang(id);
    }

    setFontSize(fontSize: number) {
        this.themeManagerService.setTypoConfig(fontSize);
    }

    setTheme(theme: Theme) {
        this.themeManagerService.setThemeConfig(theme);
    }

    setDarkMode() {
        this.themeManagerService.toggleDarkTheme(this.themeManagerService.isDark ? false : true);
    }

    fontSizes: any[] = [
        { fontSizeId: 0, value: 0, label: 'Por defecto' },
        { fontSizeId: 1, value: 1, label: 'Normal' },
        { fontSizeId: 2, value: 2, label: 'Grande' },
        { fontSizeId: 3, value: 3, label: 'Extragrande' },
    ];

    themes: Theme[] = [
        {
            themeId: 1,
            name: 'Por defecto',
            palettes: {
                primary: {
                    '50': '#e3fafc',
                    '100': '#9eeef5',
                    '200': '#6ae5f0',
                    '300': '#2adaea',
                    '400': '#16cedf',
                    '500': '#13b4c3',
                    '600': '#119ba7',
                    '700': '#0e818b',
                    '800': '#0b676f',
                    '900': '#084d54',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#000000',
                        '500': '#000000',
                        '600': '#000000',
                        '700': '#ffffff',
                        '800': '#ffffff',
                        '900': '#ffffff',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#000000',
                        A700: '#ffffff',
                    },
                    A100: '#61d8ef',
                    A200: '#3cceec',
                    A400: '#13a2be',
                    A700: '#0e768b',
                },
                accent: {
                    '50': '#ffd6d6',
                    '100': '#ff8a8a',
                    '200': '#ff5252',
                    '300': '#ff0a0a',
                    '400': '#eb0000',
                    '500': '#cc0000',
                    '600': '#ad0000',
                    '700': '#8f0000',
                    '800': '#700000',
                    '900': '#520000',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#ffffff',
                        '500': '#ffffff',
                        '600': '#ffffff',
                        '700': '#ffffff',
                        '800': '#ffffff',
                        '900': '#ffffff',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#ffffff',
                        A700: '#ffffff',
                    },
                    A100: '#ff5747',
                    A200: '#ff311f',
                    A400: '#c71100',
                    A700: '#8f0c00',
                },
                warn: {
                    '50': '#ffffff',
                    '100': '#fdf6e2',
                    '200': '#f9e7ae',
                    '300': '#f5d26b',
                    '400': '#f3ca4f',
                    '500': '#f1c132',
                    '600': '#efb815',
                    '700': '#d7a50f',
                    '800': '#ba8f0d',
                    '900': '#9d790b',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#000000',
                        '500': '#000000',
                        '600': '#000000',
                        '700': '#000000',
                        '800': '#ffffff',
                        '900': '#ffffff',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#000000',
                        A700: '#000000',
                    },
                    A100: '#f9eba4',
                    A200: '#f6e27e',
                    A400: '#f0d02d',
                    A700: '#d7b50f',
                },
            },
        },
        {
            themeId: 2,
            name: 'Alto contraste',
            palettes: {
                primary: {
                    '50': '#ffffff',
                    '100': '#c4ffbd',
                    '200': '#93ff85',
                    '300': '#54ff3d',
                    '400': '#39ff1f',
                    '500': '#1eff00',
                    '600': '#1ae000',
                    '700': '#17c200',
                    '800': '#13a300',
                    '900': '#0f8500',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#000000',
                        '500': '#000000',
                        '600': '#000000',
                        '700': '#000000',
                        '800': '#000000',
                        '900': '#000000',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#000000',
                        A700: '#000000',
                    },
                    A100: '#7fff7a',
                    A200: '#57ff52',
                    A400: '#08fa00',
                    A700: '#06c200',
                },
                accent: {
                    '50': '#ffffff',
                    '100': '#ffbdbd',
                    '200': '#ff8585',
                    '300': '#ff3d3d',
                    '400': '#ff1f1f',
                    '500': '#ff0000',
                    '600': '#e00000',
                    '700': '#c20000',
                    '800': '#a30000',
                    '900': '#850000',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#000000',
                        '500': '#000000',
                        '600': '#000000',
                        '700': '#000000',
                        '800': '#000000',
                        '900': '#000000',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#000000',
                        A700: '#000000',
                    },
                    A100: '#ff857a',
                    A200: '#ff6052',
                    A400: '#fa1500',
                    A700: '#c21000',
                },
                warn: {
                    '50': '#ffffff',
                    '100': '#bdd9ff',
                    '200': '#85baff',
                    '300': '#3d91ff',
                    '400': '#1f80ff',
                    '500': '#006fff',
                    '600': '#0061e0',
                    '700': '#0054c2',
                    '800': '#0047a3',
                    '900': '#003985',
                    contrast: {
                        '50': '#000000',
                        '100': '#000000',
                        '200': '#000000',
                        '300': '#000000',
                        '400': '#000000',
                        '500': '#000000',
                        '600': '#000000',
                        '700': '#000000',
                        '800': '#000000',
                        '900': '#000000',
                        A100: '#000000',
                        A200: '#000000',
                        A400: '#000000',
                        A700: '#000000',
                    },
                    A100: '#7aa9ff',
                    A200: '#528eff',
                    A400: '#0057fa',
                    A700: '#0044c2',
                },
            },
        },
    ];
}
