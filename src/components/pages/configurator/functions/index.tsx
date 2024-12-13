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

//Замени на свой тип
export const countFinalPrice = (product: any) => {
    let price = 0;

    for (const key in product) {
        const item = product[key];

        if (item != null && item?.length != 0) {
            if (item?.length > 0) {
                item.forEach((element: any) => {
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
