import { IOptionTemplate } from "@/interfaces/types-v2";

export enum PART_COMPONENTS_TYPES {
    GPU = "gpu",
    CPU = "cpu",
    MOTHERBOARD = "motherboard",
    CPU_FAN = "cpu_fan",
    RAM = "ram",
    SSD = "ssd",
    PSU = "psu",
    CASES = "cases",
    FAN = "fan",
}

export enum PART_CATEGORIES {
    COMPONENTS = "components",
    PERIPHERY = "periphery",
}

export const GENERAL_CHOICE_OPTION = {
    value: "",
    label: "Все",
    id: "all",
} as IOptionTemplate;

export const NOT_SELECTED_OPTION = {
    value: "",
    label: "Не выбрано",
    id: "not_selected",
} as IOptionTemplate;
