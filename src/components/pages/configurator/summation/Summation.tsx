"use client";

import { useState } from "react";
import "./Summation.scss";
import PcSpecModal from "../../../modals/pc-spec-modal/PcSpecModal";
import { calculateTotalPrice, makeProductArray } from "@/lib/functions";
import {
    ConfiguratorFieldValues,
    IConfiguration,
    IPart,
    IPartWithQuantity,
} from "@/interfaces/types-v2";
import SaveConfigurationModal from "@/components/modals/save-configuration-modal/SaveConfigurationModal";
import ResetModal from "@/components/modals/reset-modal/ResetModal";
import LoadConfigurationModal from "@/components/modals/load-configuration/LoadConfigurationModal";
import { useRouter } from "next/navigation";
import CloseConfiguratorModal from "@/components/modals/close-configurator-modal/CloseConfiguratorModal";
import ConfigBuyBtn from "@/components/buttons/configurator-buy-btn/ConfigBuyBtn";
import { useAppSelector } from "@/lib/redux/store/store";

interface SummationProps {
    products: ConfiguratorFieldValues;
    reset: () => void;
    saveConfiguration: (name: string, needAddToCart?: boolean) => void;
    config?: IConfiguration;
}

const Summation = ({
    products,
    reset,
    saveConfiguration,
    config,
}: SummationProps) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [loadModalOpen, setLoadModalOpen] = useState(false);
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [needAddToCart, setNeedAddToCart] = useState(false);

    const cart = useAppSelector((state) => state.cart);
    const hasErrors = useAppSelector((state) => state.configurator.hasErrors);

    const handleSaveConfiguration = (name: string) => {
        saveConfiguration(name, needAddToCart);
        setSaveModalOpen(false);
        setNeedAddToCart(false);
    };

    const handleAddConfigurationToCart = () => {
        setSaveModalOpen(true);
        setNeedAddToCart(true);
    };

    const handleResetConfiguration = () => {
        reset();
        setResetModalOpen(false);
    };

    const handleLoadConfiguration = (id: string) => {
        router.replace(`/configurator/${id}`);
    };

    const handleCloseConfigurator = () => {
        router.replace(`/`);
    };

    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <>
            <h1 className="summation__title">
                Конфигуратор
                <br />{" "}
                <div className="max-w-3xs text-ellipsis overflow-hidden">
                    {config?.name || "AMAZING PC UNLIMITED"}
                </div>
            </h1>
            <img
                className="summation__img "
                src={products?.cases?.image || "/components/case/no-case.jpg"}
                width={305}
                height={170}
                style={{ height: 170 }}
                alt=""
                loading="lazy"
            />
            <div className="summation__price">
                Цена {calculateTotalPrice(products)} BYN
            </div>

            <ConfigBuyBtn
                disabled={hasErrors}
                onClick={handleAddConfigurationToCart}
                isPressed={
                    !!cart.items?.find(
                        (el) =>
                            el.product.id === config?.id && config?.userCreated
                    )
                }
            />

            <div className="summation__control-btns">
                <button
                    onClick={() => setSaveModalOpen(true)}
                    className={`summation__control-btns-save summation__control-btns--btn ${
                        hasErrors && "summation__control-btns--disabled"
                    }`}
                >
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
                <button
                    onClick={() => setResetModalOpen(true)}
                    className="summation__control-btns-reset summation__control-btns--btn"
                >
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
                <button
                    onClick={() => setLoadModalOpen(true)}
                    className="summation__control-btns-load summation__control-btns--btn"
                >
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
                <button
                    onClick={() => setCloseModalOpen(true)}
                    className="summation__control-btns-close summation__control-btns--btn"
                >
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
                    {makeProductArray(products).map(
                        (item: IPart | IPartWithQuantity[], index) => {
                            const name = Array.isArray(item)
                                ? item[0]?.part?.types?.label
                                : item?.types?.label;
                            const info = Array.isArray(item)
                                ? item.map(
                                      (el) =>
                                          el?.part?.name +
                                          " " +
                                          (el?.quantity
                                              ? el?.quantity + " шт."
                                              : "")
                                  )
                                : item.name;
                            return (
                                <li
                                    key={index}
                                    className="configuration-list__item"
                                >
                                    <span className="configuration-list__item-name">
                                        {name}
                                    </span>
                                    <span className="configuration-list__item-info">
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
                        }
                    )}
                </ul>

                <button
                    onClick={() => toggleModal(1, true)}
                    className="summation__configuration-all-spec"
                >
                    Полная спецификация
                </button>
                <PcSpecModal
                    product={products}
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
                <SaveConfigurationModal
                    open={saveModalOpen}
                    handleOk={handleSaveConfiguration}
                    handleCancel={() => setSaveModalOpen(false)}
                    defaultName={config?.name}
                />
                <ResetModal
                    open={resetModalOpen}
                    handleOk={handleResetConfiguration}
                    handleCancel={() => setResetModalOpen(false)}
                    message={
                        !!config
                            ? "Вернуть изначальную конфигурацию?"
                            : "Сбросить текущую конфигурацию?"
                    }
                />
                <LoadConfigurationModal
                    open={loadModalOpen}
                    handleOk={handleLoadConfiguration}
                    handleCancel={() => setLoadModalOpen(false)}
                />
                <CloseConfiguratorModal
                    open={closeModalOpen}
                    handleOk={handleCloseConfigurator}
                    handleCancel={() => setCloseModalOpen(false)}
                />
            </div>
        </>
    );
};

export default Summation;
