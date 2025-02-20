import {
    FieldErrors,
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

export interface IPartWithQuantity {
    quantity: number;
    part: IPart;
}

export interface IPc extends IProduct {
    pcModelGroup: IPcModelGroup;
    pcType: IPcType;
    pcCategories: IPcCategory;
    gpu: IPart;
    cpu: IPart;
    motherboard: IPart;
    cpuFan: IPart;
    ram: IPart;
    psu: IPart;
    pcCase: IPart;
    ssd: IPartWithQuantity[];
    fans: IPartWithQuantity[];
}

export interface IAssemblyPC {
    gpu: IPart;
    cpu: IPart;
    motherboard: IPart;
    cpuFan: IPart;
    ram: IPart;
    psu: IPart;
    pcCase: IPart;
    ssd: IPartWithQuantity[];
    fans: IPartWithQuantity[];
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

export interface IPcType extends IOptionTemplate {}
export interface IPcCategory extends IOptionTemplate {
    description: string;
}

export interface IPcModelGroup {
    id: string;
    pcTypes: IPcType;
    pcCategories: IPcCategory;
    modelGroupImage: string;
    modelGroupName: string;
    modelGroupDescription: string;
    gpuDescription: string;
    cpuDescription: string;
    motherboardDescription: string;
    ramDescription: string;
    ssdDescription: string;
    psuDescription: string;
    headerDescription: string;
    headerImage: string;
    headerImageMobile: string;
    designTitle: string;
    designDescription: string;
    designImage: string;
    performanceTitle: string;
    performanceDescription: string;
    performanceImage: string;
}

export interface IConfiguratorComponent {
    category: ICategory;
    partition: string[];
    type: IType;
    items: IPart[];
}

export interface IConfiguratorComponents {
    components: IConfiguratorComponent[];
}
