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
