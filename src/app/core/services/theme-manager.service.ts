import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeManagerService {
    public isDark = false;
    public selectedTypoConfig = 0;

    public hues = [
        { name: '50', amt: { h: 0.4853, s: 0, l: 42 } },
        { name: '100', amt: { h: 0.4851, s: 50, l: 37 } },
        { name: '200', amt: { h: 0.4849, s: 0.3, l: 26 } },
        { name: '300', amt: { h: 0.4847, s: 0.4, l: 12 } },
        { name: '400', amt: { h: 0.4845, s: 0.6, l: 6 } },
        { name: '500', amt: { h: 0.4844, s: 0.8, l: 0 } },
        { name: '600', amt: { h: 0.4844, s: 1.0, l: 0.8 } },
        { name: '700', amt: { h: 0.4844, s: 1.0, l: 0.6 } },
        { name: '800', amt: { h: 0.4844, s: 1.0, l: 0.4 } },
        { name: '900', amt: { h: 0.4844, s: 1.0, l: 0.2 } },
        { name: 'A100', amt: { h: 0.4844, s: 1.0, l: 0.5882 } },
        { name: 'A200', amt: { h: 0.4844, s: 1.0, l: 0.5882 } },
        { name: 'A400', amt: { h: 0.4844, s: 1.0, l: 0.5882 } },
        { name: 'A700', amt: { h: 0.4844, s: 1.0, l: 0.5882 } },
    ];

    toggleDarkTheme(darkMode: boolean) {
        if (darkMode) {
            document.body.classList.add('dark-theme');
            this.isDark = true;
        } else {
            document.body.classList.remove('dark-theme');
            this.isDark = false;
        }
    }

    setTypoConfig(selection: number) {
        switch (selection) {
            case 0:
                document.body.classList.remove('typo-1', 'typo-2', 'typo-3', 'typo-4');
                break;
            case 1:
                document.body.classList.add('typo-1');
                document.body.classList.remove('typo-2', 'typo-3', 'typo-4');
                break;
            case 2:
                document.body.classList.add('typo-2');
                document.body.classList.remove('typo-1', 'typo-3', 'typo-4');
                break;
            case 3:
                document.body.classList.add('typo-3');
                document.body.classList.remove('typo-1', 'typo-2', 'typo-4');
                break;
            case 4:
                document.body.classList.add('typo-4');
                document.body.classList.remove('typo-1', 'typo-2', 'typo-3');
                break;
        }
        this.selectedTypoConfig = selection;
    }

    setThemeConfig(themeConfig: Theme) {
        Object.entries<any>(themeConfig.palettes).forEach(([paletteKey, paletteValue]) => {
            Object.entries<any>(paletteValue).forEach(([hueKey, hueValue]) => {
                if (typeof hueValue == 'object') {
                    Object.entries<any>(hueValue).forEach(([contrastKey, contrastValue]) => {
                        document.documentElement.style.setProperty(`--${paletteKey}-${hueKey}-${contrastKey}`, contrastValue);
                    });
                } else {
                    document.documentElement.style.setProperty(`--${paletteKey}-${hueKey}`, hueValue);
                }
            });
        });
    }

    hexToHSL(hex: string): { h: number; s: number; l: number } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (!result) {
            throw new Error('Could not parse Hex Color');
        }

        const rHex = parseInt(result[1], 16);
        const gHex = parseInt(result[2], 16);
        const bHex = parseInt(result[3], 16);

        const r = rHex / 255;
        const g = gHex / 255;
        const b = bHex / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = (max + min) / 2;
        let s = h;
        let l = h;

        if (max === min) {
            // Achromatic
            return { h: 0, s: 0, l };
        }

        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;

        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        return { h, s, l };
    }

    hslToHex(hsl: { h: number; s: number; l: number }): string {
        const { h, s, l } = hsl;

        const hDecimal = l / 100;
        const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

            // Convert to Hex and prefix with "0" if required
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    lightenDarkenColor(col: any, amt: any) {
        let a = this.hexToHSL(col);
        a.l = a.l + amt.l;

        return this.hslToHex(a);
    }

    minimax(val: number) {
        return Math.min(100, Math.max(0, val));
    }

    generatePalette(a: any) {
        let h = Math.round(a.h);
        let s = Math.round(a.s);
        let l = Math.round(a.l);

        if (isNaN(h) || isNaN(s) || isNaN(l)) {
            throw new TypeError('Invalid input');
        }
        if (h < 0 || h > 360) {
            throw new RangeError(`Hue must be an integer within [0, 360]; given ${h}`);
        }
        if (s < 0 || s > 100) {
            throw new RangeError(`Saturation must be an integer within [0, 100]; given ${s}`);
        }
        if (l < 0 || l > 100) {
            throw new RangeError(`Lightness must be an integer within [0, 100]; given ${l}`);
        }

        return {
            '50': this.hslToHex({ h, s, l: this.minimax(l + 52) }),
            '100': this.hslToHex({ h, s, l: this.minimax(l + 37) }),
            '200': this.hslToHex({ h, s, l: this.minimax(l + 26) }),
            '300': this.hslToHex({ h, s, l: this.minimax(l + 12) }),
            '400': this.hslToHex({ h, s, l: this.minimax(l + 6) }),
            '500': this.hslToHex({ h, s, l }),
            '600': this.hslToHex({ h, s, l: this.minimax(l - 6) }),
            '700': this.hslToHex({ h, s, l: this.minimax(l - 12) }),
            '800': this.hslToHex({ h, s, l: this.minimax(l - 18) }),
            '900': this.hslToHex({ h, s, l: this.minimax(l - 24) }),
            A100: this.hslToHex({ h: h + 5, s, l: this.minimax(l + 24) }), // { h, s, l: minimax(l + 52) }
            A200: this.hslToHex({ h: h + 5, s, l: this.minimax(l + 16) }), // { h, s, l: minimax(l + 37) }
            A400: this.hslToHex({ h: h + 5, s, l: this.minimax(l - 1) }), // { h, s, l: minimax(l + 6) }
            A700: this.hslToHex({ h: h + 5, s, l: this.minimax(l - 12) }), // { h, s, l: minimax(l - 12) }
        };
    }
}
