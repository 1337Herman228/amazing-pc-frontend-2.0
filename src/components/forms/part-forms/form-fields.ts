import { ICharacteristicItem } from "@/interfaces/types-v2";

export const CPU_FIELDS = [
    {
        value: "base_frequency",
        label: "Базовая частота",
        item: "2500 Мгц",
    },
    {
        value: "boost_frequency",
        label: "Турбо частота",
        item: "4400 Мгц",
    },
    {
        value: "cpu_cores",
        label: "Кол-во ядер",
        item: "6",
    },
    {
        value: "cpu_threads",
        label: "Кол-во потоков",
        item: "12",
    },
    {
        value: "max_ram_capacity",
        label: "Макс объем оперативной памяти",
        item: "128 ГБ",
    },
    {
        value: "tdp",
        label: "Тепловыделение",
        item: "65 Вт",
    },
    {
        value: "cachel1",
        label: "Кэш 1-го уровня",
        item: "1024 КБ",
    },
    {
        value: "cachel2",
        label: "Кэш 2-го уровня",
        item: "7680 КБ",
    },
    {
        value: "cachel3",
        label: "Кэш 3-го уровня",
        item: "18432 КБ",
    },
    {
        value: "socket",
        label: "Сокет",
        item: "LGA 1700",
    },
    {
        value: "tech_process",
        label: "Тех-процесс",
        item: "7 нм",
    },
    {
        value: "ram_type",
        label: "Тип ОЗУ",
        item: ["DDR4", "DDR5"],
    },
] as ICharacteristicItem[];

export const GPU_FIELDS = [
    {
        value: "base_frequency",
        label: "Базовая частота",
        item: "1980 Мгц",
    },
    {
        value: "boost_frequency",
        label: "Турбо частота",
        item: "2640 Мгц",
    },
    {
        value: "bus_width",
        label: "Шина",
        item: "192 бит",
    },
    {
        value: "cuda",
        label: "CUDA ядра",
        item: "7680",
    },
    {
        value: "display_port",
        label: "DisplayPort",
        item: "3",
    },
    {
        value: "extension_slots",
        label: "Слоты расширения",
        item: "3.1",
    },
    {
        value: "fans",
        label: "Вентиляторы",
        item: "3",
    },
    {
        value: "hdmi",
        label: "HDMI",
        item: "1",
    },
    {
        value: "height",
        label: "Высота",
        item: "63.5 мм",
    },
    {
        value: "length",
        label: "Длина",
        item: "329 мм",
    },
    {
        value: "max_displays_quantity",
        label: "Макс кол-во дисплеев",
        item: "4",
    },
    {
        value: "min_power_unit",
        label: "Мин мощность блока питания",
        item: "700 Вт",
    },
    {
        value: "tech_process",
        label: "Тех-процесс",
        item: "5 нм",
    },
    {
        value: "vram_capacity",
        label: "Видеопамять",
        item: "12 ГБ",
    },
    {
        value: "width",
        label: "Ширина",
        item: "130 мм",
    },
    {
        value: "max_resolution",
        label: "Макс разрешение",
        item: "7680x4320",
    },
    {
        value: "vram_type",
        label: "Тип видеопамяти",
        item: "GDDR6X",
    },
    {
        value: "power_connector",
        label: "Разъем питания",
        item: "8+8 pin",
    },
] as ICharacteristicItem[];

export const RAM_FIELDS = [
    {
        value: "capacity",
        label: "Объём",
        item: "16 ГБ",
    },
    {
        value: "frequency",
        label: "Тактовая частота",
        item: "3200 Мгц",
    },
    {
        value: "type",
        label: "Тип DDR",
        item: "DDR4",
    },
] as ICharacteristicItem[];

export const MOTHERBOARD_FIELDS = [
    {
        value: "m2quantity",
        label: "Количество M2 слотов",
        item: "4",
    },
    {
        value: "max_ram_capacity",
        label: "Макс объем оперативной памяти",
        item: "128 ГБ",
    },
    {
        value: "pcie16quantity",
        label: "Количество PCIe x16 слотов",
        item: "3",
    },
    {
        value: "ram_slots",
        label: "Количество слотов для RAM",
        item: "4",
    },
    {
        value: "sata_quantity",
        label: "Количество SATA портов",
        item: "6",
    },
    {
        value: "chipset",
        label: "Чипсет",
        item: "Intel Z790",
    },
    {
        value: "form_factor",
        label: "Форм-фактор",
        item: "ATX",
    },
    {
        value: "ram_type",
        label: "Тип RAM",
        item: "DDR5",
    },
    {
        value: "socket",
        label: "Сокет",
        item: "LGA 1700",
    },
] as ICharacteristicItem[];

export const CPU_FAN_FIELDS = [
    {
        value: "cpu_fan_type",
        label: "Тип охлаждения",
        item: "Водяное",
    },
    {
        value: "air_flow",
        label: "Воздушный поток",
        item: "70.07 CFM",
    },
    {
        value: "fans_quantity",
        label: "Количество вентиляторов",
        item: "3",
    },
    {
        value: "height",
        label: "Высота",
        item: "30 мм",
    },
    {
        value: "length",
        label: "Длина",
        item: "399.5 мм",
    },
    {
        value: "max_noise_level",
        label: "Макс уровень шума",
        item: "36.45 дБ",
    },
    {
        value: "tdp",
        label: "TDP",
        item: "280 Вт",
    },
    {
        value: "width",
        label: "Ширина",
        item: "120 мм",
    },
    {
        value: "backlight",
        label: "Подсветка",
        item: "ARGB",
    },
    {
        value: "connector",
        label: "Коннектор",
        item: "4-pin PWM",
    },
    {
        value: "fan_size",
        label: "Размер вентилятора",
        item: "120x120x25 мм",
    },
    {
        value: "fan_speed",
        label: "Скорость вентилятора",
        item: "2200 +/- 300 RPM",
    },
    {
        value: "sockets",
        label: "Сокеты",
        item: [
            "AM4",
            "AM5",
            "LGA 1150",
            "LGA 1151",
            "LGA 1155",
            "LGA 1200",
            "LGA 1700",
            "LGA 2011",
            "LGA 2011-3",
            "LGA 2066",
        ],
    },
] as ICharacteristicItem[];

export const SSD_FIELDS = [
    {
        value: "capacity",
        label: "Емкость",
        item: "512 ГБ",
    },
    {
        value: "flash_memory_type",
        label: "Тип флеш-памяти",
        item: "3D NAND",
    },
    {
        value: "form_factor",
        label: "Форм-фактор",
        item: "M.2 NVME",
    },
    {
        value: "connection_type",
        label: "Тип подключения",
        item: "PCI-E 4.0 x4",
    },
    {
        value: "controller_type",
        label: "Тип контроллера",
        item: "Silicon Motion SM2269XT",
    },
    {
        value: "read_velocity",
        label: "Скорость чтения",
        item: "5000 МБ/с",
    },
    {
        value: "write_velocity",
        label: "Скорость записи",
        item: "2700 МБ/с",
    },
] as ICharacteristicItem[];

export const PSU_FIELDS = [
    {
        value: "power",
        label: "Мощность",
        item: "750W",
    },
    {
        value: "cpu4plus4quantity",
        label: "Количество 4+4-pin для процессора",
        item: "2",
    },
    {
        value: "gpu6plus2quantity",
        label: "Количество 6+2-pin для GPU",
        item: "4",
    },
    {
        value: "sata_quantity",
        label: "Количество SATA разъемов",
        item: "7",
    },
    {
        value: "form_factor",
        label: "Форм-фактор",
        item: "ATX",
    },
    {
        value: "pfc",
        label: "PFC",
        item: "активный",
    },
    {
        value: "certificate",
        label: "Сертификат",
        item: "80+ Bronze",
    },
    {
        value: "modular",
        label: "Модульность",
        item: "Полумодульный",
    },
    {
        value: "cooling_system",
        label: "Охлаждающая система",
        item: "1 вентилятор (120 мм)",
    },
] as ICharacteristicItem[];

export const CASE_FIELDS = [
    {
        value: "extension_slots_quantity",
        label: "Количество слотов расширения",
        item: "8",
    },
    {
        value: "hdd_slots_quantity",
        label: "Количество слотов для HDD",
        item: "4",
    },
    {
        value: "height",
        label: "Высота",
        item: "450 мм",
    },
    {
        value: "length",
        label: "Длина",
        item: "446 мм",
    },
    {
        value: "max_cpu_cooler_height",
        label: "Макс высота кулера процессора",
        item: "163 мм",
    },
    {
        value: "max_gpu_length",
        label: "Макс длина GPU",
        item: "400 мм",
    },
    {
        value: "max_liquid_cooling_length",
        label: "Макс длина системы жидкостного охлаждения",
        item: "420 мм",
    },
    {
        value: "ssd_slots_quantity",
        label: "Количество слотов для SSD",
        item: "4",
    },
    {
        value: "weight",
        label: "Вес",
        item: "11 кг",
    },
    {
        value: "width",
        label: "Ширина",
        item: "285 мм",
    },
    {
        value: "possible_form_factors",
        label: "Поддерживаемые форм-факторы",
        item: ["micro-ATX", "mini-ATX", "ATX"],
    },
] as ICharacteristicItem[];

export const FANS_FIELDS = [
    {
        value: "air_flow",
        label: "Воздушный поток",
        item: "81 CFM",
    },
    {
        value: "max_noise_level",
        label: "Макс уровень шума",
        item: "26.8 dB",
    },
    {
        value: "backlight",
        label: "Подсветка",
        item: "ARGB",
    },
    {
        value: "fan_size",
        label: "Размер вентилятора",
        item: "140x140 мм",
    },
    {
        value: "fan_speed",
        label: "Скорость вентилятора",
        item: "250-1600 об/мин",
    },
] as ICharacteristicItem[];
