import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";

export type TProductType = "PART" | "PC";

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    productType: TProductType;
}

export interface IOptionTemplate {
    id: string;
    value: string;
    label: string;
}

export interface ICategory extends IOptionTemplate {}
export interface IPartition extends IOptionTemplate {}
export interface IRole extends IOptionTemplate {}
export interface IType extends IOptionTemplate {
    image?: string;
}

export interface ICharacteristicItem {
    label: string;
    value: string;
    item: string | string[]; // mb need to add some in future
}

export interface IPart extends IProduct {
    categories: ICategory;
    partitions: IPartition;
    types: IType;
    characteristics: ICharacteristicItem[];
}

export interface IUser {
    id: string;
    login: string;
    password: string;
    roles: IRole;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface INewUser {
    id: string;
    login: string;
    password: string;
    roleId: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface IFormProps {
    register: UseFormRegister<any>;
    unregister: UseFormUnregister<any>;
    errors: FieldErrors<any>;
}
