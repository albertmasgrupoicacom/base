export class Theme {
    themeId: number;
    name: string;
    palettes: Palettes;

    constructor(themeId: number, name: string, palettes: Palettes) {
        this.themeId = themeId;
        this.name = name;
        this.palettes = palettes;
    }
}

interface Palettes {
    primary: Palette;
    accent: Palette;
    warn: Palette;
}

interface Palette {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
    contrast: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        A100: string;
        A200: string;
        A400: string;
        A700: string;
    };
}
