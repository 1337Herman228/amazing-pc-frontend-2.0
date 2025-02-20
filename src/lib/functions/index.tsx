import { ConfiguratorFieldValues } from "@/components/pages/configurator/Configurator_V2";
import { GENERAL_CHOICE_OPTION } from "@/constants";
import {
    ICategory,
    IOptionTemplate,
    IPart,
    IPartition,
    IPartWithQuantity,
    IType,
} from "@/interfaces/types-v2";
import { FieldValues } from "react-hook-form";

export const stringifyName = (name: string) =>
    name.toLowerCase().replace(/\s/g, "-");

export const makeOptionsList = <T extends IOptionTemplate>(
    array: T[],
    extraChoices?: IOptionTemplate[]
): IOptionTemplate[] => {
    const newArr: IOptionTemplate[] = extraChoices ? [...extraChoices] : [];

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

export const makeProductArray = (product: ConfiguratorFieldValues) => {
    let productArray = [];
    for (const key in product) {
        const item = product[key];

        if (item) {
            productArray.push(item);
        }
    }
    return productArray;
};

export const getCategories = (product: ConfiguratorFieldValues) => {
    let titles = new Set<string>();
    for (const key in product) {
        let item;
        const isArray = Array.isArray(product[key]);
        isArray
            ? (item = product[key] as IPartWithQuantity[])
            : (item = product[key] as IPart);

        if (item) {
            titles.add(
                isArray
                    ? // @ts-ignore
                      item[0]?.part?.categories?.label
                    : // @ts-ignore
                      item?.categories?.label
            );
        }
    }
    return titles;
};
