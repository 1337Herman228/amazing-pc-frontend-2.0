import {
    FieldErrors,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";

export interface IIdDto {
    id: string;
}

export type TCompareViewType = "all" | "different";

export interface INotification {
    type: "success" | "error" | "warning";
    message: string;
    description: string;
    duration?: number;
    key?: string;
    closeIcon?: React.ReactNode | null | false;
    placement?:
        | "topRight"
        | "top"
        | "topLeft"
        | "bottom"
        | "bottomLeft"
        | "bottomRight"
        | undefined;
}

export interface IUserSession {
    name?: string;
    email?: string;
    image?: string;
    userId?: string;
    authenticationResponse?: {
        token: string;
    };
    role?: string;
}

export interface IChangePassword {
    userId: string;
    oldPassword: string;
    newPassword: string;
}

export interface NavTreeItem {
    id: string;
    category: string;
    label: string;
    value: string;
    icon: string;
}

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
export interface ICompareType extends IOptionTemplate {}

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

export type ICartItem = IPc | IPart;

export interface IPurchaseItem {
    id: string;
    quantity: number;
    product: ICartItem;
}

export interface IPurchaseStatus extends IOptionTemplate {}

export interface IPurchase {
    id: string;
    date: string;
    destination: string;
    status: string;
    user: IUser;
    itemList: IPurchaseItem[];
}

export interface IPurchaseItemDto {
    quantity: number;
    productId: string;
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
    userCreated?: IUser;
}

export interface ConfiguratorFieldValues {
    gpu: IPart;
    cpu: IPart;
    motherboard: IPart;
    cpu_fan: IPart;
    ram: IPart;
    psu: IPart;
    cases?: IPart;
    ssd: IPartWithQuantity[];
    fan: IPartWithQuantity[];
    [key: string]: IPartWithQuantity[] | IPart | undefined;
}

export interface IConfiguration {
    id: string;
    name: string;
    userCreated?: IUser;
    configuration: ConfiguratorFieldValues;
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

export interface IUserInfo {
    login: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface INewUser {
    id: string;
    login: string;
    password?: string;
    roleId?: string;
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

export interface IAddPcCategory {
    value: string;
    label: string;
    description: string;
}

export interface IAddPcType {
    value: string;
    label: string;
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

export interface IAddPcModelGroup
    extends Omit<IPcModelGroup, "id" | "pcTypes" | "pcCategories"> {
    id?: string;
    pcTypeId: string;
    pcCategoryId: string;
}

export interface ICatalog {
    configurationsCount: number;
    minPrice: number;
    pc: IPc;
    pcModelGroup: IPcModelGroup;
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

export interface PartIdWithQuantity {
    partId: string;
    quantity: number;
}

export interface PcIdWithQuantity {
    pcId: string;
    quantity: number;
}

export interface IConfiguratorProductsDto {
    userId: string;
    pc: PcIdWithQuantity;
    parts: PartIdWithQuantity[];
}

export interface PcConfigurationDto {
    id?: string;
    name: string;
    gpuId: string;
    cpuId: string;
    motherboardId: string;
    cpuFanId: string;
    ramId: string;
    psuId: string;
    pcCaseId: string | null;
    ssd: PartIdWithQuantity[];
    fans: PartIdWithQuantity[];
    userId?: string;
}

export interface PcToCartDto {
    userId: string;
    pcId: string;
    quantity: number;
}

export interface CompareItem {
    id: string;
    user: IUser;
    product: IPc | IPart;
}

export interface CompareItemsDto {
    types: ICompareType[];
    items: CompareItem[];
}
