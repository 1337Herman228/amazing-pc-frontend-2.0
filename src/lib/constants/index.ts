export const TYPES = {
    CPU: "cpu",
    GPU: "gpu",
    RAM: "ram",
    MOTHERBOARD: "motherboard",
    CPU_FAN: "cpu_fan",
    SSD: "ssd",
    PSU: "psu",
    CASE: "cases",
    FAN: "fan",
};

export const CATEGORIES = {
    COMPONENTS: "components",
    PERIPHERY: "periphery",
};

export const PURCHASE_STATUS_OPTIONS = [
    {
        id: "CREATED",
        label: "Создан",
        value: "CREATED",
    },
    {
        id: "PENDING",
        label: "Обрабатывается",
        value: "PENDING",
    },
    {
        id: "DELIVERING",
        label: "В пути",
        value: "DELIVERING",
    },
    {
        id: "DELIVERED",
        label: "Доставлен",
        value: "DELIVERED",
    },
    {
        id: "COMPLETED",
        label: "Принят",
        value: "COMPLETED",
    },
    {
        id: "CANCELED",
        label: "Отменен",
        value: "CANCELED",
    },
];
