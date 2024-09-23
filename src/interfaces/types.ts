

export interface ICartItem {
    id: number | string,
    partition: string,
    name: string,
    price: number,
    img: string,
    category: string,
    title: string,
    quantity: number,
}

export interface IPart {
    // id: number,
    // partition: "RTX 4060",
    // name: "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
    // price: "3000",
    // img: "/components/gpu/palit-rtx-4060-ti-dual.png",
    // category: "Комплектующие",
    // title: "Видеокарта",
}

export interface ICartPc{

    id: number | string,
    name: string,
    price: number,
    isPc: boolean,
    isConfiguration: boolean,
    img: string,

}

export interface IPcCategoryInfo {
    category_id: number | string,
    category_name:string,
    category_description:string,
    category_link:string
}

export interface ICategoryPc{
        _id:string | number,
        category_id:string | number,
        name:string,
        description:string,
        img:string,
        min_price:string | number,
        link_to_pc:string,
        link_to_configurator:string,
        gpu_description:string,
        cpu_description:string,
        mb_description:string,
        ram_description:string,
        ssd_description:string,
        power_supply_description:string,
        amount_of_configurations:string | number, //проверка в другой таблице
}