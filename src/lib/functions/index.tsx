// @ts-nocheck

import CaseForm from "@/components/forms/part-forms/CaseForm";
import CpuFanForm from "@/components/forms/part-forms/CpuFanForm";
import CpuForm from "@/components/forms/part-forms/CpuForm";
import FanForm from "@/components/forms/part-forms/FanForm";
import GpuForm from "@/components/forms/part-forms/GpuForm";
import MotherboardForm from "@/components/forms/part-forms/MotherboardForm";
import PeripheryForm from "@/components/forms/part-forms/PeripheryForm";
import PsuForm from "@/components/forms/part-forms/PsuForm";
import RamForm from "@/components/forms/part-forms/RamForm";
import SsdForm from "@/components/forms/part-forms/SsdForm";

export const makeCpuInfoObject = (object: any) => {
    const cpu: any = {};
    if (object.socket) cpu["Сокет"] = object.socket;
    if (object.baseFrequency)
        cpu["Базовая частота"] = object.baseFrequency + " Мгц";
    if (object.boostFrequency)
        cpu["Турбо-частота"] = object.boostFrequency + " Мгц";
    if (object.cashL1) cpu["Кэш L1"] = object.cashL1;
    if (object.cashL2) cpu["Кэш L2"] = object.cashL2;
    if (object.cashL3) cpu["Кэш L3"] = object.cashL3;
    if (object.cpuCores) cpu["Кол-во ядер"] = object.cpuCores;
    if (object.cpuThreads) cpu["Кол-во потоков"] = object.cpuThreads;
    if (object.maxRamCapacity)
        cpu["Максимальный объем памяти"] = object.maxRamCapacity + " ГБ";
    if (object.ramType)
        cpu["Поддерживаемые типы памяти"] = JSON.parse(object.ramType).join(
            ", "
        );
    if (object.tdp) cpu["TDP"] = object.tdp + " Вт";
    if (object.techProcess) cpu["Тех-процесс"] = object.techProcess;

    return cpu;
};

export const makeGpuInfoObject = (object: any) => {
    const gpu: any = {};
    if (object.techProcess) gpu["Тех-процесс"] = object.techProcess + " нм";
    if (object.maxDisplaysQuantity)
        gpu["Макс. количество дисплеев"] = object.maxDisplaysQuantity;
    if (object.maxResolution) gpu["Макс. разрешение"] = object.maxResolution;
    if (object.baseFrequency)
        gpu["Базовая частота"] = object.baseFrequency + " Мгц";
    if (object.boostFrequency)
        gpu["Турбо-частота"] = object.boostFrequency + " Мгц";
    if (object.vramCapacity)
        gpu["Объем видеопамяти"] = object.vramCapacity + " ГБ";
    if (object.vramType) gpu["Тип видеопамяти"] = object.vramType;
    if (object.busWidth) gpu["Ширина шины"] = object.busWidth + " бит";
    if (object.hdmi) gpu["Количество HDMI"] = object.hdmi;
    if (object.displayPort) gpu["Количество DisplayPort"] = object.displayPort;
    if (object.cuda) gpu["CUDA ядра"] = object.cuda;
    if (object.powerConnector) gpu["Разъем питания"] = object.powerConnector;
    if (object.minPowerUnit)
        gpu["Минимальный блок питания"] = object.minPowerUnit + " Вт";
    if (object.fans) gpu["Количество вентиляторов"] = object.fans;
    if (object.extensionSlots)
        gpu["Количество слотов расширения"] = object.extensionSlots;
    if (object["length"]) gpu["Длина"] = object["length"] + " мм";
    if (object.width) gpu["Ширина"] = object.width + " мм";
    if (object.height) gpu["Высота"] = object.height + " мм";

    return gpu;
};

export const makeMotherboardInfoObject = (object: any) => {
    const motherboard: any = {};

    if (object.socket) motherboard["Сокет"] = object.socket;
    if (object.formFactor) motherboard["Форм-фактор"] = object.formFactor;
    if (object.chipset) motherboard["Чипсет"] = object.chipset;
    if (object.ramType) motherboard["Тип памяти"] = object.ramType;
    if (object.ramSlots)
        motherboard["Количество слотов для памяти"] = object.ramSlots;
    if (object.maxRamCapacity)
        motherboard["Максимальный объем памяти"] =
            object.maxRamCapacity + " ГБ";
    if (object.sataQuantity)
        motherboard["Количество SATA"] = object.sataQuantity;
    if (object.m2Quantity) motherboard["Количество M.2"] = object.m2Quantity;
    if (object.pcie16Quantity)
        motherboard["Количество PCIe 16x"] = object.pcie16Quantity;

    return motherboard;
};

export const makeCpuAirCoolingObject = (object: any) => {
    const cpuFan: any = {};

    if (object.sockets)
        cpuFan["Поддерживаемые сокеты"] = JSON.parse(object.sockets).join(", ");
    if (object.fansQuantity)
        cpuFan["Количество вентиляторов"] = object.fansQuantity;
    if (object.fanSize) cpuFan["Размер вентилятора"] = object.fanSize;
    if (object.tdp) cpuFan["Максимальный TDP"] = object.tdp + " Вт";
    if (object.backlight) cpuFan["Подсветка"] = object.backlight;
    if (object.height) cpuFan["Высота"] = object.height + " мм";
    if (object.fanSpeed) cpuFan["Скорость вентилятора"] = object.fanSpeed;
    if (object.airFlow) cpuFan["Воздушный поток"] = object.airFlow + " CFM";
    if (object.maxNoiseLevel)
        cpuFan["Максимальный уровень шума"] = object.maxNoiseLevel + " дБ";
    if (object.connector) cpuFan["Разъем"] = object.connector;

    return cpuFan;
};

export const makeCpuLiquidCoolingObject = (object: any) => {
    const cpuFan: any = {};

    if (object.sockets)
        cpuFan["Поддерживаемые сокеты"] = JSON.parse(object.sockets).join(", ");
    if (object.fansQuantity)
        cpuFan["Количество вентиляторов"] = object.fansQuantity;
    if (object.fanSize) cpuFan["Размер вентилятора"] = object.fanSize;
    if (object.tdp) cpuFan["Максимальный TDP"] = object.tdp + " Вт";
    if (object.backlight) cpuFan["Подсветка"] = object.backlight;
    if (object["length"]) cpuFan["Длина"] = object["length"] + " мм";
    if (object.width) cpuFan["Ширина"] = object.width + " мм";
    if (object.height) cpuFan["Высота"] = object.height + " мм";
    if (object.fanSpeed) cpuFan["Скорость вентилятора"] = object.fanSpeed;
    if (object.airFlow) cpuFan["Воздушный поток"] = object.airFlow + " СFM";
    if (object.maxNoiseLevel)
        cpuFan["Максимальный уровень шума"] = object.maxNoiseLevel + " дБ";
    if (object.connector) cpuFan["Разъем"] = object.connector;

    return cpuFan;
};

export const makeRamObject = (object: any) => {
    const ram: any = {};

    if (object.type) ram["Тип"] = object.type;
    if (object.frequency) ram["Частота"] = object.frequency + " МГц";
    if (object.capacity) ram["Объем"] = object.capacity + " ГБ";

    return ram;
};

export const makeSsdObject = (object: any) => {
    const ssd: any = {};

    if (object.formFactor) ssd["Форм-фактор"] = object.formFactor;
    if (object.capacity) ssd["Объем"] = object.capacity;
    if (object.flashMemoryType) ssd["Тип флеш-памяти"] = object.flashMemoryType;
    if (object.controllerType) ssd["Тип контроллера"] = object.controllerType;
    if (object.writeVelocity)
        ssd["Скорость записи"] = object.writeVelocity + " МБ/с";
    if (object.readVelocity)
        ssd["Скорость чтения"] = object.readVelocity + " МБ/с";
    if (object.randomWriteSpeed)
        ssd["Случайная скорость записи"] = object.randomWriteSpeed + " IOPS";
    if (object.connectionType) ssd["Тип подключения"] = object.connectionType;
    if (object.mtbfTime) ssd["MTBF"] = object.mtbfTime;
    if (object.maxTemperature)
        ssd["Максимальная температура"] = object.maxTemperature;

    return ssd;
};

export const makePsuObject = (object: any) => {
    const psu: any = {};

    if (object.power) psu["Мощность"] = object.power + " Вт";
    if (object.formFactor) psu["Форм-фактор"] = object.formFactor;
    if (object.pfc) psu["PFC"] = object.pfc;
    if (object.coolingSystem) psu["Система охлаждения"] = object.coolingSystem;
    if (object.mbConnector)
        psu["Разъем для материнской платы"] = object.mbConnector;
    if (object.cpu4Plus4Quantity)
        psu["Количество 4+4 pin для CPU"] = object.cpu4Plus4Quantity;
    if (object.gpu6Plus2Quantity)
        psu["Количество 6+2 pin для GPU"] = object.gpu6Plus2Quantity;
    if (object.sataQuantity) psu["Количество SATA"] = object.sataQuantity;
    if (object.certificate) psu["Сертификат"] = object.certificate;
    if (object.modular) psu["Модульный"] = object.modular;

    return psu;
};

export const makeCaseObject = (object: any) => {
    const caseInfo: any = {};

    if (object.maxCpuCoolerHeight)
        caseInfo["Максимальная высота кулера"] =
            object.maxCpuCoolerHeight + " мм";
    if (object.maxGpuLength)
        caseInfo["Максимальная длина GPU"] = object.maxGpuLength + " мм";
    if (object.maxLiquidCoolingLength)
        caseInfo["Максимальная длина жидкостного охлаждения"] =
            object.maxLiquidCoolingLength + " мм";
    if (object.hddSlotsQuantity)
        caseInfo["Количество слотов для HDD"] = object.hddSlotsQuantity;
    if (object.ssdSlotsQuantity)
        caseInfo["Количество слотов для SSD"] = object.ssdSlotsQuantity;
    if (object.extensionSlotsQuantity)
        caseInfo["Количество расширительных слотов"] =
            object.extensionSlotsQuantity;
    if (object.length) caseInfo["Длина"] = object.length + " мм";
    if (object.width) caseInfo["Ширина"] = object.width + " мм";
    if (object.height) caseInfo["Высота"] = object.height + " мм";
    if (object.weight) caseInfo["Вес"] = object.weight + " кг";
    if (object.possibleFormFactors)
        caseInfo["Поддерживаемые форм-факторы мат.плат"] = JSON.parse(
            object.possibleFormFactors
        ).join(", ");

    return caseInfo;
};

export const makeFanObject = (object: any) => {
    const fan: any = {};

    if (object.fanSize) fan["Размер вентилятора"] = object.fanSize;
    if (object.backlight) fan["Подсветка"] = object.backlight;
    if (object.fanSpeed) fan["Скорость вентилятора"] = object.fanSpeed;
    if (object.airFlow) fan["Воздушный поток"] = object.airFlow + " CFM";
    if (object.maxNoiseLevel)
        fan["Максимальный уровень шума"] = object.maxNoiseLevel + " дБ";

    return fan;
};

export const makePeripheryObject = (object: any) => {
    const periphery: any = {};

    if (object?.characteristics) {
        const characteristics = JSON.parse(object?.characteristics);
        Object.entries(characteristics).forEach(([key, value]) => {
            periphery[key] = value;
        });
    }

    return periphery;
};

export const makePartInfoObject = ([type, object]: any) => {
    switch (type) {
        case "cpu":
            return makeCpuInfoObject(object);
        case "gpu":
            return makeGpuInfoObject(object);
        case "motherboard":
            return makeMotherboardInfoObject(object);
        case "cpuAirCooling":
            return makeCpuAirCoolingObject(object);
        case "cpuLiquidCooling":
            return makeCpuLiquidCoolingObject(object);
        case "ram":
            return makeRamObject(object);
        case "ssd":
            return makeSsdObject(object);
        case "psu":
            return makePsuObject(object);
        case "cases":
            return makeCaseObject(object);
        case "fan":
            return makeFanObject(object);
        case "periphery":
            return makePeripheryObject(object);
    }
};

export const transformParts = (data: any) => {
    const partsArray: any = [];

    data.forEach((element: any) => {
        const part: any = {};

        for (const key in element) {
            if (element[key] != null && element[key] !== "") {
                part[key] = element[key];
            }
        }
        partsArray.push(part);
    });
    return partsArray;
};

export const transformPart = (part: any) => {
    const newPart: any = {};
    for (const key in part) {
        if (part[key] != null && part[key] !== "") {
            newPart[key] = part[key];
        }
    }
    return newPart;
};

export const makePartEntityObject = ({
    data,
    isEditForm = false,
    part = null,
    selectedCategory,
    selectedType,
    selectedPartition,
}: any) => {
    if (selectedCategory === "Периферия") {
        return makePeripheryEntityObject(
            data,
            isEditForm,
            part,
            selectedCategory,
            selectedType,
            selectedPartition
        );
    } else if (selectedCategory === "Комплектующие") {
        switch (selectedType) {
            case "Процессор":
                return makeCpuEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Видеокарта":
                return makeGpuEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Материнская плата":
                return makeMotherboardEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Охлаждение": {
                if (data?.cpuFanType === "Воздушное")
                    return makeCpuAirCoolingEntityObject(
                        data,
                        isEditForm,
                        part,
                        selectedCategory,
                        selectedType,
                        selectedPartition
                    );
                if (data?.cpuFanType === "Жидкостное")
                    return makeCpuLiquidCoolingEntityObject(
                        data,
                        isEditForm,
                        part,
                        selectedCategory,
                        selectedType,
                        selectedPartition
                    );
            }
            case "Оперативная память":
                return makeRamEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "SSD накопитель":
                return makeSsdEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Блок питания":
                return makePsuEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Корпус":
                return makeCaseEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
            case "Вентиляторы":
                return makeFanEntityObject(
                    data,
                    isEditForm,
                    part,
                    selectedCategory,
                    selectedType,
                    selectedPartition
                );
        }
    }
};

export const fullPartObject = ({
    object,
    data,
    isEditForm,
    category,
    type,
    partition,
    part,
}: any) => {
    if (isEditForm) object.partId = part.partId;
    object.name = data.name;
    object.price = data.price;
    object.category = category;
    object.type = type;
    object.partition = partition;
    object.description = data.description;
    object.image =
        "/uploads/" + data.name.toLowerCase().replace(/\s/g, "-") + ".jpg";
    object.remainingQuantity = Number(data.remainingQuantity);
};

export const makePeripheryEntityObject = (
    data: any,
    isEditForm: any,
    part: any,
    category: any,
    type: any,
    partition: any
) => {
    const object: any = {
        periphery: {
            characteristics: {},
        },
    };

    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    const characteristics: any = {};
    for (const key in data) {
        if (key.includes("key")) {
            characteristics[data[key]] =
                data["value" + "/" + key.split("/")[1]];
        }
    }

    object.periphery.characteristics = JSON.stringify(characteristics);
    if (isEditForm) object.periphery.peripheryId = part.partId;

    return object;
};

export const makeCpuEntityObject = (
    data: any,
    isEditForm: any,
    part: any,
    category: any,
    type: any,
    partition: any
) => {
    const object: any = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.cpu = {
        baseFrequency: data.baseFrequency,
        boostFrequency: data.boostFrequency,
        cpuCores: data.cpuCores,
        cpuThreads: data.cpuThreads,
        maxRamCapacity: data.maxRamCapacity,
        tdp: data.tdp,
        cacheL1: data.cachel1,
        cacheL2: data.cachel2,
        cacheL3: data.cachel3,
        socket: data.socket,
        techProcess: data.techProcess,
        ramType: JSON.stringify(data.ramType.replace(/\s/g, "").split(",")),
    };
    if (isEditForm) object.cpu.cpuId = part.partId;

    return object;
};

export const makeGpuEntityObject = (
    data: any,
    isEditForm: any,
    part: any,
    category: any,
    type: any,
    partition: any
) => {
    const object: any = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.gpu = {
        baseFrequency: data.baseFrequency,
        boostFrequency: data.boostFrequency,
        vramCapacity: data.vramCapacity,
        vramType: data.vramType,
        busWidth: data.busWidth,
        hdmi: data.hdmi,
        displayPort: data.displayPort,
        cuda: data.cuda,
        powerConnector: data.powerConnector,
        minPowerUnit: data.minPowerUnit,
        fans: data.fans,
        extensionSlots: data.extensionSlots,
        length: data[length],
        width: data.width,
        height: data.height,
    };

    if (isEditForm) object.gpu.gpuId = part.partId;

    return object;
};

export const makeMotherboardEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.motherboard = {
        socket: data.socket,
        formFactor: data.formFactor,
        chipset: data.chipset,
        ramType: data.ramType,
        ramSlots: data.ramSlots,
        maxRamCapacity: data.maxRamCapacity,
        sataQuantity: data.sataQuantity,
        m2Quantity: data.m2Quantity,
        pcie16Quantity: data.pcie16Quantity,
    };

    if (isEditForm) object.motherboard.motherboardId = part.partId;

    return object;
};

export const makeCpuAirCoolingEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.cpuAirCooling = {
        fansQuantity: data.fansQuantity,
        fanSize: data.fanSize,
        tdp: data.tdp,
        backlight: data.backlight,
        height: data.height,
        fanSpeed: data.fanSpeed,
        airFlow: data.airFlow,
        maxNoiseLevel: data.maxNoiseLevel,
        connector: data.connector,
        sockets: JSON.stringify(data.sockets.replace(/\s/g, "").split(",")),
    };

    if (isEditForm) {
        object.cpuAirCooling.cpuAirCoolingId = part.partId;
    }

    return object;
};

export const makeCpuLiquidCoolingEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.cpuLiquidCooling = {
        fansQuantity: data.fansQuantity,
        fanSize: data.fanSize,
        tdp: data.tdp,
        backlight: data.backlight,
        length: data[length],
        width: data.width,
        height: data.height,
        fanSpeed: data.fanSpeed,
        airFlow: data.airFlow,
        maxNoiseLevel: data.maxNoiseLevel,
        connector: data.connector,
        sockets: JSON.stringify(data.sockets.replace(/\s/g, "").split(",")),
    };

    if (isEditForm) {
        object.cpuLiquidCooling.cpuLiquidCoolingId = part.partId;
    }

    return object;
};

export const makeRamEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.ram = {
        type: data.type,
        frequency: data.frequency,
        capacity: data.capacity,
    };

    if (isEditForm) {
        object.ram.ramId = part.partId;
    }

    return object;
};

export const makeSsdEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.ssd = {
        formFactor: data.formFactor,
        capacity: data.capacity,
        flashMemoryType: data.flashMemoryType,
        controllerType: data.controllerType,
        writeVelocity: data.writeVelocity,
        readVelocity: data.readVelocity,
        randomWriteSpeed: data.randomWriteSpeed,
        connectionType: data.connectionType,
        mtbfTime: data.mtbfTime,
        maxTemperature: data.maxTemperature,
    };

    if (isEditForm) {
        object.ssd.ssdId = part.partId;
    }

    return object;
};

export const makePsuEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.psu = {
        power: data.power,
        formFactor: data.formFactor,
        pfc: data.pfc,
        coolingSystem: data.coolingSystem,
        mbConnector: data.mbConnector,
        cpu4Plus4Quantity: data.cpu4Plus4Quantity,
        gpu6Plus2Quantity: data.gpu6Plus2Quantity,
        sataQuantity: data.sataQuantity,
        certificate: data.certificate,
        modular: data.modular,
    };

    if (isEditForm) {
        object.psu.psuId = part.partId;
    }

    return object;
};

export const makeCaseEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.cases = {
        maxCpuCoolerHeight: data.maxCpuCoolerHeight,
        maxGpuLength: data.maxGpuLength,
        maxLiquidCoolingLength: data.maxLiquidCoolingLength,
        hddSlotsQuantity: data.hddSlotsQuantity,
        ssdSlotsQuantity: data.ssdSlotsQuantity,
        extensionSlotsQuantity: data.extensionSlotsQuantity,
        length: data[length],
        width: data.width,
        height: data.height,
        weight: data.weight,
        possibleFormFactors: JSON.stringify(
            data.possibleFormFactors.replace(/\s/g, "").split(",")
        ),
    };

    if (isEditForm) {
        object.cases.caseId = part.partId;
    }

    return object;
};

export const makeFanEntityObject = (
    data,
    isEditForm,
    part,
    category,
    type,
    partition
) => {
    const object = {};
    fullPartObject({
        object,
        data,
        isEditForm,
        category,
        type,
        partition,
        part,
    });

    object.fan = {
        fanSize: data.fanSize,
        backlight: data.backlight,
        fanSpeed: data.fanSpeed,
        airFlow: data.airFlow,
        maxNoiseLevel: data.maxNoiseLevel,
    };

    if (isEditForm) {
        object.fan.fanId = part.partId;
    }

    return object;
};

export const saveImg = async (imgName, img) => {
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

export const deleteImg = async (imgName) => {
    const formData = new FormData();
    formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

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

export const saveSvgIcon = async (imgName, img) => {
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

export const deleteSvgIcon = async (imgName) => {
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

export const selectIcon = (name) => {
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

export const selectIconByType = (name) => {
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

export const switchAdditionalForm = ({
    selectedCategory,
    selectedType,
    register,
    unregister,
    errors,
    part = null,
    isEditForm = false,
    isFormSubmitted = false,
}) => {
    if (selectedCategory === "Комплектующие") {
        switch (selectedType) {
            case "Процессор":
                return (
                    <CpuForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        cpu={part}
                    />
                );
            case "Видеокарта":
                return (
                    <GpuForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        gpu={part}
                    />
                );
            case "Материнская плата":
                return (
                    <MotherboardForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        motherboard={part}
                    />
                );
            case "Охлаждение":
                return (
                    <CpuFanForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        cpuAirCooling={part?.cpuAirCooling}
                        cpuLiquidCooling={part}
                    />
                );
            case "Оперативная память":
                return (
                    <RamForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        ram={part}
                    />
                );
            case "SSD накопитель":
                return (
                    <SsdForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        ssd={part}
                    />
                );
            case "Блок питания":
                return (
                    <PsuForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        psu={part}
                    />
                );
            case "Корпус":
                return (
                    <CaseForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        caseData={part}
                    />
                );
            case "Вентиляторы":
                return (
                    <FanForm
                        register={register}
                        unregister={unregister}
                        errors={errors}
                        isEditForm={isEditForm}
                        isFormSubmitted={isFormSubmitted}
                        fanData={part}
                    />
                );
        }
    } else if (selectedCategory === "Периферия") {
        return (
            <PeripheryForm
                register={register}
                unregister={unregister}
                errors={errors}
                isEditForm={isEditForm}
                periphery={part}
            />
        );
    } else {
        return null;
    }
};
