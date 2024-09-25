export interface ICartItem {
    id: number | string;
    partition: string;
    name: string;
    price: number;
    img: string;
    category: string;
    title: string;
    quantity: number;
}

export interface IPcPart {
    id: number;
    partition: string;
    name: string;
    price: string | number;
    img: string;
    category: string;
    title: string;
}

// export interface IPc {
//     id: number;
//     partition: string;
//     name: string;
//     price: string | number;
//     img: string;
//     category: string;
//     title: string;
// }

export interface ICartPc {
    id: number | string;
    name: string;
    price: number;
    isPc: boolean;
    isConfiguration: boolean;
    img: string;

    cpu?: IPcPart | null;
    gpu?: IPcPart;
    motherboard?: IPcPart | null;
    cpu_fan?: IPcPart | null;
    ram?: IPcPart | null;
    ssd?: IPcPart | null;
    power_supply?: IPcPart | null;
    _case?: IPcPart | null;

    quantity: number;
}

export interface IPcCategoryInfo {
    category_id: number | string;
    category_name: string;
    category_description: string;
    category_link: string;
}

export interface ICategoryPc {
    _id: string | number;
    category_id: string | number;
    name: string;
    description: string;
    img: string;
    min_price: string | number;
    link_to_pc: string;
    link_to_configurator: string;
    gpu_description?: string;
    cpu_description?: string;
    mb_description?: string;
    ram_description?: string;
    ssd_description?: string;
    power_supply_description?: string;
    amount_of_configurations: string | number; //проверка в другой таблице
}

export interface ISingleProductHeader {
    title: string;
    description: string;
    img: string;
    img_mobile: string;
}

export interface ISingleProductPc {
    _id: string | number;
    name: string;
    category: string; //or categoryType
    design: ISingleProductDesign;
    preview: ISingleProductPreview;
    performance: ISingleProductPerformance;
    configurations: any; //Временно
}

export interface ISingleProductDesign {
    title: string;
    description: string;
    min_price: string | number;
    img: string;
}

export interface ISingleProductPreview {
    main_img: string;
    title: string;
    description: string;
    slider_images: string[];
}

export interface ISingleProductPerformance {
    img: string;
    img_2: string;
    title: string;
    description: string;
}

export interface ISingleProductConfigurations {
    main_img: string;
    title: string;
    description: string;
    slider_images: string[];
}
