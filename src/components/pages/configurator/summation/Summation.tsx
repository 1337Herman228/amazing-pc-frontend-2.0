// @ts-nocheck
import { useState } from "react";
import "./Summation.scss";
import { v4 as uuidv4 } from "uuid";
import PcSpecModal from "../../../modals/pc-spec-modal/PcSpecModal";
import ConfigBuyBtn from "@/components/buttons/configurator-buy-btn/ConfigBuyBtn";
import { makeProductArray } from "@/lib/functions";

function calculateTotalPrice(data: any): number {
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

const Summation = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    // console.log("product", product);

    const makeCartItemfromProduct = () => {
        const productsArray = [];
        const pc = {};
        pc.name = "Конфигурация";
        pc.id = uuidv4();
        pc.price = calculateTotalPrice(product);
        pc.isPc = true;
        pc.isConfiguration = true;

        if (product?.case !== null) {
            pc.img = product?.case?.img;
        } else pc.img = "/components/case/no-case.jpg";

        for (let key in product) {
            if (product[key] && product[key]?.length != 0) {
                if (
                    product[key]?.category === "Комплектующие" &&
                    !Array.isArray(product[key])
                ) {
                    pc[key] = { ...product[key] };
                } else if (
                    Array.isArray(product[key]) &&
                    product[key].length != 0 &&
                    product[key]?.category === "Комплектующие"
                ) {
                    pc[key] = [...product[key]];
                    pc[key].category = product[key].category;
                    pc[key].title = product[key].title;
                } else {
                    if (Array.isArray(product[key])) {
                        product[key].forEach((element) => {
                            // console.log('el', element)
                            productsArray.push({
                                ...element,
                                category: product[key].category,
                                title: product[key].title,
                            });
                        });
                    } else {
                        productsArray.push({ ...product[key] });
                    }
                }
            }
        }
        productsArray.push(pc);
        return productsArray;
    };
    // console.log("makeCartItemfromProduct", makeCartItemfromProduct());
    // console.log("product", product);

    return (
        <>
            <h1 className="summation__title">
                Конфигуратор
                <br /> AMAZING PC UNLIMITED
            </h1>
            <img
                className="summation__img"
                src={product?.cases?.image || "/components/case/no-case.jpg"}
                // width={305}
                height={170}
                alt=""
                loading="lazy"
            />
            <div className="summation__price">
                Цена {calculateTotalPrice(product)} BYN
            </div>

            <ConfigBuyBtn
                product={makeCartItemfromProduct()}
                is_btn_pressed={false}
            />

            <div className="summation__control-btns">
                <button className="summation__control-btns-save summation__control-btns--btn">
                    <img
                        className="summation__control-btns-icon"
                        src="/configurator-svg/save.svg"
                        width={20}
                        height={20}
                        alt="Save"
                        loading="lazy"
                    />
                    <span className="summation__control-btns-text">
                        Сохранить
                    </span>
                </button>
                <button className="summation__control-btns-reset summation__control-btns--btn">
                    <img
                        className="summation__control-btns-icon"
                        src="/configurator-svg/reset.svg"
                        width={20}
                        height={20}
                        alt="Reset"
                        loading="lazy"
                    />
                    <span className="summation__control-btns-text">
                        Сбросить
                    </span>
                </button>
                <button className="summation__control-btns-load summation__control-btns--btn">
                    <img
                        className="summation__control-btns-icon"
                        src="/configurator-svg/load.svg"
                        width={20}
                        height={20}
                        alt="Load"
                        loading="lazy"
                    />
                    <span className="summation__control-btns-text">
                        Загрузить
                    </span>
                </button>
                <button className="summation__control-btns-close summation__control-btns--btn">
                    <img
                        className="summation__control-btns-icon"
                        src="/configurator-svg/close.svg"
                        width={20}
                        height={20}
                        alt="Close"
                        loading="lazy"
                    />
                    <span className="summation__control-btns-text">
                        Закрыть
                    </span>
                </button>
            </div>
            <div className="summation__configuration">
                <span className="summation__configuration-title">
                    Конфигурация
                </span>

                <ul className="configuration-list">
                    {makeProductArray(product).map((item, index) => {
                        // console.log("item", item);

                        const name = Array.isArray(item)
                            ? item[0].types.alternativeName
                            : item.types.alternativeName;
                        const info = Array.isArray(item)
                            ? item.map(
                                  (el) =>
                                      el.name +
                                      " " +
                                      (el.quantity ? el.quantity + " шт." : "")
                              )
                            : item.name +
                              " " +
                              (item.quantity ? item.quantity + " шт." : "");
                        return (
                            <li
                                key={index}
                                className="configuration-list__item"
                            >
                                <span className="configuration-list__item-name">
                                    {name}
                                </span>
                                <span
                                    key={index}
                                    className="configuration-list__item-info"
                                >
                                    {Array.isArray(info)
                                        ? info.map((el) => (
                                              <>
                                                  {el}
                                                  <br />
                                              </>
                                          ))
                                        : info}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                <button
                    onClick={() => toggleModal(1, true)}
                    className="summation__configuration-all-spec"
                >
                    Полная спецификация
                </button>
                <PcSpecModal
                    product={product}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
            </div>
        </>
    );
};

export default Summation;
