import { GENERAL_CHOICE_OPTION } from "@/constants";
import {
    ICategory,
    IOptionTemplate,
    IPart,
    IPartition,
    IType,
} from "@/interfaces/types-v2";
import { FieldValues } from "react-hook-form";

export const stringifyName = (name: string) =>
    name.toLowerCase().replace(/\s/g, "-");

export const makeOptionsList = <T extends IOptionTemplate>(
    array: T[],
    extraChoices?: IOptionTemplate[]
): IOptionTemplate[] => {
    const newArr: IOptionTemplate[] = extraChoices
        ? [...extraChoices]
        : [GENERAL_CHOICE_OPTION];

    array.forEach((element) => {
        newArr.push({
            id: element.id,
            value: element.value,
            label: element.label,
        });
    });

    return newArr;
};

const getComponentsCharacteristics = (fieldValues: FieldValues) => {
    const characteristics = [];
    for (let key in fieldValues) {
        const [value, label] = key.split(";");
        if (value !== "name" && value !== "description" && value !== "price")
            characteristics.push({
                value: value,
                label: label,
                item: fieldValues[key].includes(",")
                    ? fieldValues[key].split(",").map((el: string) => el.trim())
                    : fieldValues[key],
            });
    }
    return characteristics;
};

const getPeripheryCharacteristics = (fieldValues: FieldValues) => {
    const characteristics = [];
    for (let key in fieldValues) {
        const [prefix, value] = key.split(";");
        if (prefix === "label") {
            const item = fieldValues[`value;${value}`];
            characteristics.push({
                value: value,
                label: fieldValues[key],
                item: item.includes(",")
                    ? item.split(",").map((el: string) => el.trim())
                    : item,
            });
        }
    }
    return characteristics;
};

const getCharacteristicsArrayFromFieldValues = (
    fieldValues: FieldValues,
    isPeripheryForm = false
) => {
    if (isPeripheryForm) return getComponentsCharacteristics(fieldValues);
    else return getPeripheryCharacteristics(fieldValues);
};

export const makePartCollectionRecord = (
    part: IPart | undefined,
    fieldValues: FieldValues,
    selectedCategory: ICategory | undefined,
    selectedType: IType | undefined,
    selectedPartition: IPartition | undefined
) => {
    return {
        id: part?.id ?? "",
        categories: selectedCategory,
        characteristics: getCharacteristicsArrayFromFieldValues(fieldValues),
        description: fieldValues.description,
        image: `/uploads/${stringifyName(fieldValues.name)}.jpg`,
        name: fieldValues.name,
        partitions: selectedPartition,
        price: fieldValues.price,
        types: selectedType,
        productType: "PART",
    } as IPart;
};

export const saveImg = async (imgName: string, img: any) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
        } else {
            throw new Error("Upload failed.");
        }
    } catch (error) {}
};

export const deleteImg = async (imgName: string) => {
    const formData = new FormData();
    formData.append("name", stringifyName(imgName));

    try {
        const response = await fetch("/api/unlink", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
        } else {
            throw new Error("Delete failed.");
        }
    } catch (error) {}
};

export const saveSvgIcon = async (imgName: string, img: any) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

    try {
        const response = await fetch("/api/save-svg-icon", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
        } else {
            throw new Error("Upload failed.");
        }
    } catch (error) {}
};

export const deleteSvgIcon = async (imgName: string) => {
    const formData = new FormData();
    formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

    try {
        const response = await fetch("/api/delete-svg-icon", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
        } else {
            throw new Error("Delete failed.");
        }
    } catch (error) {}
};

/////////////////////////////////////////////

export const makeProductArray = (product) => {
    let productArray = [];
    for (const key in product) {
        const item = product[key];

        if (item != null && item?.length != 0) {
            // item.title = key
            productArray.push(item);
        }
    }
    return productArray;
};

export const getCategories = (product) => {
    let titles = [];
    for (const key in product) {
        const item = product[key];
        if (
            item != null &&
            item?.length != 0 &&
            !titles.includes(item.category)
        ) {
            titles.push(item.category);
        }
    }
    return titles;
};

export const selectIcon = (name: string) => {
    switch (name) {
        case "Видеокарта":
            return "/gaming-pc/components-svg/gpu.svg";
        case "Процессор":
            return "/gaming-pc/components-svg/cpu.svg";
        case "Материнская плата":
            return "/gaming-pc/components-svg/mb.svg";
        case "Охлаждение":
            return "/gaming-pc/components-svg/cpu-fan.svg";
        case "Оперативная память":
            return "/gaming-pc/components-svg/ram.svg";
        case "SSD накопитель":
            return "/gaming-pc/components-svg/ssd.svg";
        case "Блок питания":
            return "/gaming-pc/components-svg/pow-sup.svg";
        case "Корпус":
            return "/gaming-pc/components-svg/case.svg";
        case "Вентиляторы":
            return "/gaming-pc/components-svg/fan.svg";
        case "Монитор":
            return "/configurator-svg/monitor.svg";
        case "Мышь":
            return "/configurator-svg/mouse.svg";
        case "Наушники":
            return "/configurator-svg/mouse.svg";
        default:
            return null;
    }
};

export const selectIconByType = (name: string) => {
    switch (name) {
        case "gpu":
            return "/gaming-pc/components-svg/gpu.svg";
        case "cpu":
            return "/gaming-pc/components-svg/cpu.svg";
        case "motherboard":
            return "/gaming-pc/components-svg/mb.svg";
        case "cpu_fan":
            return "/gaming-pc/components-svg/cpu-fan.svg";
        case "ram":
            return "/gaming-pc/components-svg/ram.svg";
        case "ssd":
            return "/gaming-pc/components-svg/ssd.svg";
        case "power_supply":
            return "/gaming-pc/components-svg/pow-sup.svg";
        case "case":
            return "/gaming-pc/components-svg/case.svg";
        case "fans":
            return "/gaming-pc/components-svg/fan.svg";
        case "display":
            return "/configurator-svg/monitor.svg";
        case "mouse":
            return "/configurator-svg/mouse.svg";
        default:
            return null;
    }
};

export const countFinalPrice = (product) => {
    let price = 0;

    for (const key in product) {
        const item = product[key];

        if (item != null && item?.length != 0) {
            if (item?.length > 0) {
                item.forEach((element) => {
                    let quantity = element?.quantity ?? 1;
                    price += Number(element?.price) * quantity;
                });
            } else {
                price += Number(item?.price);
            }
        }
    }
    return price;
};
