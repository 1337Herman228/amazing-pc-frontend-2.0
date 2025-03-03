import {
    ConfiguratorFieldValues,
    ICategory,
    IOptionTemplate,
    IPart,
    IPartition,
    IPartWithQuantity,
    IPc,
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

export const mapPcToConfiguratorFieldValues = (obj: IPc) => {
    return {
        gpu: obj.gpu,
        cpu: obj.cpu,
        motherboard: obj.motherboard,
        cpu_fan: obj.cpuFan,
        ram: obj.ram,
        psu: obj.psu,
        cases: obj.pcCase,
        ssd: obj.ssd,
        fan: obj.fans,
    } as ConfiguratorFieldValues;
};

export function calculateTotalPrice(data: any): number {
    if (Array.isArray(data)) {
        // Если data — массив, рекурсивно суммируем элементы массива
        return data.reduce(
            (total, item) => total + calculateTotalPrice(item),
            0
        );
    }

    if (data && typeof data === "object") {
        // Если data — объект, проверяем наличие поля `price`
        const price = data.price ?? 0; // Если `price` отсутствует, берем 0
        const nestedSum = Object.values(data).reduce(
            (total: number, value) => total + calculateTotalPrice(value),
            0
        );
        return price + nestedSum;
    }

    // Если data — не объект и не массив, возвращаем 0
    return 0;
}

export function declension(number: number): string {
    const word = "Комплектация";
    if (number % 10 === 1 && number % 100 !== 11) {
        return number + " " + word.replace(/я$/, "я");
    } else if (
        number % 10 >= 2 &&
        number % 10 <= 4 &&
        (number % 100 < 10 || number % 100 >= 20)
    ) {
        return number + " " + word.replace(/я$/, "и");
    } else {
        return number + " " + word + "й";
    }
}
