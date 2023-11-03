export interface Address {
    addressId: number;
    streetTypeId: number;
    countryId: number;
    floor: number;
    letter: string;
    name: string;
    number: number;
    region: string;
    stair: number;
    city: string;
    zipCode: number;
}
export class User {
    userId: number;
    dni?: string;
    email?: string;
    name?: string;
    middleName?: string;
    lastName?: string;
    phone?: string;
    createdDate?: Date;
    modifiedDate?: Date;
    changePassword?: boolean;
    defaultRoleId?: number;
    genre?: number;
    image?: any;
    position?: string;
    lang?: string;
    dark?: boolean;
    typo?: number;
    adress?: Address;

    constructor(
        userId: number,
        dni?: string,
        email?: string,
        name?: string,
        middleName?: string,
        lastName?: string,
        phone?: string,
        createdDate?: Date,
        modifiedDate?: Date,
        changePassword?: boolean,
        defaultRoleId?: number,
        genre?: number,
        image?: any,
        position?: string,
        lang?: string,
        dark?: boolean,
        typo?: number,
        address?: Address
    ) {
        this.userId = userId;
        this.dni = dni;
        this.email = email;
        this.name = name;
        this.middleName = middleName;
        this.lastName = lastName;
        this.phone = phone;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.changePassword = changePassword;
        this.defaultRoleId = defaultRoleId;
        this.genre = genre;
        this.image = image;
        this.position = position;
        this.lang = lang;
        this.dark = dark;
        this.typo = typo;
        this.adress = address;
    }
}

export class UserSimple {
    userId: number;
    name?: string;
    middleName?: string;
    lastName?: string;
    email?: string;

    constructor(userId: number, name?: string, middleName?: string, lastName?: string, email?: string) {
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
    }
}
