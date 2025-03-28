"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IPc } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./MyConfigurationsPage.scss";
import PcSpecModal from "@/components/modals/pc-spec-modal/PcSpecModal";
import { mapPcToConfiguratorFieldValues } from "@/lib/functions";
import { PC_TYPES } from "@/constants";
import PcInfo from "../cart-page/details/PcInfo";

const MyConfigurationsPage = () => {
    const { getUserConfigurations, deleteUserConfiguration } = useFetch();

    const [configurations, setConfigurations] = useState<IPc[] | null>(null);

    const fetchConfiguratorParts = async () => {
        const data = await getUserConfigurations();
        setConfigurations(data);
    };

    useEffect(() => {
        fetchConfiguratorParts();
        styleBody();

        return () => {
            unstyleBody();
        };
    }, []);

    const styleBody = () => {
        document.body.style.backgroundColor = "var(--tm-color-dark-black-2)";
    };
    const unstyleBody = () => {
        document.body.style.backgroundColor = "var(--background-main-color)";
    };

    const handleDeleteConfiguration = async (id: string) => {
        await deleteUserConfiguration(id);
        fetchConfiguratorParts();
    };

    if (!configurations) return <LoadingPage />;

    return (
        <section className="user-configurations container section">
            <h1 className="user-configurations__main-title">
                Сохраненные конфигурации
            </h1>
            {configurations.length === 0 ? (
                <div className="user-configurations-is-empty">
                    Вы пока ничего сюда не добавили
                </div>
            ) : (
                <table className="user-configurations__products-table">
                    <thead className="user-configurations__products-table-header hidden-tablet">
                        <tr className="table-row-header">
                            <th
                                className="table-row-header__cell text-align-left"
                                colSpan={2}
                            >
                                Конфигурация
                            </th>

                            <th className="table-row-header__cell text-align-center">
                                Цена
                            </th>
                            <th className="table-row-header__cell"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {configurations.map((item, i) => (
                            <MyConfigurationTableItem
                                deleteFunction={handleDeleteConfiguration}
                                key={i}
                                configuration={item}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

interface MyConfigurationTableItemProps {
    configuration: IPc;
    deleteFunction: (id: string) => void;
}

const MyConfigurationTableItem = ({
    configuration,
    deleteFunction,
}: MyConfigurationTableItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const toggleModal = (idx: any, target: any) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <>
            <tr className="product-item-row hidden-tablet">
                <td className="product-item-row__cell">
                    <img
                        className="product-item-row__main-image"
                        src={configuration.image}
                        alt=""
                        width={320}
                        height={220}
                    />
                </td>
                <td className="product-item-row__cell">
                    <PcInfo
                        hasToCartBtn
                        name={configuration.name}
                        isConfiguration={
                            configuration?.pcType?.value ===
                            PC_TYPES.CONFIGURATION
                        }
                        id={configuration.id}
                        toggleModal={toggleModal}
                    />
                </td>

                <td className="product-item-row__cell price">
                    <span>{configuration.price} BYN</span>
                </td>
                <td className="product-item-row__cell del-btn">
                    <button
                        onClick={() => deleteFunction(configuration.id)}
                        className="btn-delete"
                    >
                        <img
                            src="/red-x-icon.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                    </button>
                </td>
            </tr>

            {/* таблица для отображения у планшетов и меньше */}
            <tr className="product-item-row visible-tablet">
                <td className="product-item-row__cell">
                    <div className="grid-cell">
                        <div className="grid-cell__main-image">
                            <img
                                src={configuration.image}
                                alt=""
                                width={320}
                                height={220}
                            />
                        </div>
                        <div className="grid-cell__info">
                            <PcInfo
                                hasToCartBtn
                                name={configuration.name}
                                isConfiguration={
                                    configuration?.pcType?.value ===
                                    PC_TYPES.CONFIGURATION
                                }
                                id={configuration.id}
                                toggleModal={toggleModal}
                            />
                        </div>
                        <div className="grid-cell__del-btn">
                            <button
                                onClick={() => deleteFunction(configuration.id)}
                                className="btn-delete"
                            >
                                <img
                                    src="/red-x-icon.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        <div className="grid-cell__price price">
                            <span>{configuration.price} BYN</span>
                        </div>
                    </div>
                </td>
            </tr>

            <PcSpecModal
                product={mapPcToConfiguratorFieldValues(configuration as IPc)}
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
            />
        </>
    );
};

export default MyConfigurationsPage;
