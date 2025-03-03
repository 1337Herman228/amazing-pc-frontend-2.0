import { ConfigProvider, Modal } from "antd";
import "./PcSpecModal.scss";
import { getCategories, makeProductArray } from "@/lib/functions";
import {
    ConfiguratorFieldValues,
    IPart,
    IPartWithQuantity,
} from "@/interfaces/types-v2";

const bg_color = "#111";
const modalStyles = {
    mask: {
        backdropFilter: "blur(0px)",
    },
    content: {
        color: "white",
        backgroundColor: bg_color,
    },
};

interface PcSpecModalProps {
    product: ConfiguratorFieldValues;
    isModalOpen: boolean[];
    toggleModal: (idx: any, target: any) => void;
}

const PcSpecModal = ({
    product,
    isModalOpen,
    toggleModal,
}: PcSpecModalProps) => {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorIcon: "white",
                        colorIconHover: "var(--main-color)",
                    },
                }}
                modal={{
                    styles: modalStyles,
                }}
            >
                <Modal
                    centered
                    open={isModalOpen[1]}
                    onOk={() => toggleModal(1, false)}
                    onCancel={() => toggleModal(1, false)}
                    footer={null}
                    width={1200}
                >
                    <table className="modal-table">
                        <tbody>
                            {Array.from(getCategories(product))
                                .filter((item) => !!item)
                                .map((item, i) => {
                                    const _category = item;
                                    return (
                                        <>
                                            <tr
                                                key={item + i}
                                                className="modal-table__header"
                                            >
                                                <th
                                                    className="modal-table__header-text"
                                                    colSpan={3}
                                                >
                                                    {item}
                                                </th>
                                            </tr>

                                            {makeProductArray(product).map(
                                                (part) => {
                                                    const isArray =
                                                        Array.isArray(part);
                                                    if (
                                                        isArray &&
                                                        part.length > 0 &&
                                                        part[0]?.part
                                                            ?.categories
                                                            ?.label ===
                                                            _category
                                                    )
                                                        return (
                                                            <TableRowArray
                                                                key={
                                                                    part[0].part
                                                                        .id
                                                                }
                                                                item={
                                                                    part as IPartWithQuantity[]
                                                                }
                                                            />
                                                        );
                                                    else if (
                                                        !isArray &&
                                                        part?.categories
                                                            ?.label ===
                                                            _category
                                                    )
                                                        return (
                                                            <TableRow
                                                                key={part.id}
                                                                item={
                                                                    part as IPart
                                                                }
                                                            />
                                                        );
                                                }
                                            )}
                                        </>
                                    );
                                })}
                        </tbody>
                    </table>
                </Modal>
            </ConfigProvider>
        </>
    );
};

const TableRowArray = ({ item }: { item: IPartWithQuantity[] }) => {
    return (
        <>
            <tr className="modal-table__row">
                <td className="modal-table__row-name">
                    <img
                        className="modal-table__row-name-icon"
                        src={item[0].part.types.image}
                        width={20}
                        height={20}
                        alt=""
                        loading="lazy"
                    />
                    <span className="modal-table__row-name-text">
                        {item[0].part.types.label}
                    </span>
                </td>
                <td className="modal-table__row-info">
                    {item.map((item) => (
                        <div key={item.part.name + "-" + item.part.id}>
                            {item.part.name} x {item.quantity}
                            <br />
                        </div>
                    ))}
                </td>
                <td className="modal-table__row-price">
                    {item.map((item) => (
                        <div key={item.part.id}>
                            {item.part.price} BYN
                            <br />
                        </div>
                    ))}
                </td>
            </tr>
        </>
    );
};

const TableRow = ({ item }: { item: IPart }) => {
    return (
        <>
            <tr className="modal-table__row">
                <td className="modal-table__row-name">
                    <img
                        className="modal-table__row-name-icon"
                        src={item?.types?.image}
                        width={20}
                        height={20}
                        alt=""
                        loading="lazy"
                    />
                    <span className="modal-table__row-name-text">
                        {item?.types?.label}
                    </span>
                </td>
                <td className="modal-table__row-info">{item.name}</td>
                <td className="modal-table__row-price">{item.price} BYN</td>
            </tr>
        </>
    );
};

export default PcSpecModal;
