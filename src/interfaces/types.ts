export interface IUserSession {
    name?: string;
    email?: string;
    image?: string;
    userId?: number;
    authenticationResponse?: {
        token: string;
    };
    role?: string;
}

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

export interface IpcCatalog {
    pcCategories: IpcCategories[];
    pcModelGroupList: IpcModelGroupList[];
}

export interface IpcCategories {
    pcCategoryDescription: string;
    pcCategoryId: number;
    pcCategoryName: string;
}

export interface IpcDesign {
    description: string;
    image: string;
    pcDesignId: number;
    title: string;
}

export interface IpcHeader {
    pcHeaderId: number;
    description: string;
    image: string;
    imageMobile: string;
}

export interface IpcPerformance {
    pcPerformanceId: number;
    description: string;
    image: string;
    image2: string;
    title: string;
}

export interface IpcPreview {
    pcPreviewId: number;
    description: string;
    mainImage: string;
    sliderImages: string; //"["/pc/preview/slider-image-1.1","/pc/preview/slider-image-1.2","/pc/preview/slider-image-1.3"]"
    title: string;
}

export interface IpcTypes {
    pcTypeId: number;
    type: string;
}

export interface IpcModelGroup {
    pcModelGroupId: number;
    modelGroupDescription: string;
    modelGroupName: string;

    cpuDescription: string;
    gpuDescription: string;
    motherboardDescription?: string;
    psuDescription?: string;
    ramDescription: string;
    ssdDescription: string;

    pcCategories: IpcCategories;
    pcDesign: IpcDesign;
    pcHeader: IpcHeader;
    pcPerformance: IpcPerformance;
    pcPreview: IpcPreview;
    pcTypes: IpcTypes;
}

export interface IpcModelGroupList {
    configurationsCount: number;
    image: string;
    minPrice: number;
    pcModelGroup: IpcModelGroup;
}

export type ICpu = {
    cpuId: number;
    socket: string;
    maxRamCapacity: number;
    ramType: string; //'["DDR4","DDR5"]'
    cpuCores: number;
    cpuThreads: number;
    baseFrequency: number;
    boostFrequency: number;
    techProcess: string;
    cacheL1: string | null;
    cacheL2: string | null;
    cacheL3: string | null;
    tdp: number;
};

export type IGpu = {
    gpuId: number; // Идентификатор GPU
    techProcess: number; // Технологический процесс в нанометрах
    maxDisplaysQuantity: number; // Максимальное количество подключаемых дисплеев
    maxResolution: string; // Максимальное разрешение
    baseFrequency: string; // Базовая частота (в МГц)
    boostFrequency: string; // Увеличенная частота (в МГц)
    vramCapacity: number; // Объем видеопамяти в ГБ
    vramType: string; // Тип видеопамяти
    busWidth: number; // Ширина шины в битах
    hdmi: number; // Количество HDMI портов
    displayPort: number; // Количество DisplayPort
    cuda: number; // Количество CUDA ядер
    powerConnector: string; // Тип разъема питания
    minPowerUnit: number; // Минимальная мощность блока питания в Вт
    fans: number; // Количество вентиляторов
    extensionSlots: string; // Количество слотов расширения
    length: number; // Длина в миллиметрах
    width: number; // Ширина в миллиметрах
    height: number; // Высота в миллиметрах
};

export type IMotherboard = {
    motherboardId: number;
    socket: string;
    formFactor: string;
    chipset: string;
    ramType: string; //JSON
    ramSlots: number;
    maxRamCapacity: number;
    sataQuantity: number;
    m2Quantity: number;
    pcie16Quantity: number;
};

export type ICpuAirCooling = {
    cpuAirCoolingId: number;
    sockets: string; //JSON
    fansQuantity: number;
    fanSize: string;
    tdp: number;
    backlight: string;
    height: number;
    fanSpeed: string;
    airFlow: number;
    maxNoiseLevel: number;
    connector: string;
};

export type ICpuLiquidCooling = {
    cpuLiquidCoolingId: number; // Используйте number для Long
    sockets: string; // JSON, Формат: "Am4, Am5, Lga1700"
    fansQuantity: number;
    fanSize: string; // Пример: "120 мм"
    tdp: number; // Ватт
    backlight: string; // Пример: "RGB"
    length: number; // В миллиметрах
    width: number; // В миллиметрах
    height: number; // В миллиметрах
    fanSpeed: string; // Пример: "500-2000 об/мин"
    airFlow: number; // CFM
    maxNoiseLevel: number; // Дб
    connector: string; // Пример: "4 pin PWM"
};

export type IRam = {
    ramId: number;
    type: string;
    frequency: number;
    capacity: number; // В ГБ
};

export type IPsu = {
    psuId: number;
    power: number; // Ватт
    formFactor: string;
    pfc: string; // Тип PFC
    coolingSystem: string; // Описание системы охлаждения
    mbConnector: string; // Разъем для материнской платы
    cpu4Plus4Quantity: number; // Количество 4+4 разъемов для CPU
    gpu6Plus2Quantity: number; // Количество 6+2 разъемов для GPU
    sataQuantity: number; // Количество SATA разъемов
    certificate: string; // Сертификация
    modular: string; // Тип модульности
};

export type ICase = {
    caseId: number;
    maxCpuCoolerHeight: number; // В миллиметрах
    maxGpuLength: number; // В миллиметрах
    maxLiquidCoolingLength: number; // В миллиметрах
    hddSlotsQuantity: number; // Количество отсеков для HDD
    ssdSlotsQuantity: number; // Количество отсеков для SSD
    extensionSlotsQuantity: number; // Количество слотов расширения
    length: number; // В миллиметрах
    width: number; // В миллиметрах
    height: number; // В миллиметрах
    weight: number; // В килограммах
    possibleFormFactors: string; // JSON Массив форм-факторов
};

export type ISsd = {
    capacity: string | null; // Пример: "512 ГБ"
    connectionType: string | null; // Пример: "PCI-E 4.0 x4"
    controllerType: string | null; // Пример: "Silicon Motion SM2269XT"
    flashMemoryType: string | null; // Пример: "3D NAND"
    formFactor: string; // Пример: "M.2 NVME"
    maxTemperature: number | null; // Может быть числом или null
    mtbfTime: number | null; // Может быть числом или null
    randomWriteSpeed: number | null; // В IOPS
    readVelocity: number | null; // В МБ/с
    ssdId: number; // Идентификатор SSD
    writeVelocity: number | null; // В МБ/с
};

export type IFan = {
    fanId: number; // Идентификатор вентилятора
    fanSize: string | null; // Пример: "120x120 мм"
    backlight: string | null; // Пример: "ARGB"
    fanSpeed: string | null; // Пример: "800-1800 об/мин"
    airFlow: string | null; // Пример: "59" (можно использовать number, если требуется)
    maxNoiseLevel: number | null; // В децибелах
};

export type IPeriphery = {
    peripheryId: number;
    characteristics: string; // JSON
};

export interface ICategory {
    categoryId: number;
    categoryName: string;
}

export interface IPartition {
    partitionId: number;
    partitionName: string;
}

export interface IType {
    typeId: number;
    typeName: string;
    alternativeName: string;
    typeImage: string;
}

export type IPart = {
    partId: number;
    name: string;
    image: string;
    description: string;
    price: number;
    remainingQuantity: number;
    categories: ICategory;
    partitions: IPartition;
    types: IType;
};

export type ICpuPart = IPart & ICpu;
export type IGpuPart = IPart & IGpu;
export type IMotherboardPart = IPart & IMotherboard;
export type IPsuPart = IPart & IPsu;
export type ICpuAirCoolingPart = IPart & ICpuAirCooling;
export type ICpuLiquidCoolingPart = IPart & ICpuLiquidCooling;
export type IRamPart = IPart & IRam;
export type ICasePart = IPart & ICase;
export type IPeripheryPart = IPart & IPeriphery;
export type ISsdPart = IPart & ISsd;
export type IFanPart = IPart & IFan;

export type IExtendedPart =
    | ICpuPart
    | IGpuPart
    | IMotherboardPart
    | IPsuPart
    | ICpuAirCoolingPart
    | ICpuLiquidCoolingPart
    | IRamPart
    | ICasePart
    | IPeripheryPart
    | ISsdPart
    | IFanPart;

export type IJoinPart =
    | IPeripheryPart
    | ICpuPart
    | IGpuPart
    | IMotherboardPart
    | IPsuPart
    | ICpuAirCoolingPart
    | ICpuLiquidCoolingPart
    | IRamPart
    | ICasePart
    | ISsdPart
    | IFanPart;

export interface ISsdList {
    ssd: ISsdPart;
    quantity: number;
}

export interface IFanList {
    fan: IFanPart;
    quantity: number;
}

export interface IPc {
    pcId: number;
    pcModelGroup: IpcModelGroup;
    pcType: IpcTypes;
    pcCategories: IpcCategories;
    name: string;
    description: string;
    image: string;
    totalPrice: number;
    gpu: IGpuPart;
    cpu: ICpuPart;
    motherboard: IMotherboardPart;
    cpuFan: ICpuAirCoolingPart | ICpuLiquidCoolingPart;
    ram: IRamPart;
    psu: IPsuPart;
    pcCase: ICasePart;
    ssdList: ISsdList[] | null;
    fansList: IFanList[] | null;
}

export interface IValidatePc {
    gpu: IGpuPart;
    cpu: ICpuPart;
    motherboard: IMotherboardPart;
    cpu_fan: ICpuAirCoolingPart | ICpuLiquidCoolingPart;
    ram: IRamPart;
    psu: IPsuPart;
    cases: ICasePart | null;
    ssd: ISsdList[];
    fan: IFanList[];
}

export interface IProduct extends IValidatePc {
    [key: string]: any;
}

export interface IConfiguratorComponent {
    category: ICategory;
    partition: string[];
    type: IType;
    items: IJoinPart[];
}

export interface IConfiguratorComponents {
    components: IConfiguratorComponent[];
}

export interface IOption {
    value: string | number;
    label: string;
}
