import Link from "next/link";
import React from "react";

interface PcInfoProps {
    name: string;
    isConfiguration: boolean;
    id: string;
    toggleModal: Function;
}

const PcInfo = ({ name, isConfiguration, id, toggleModal }: PcInfoProps) => {
    return (
        <div className="pc-info">
            <div className="title-div">
                <span className="title-div--pc-name">{name}</span>
                {isConfiguration && (
                    <span className="title-div--pc-id">{id}</span>
                )}
            </div>
            <div className="pc-dashboard">
                <button
                    className="pc-dashboard__btn main-color-transparent-rect-btn"
                    onClick={() => toggleModal(1, true)}
                >
                    Cпецификация
                </button>
                <Link
                    className="pc-dashboard__btn main-color-transparent-rect-btn"
                    href={`/configurator/${id}`}
                >
                    Изменить
                </Link>
            </div>
        </div>
    );
};

export default PcInfo;
