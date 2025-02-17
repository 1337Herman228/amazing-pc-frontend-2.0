"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
    Button,
    ConfigProvider,
    Input,
    notification,
    Space,
    Table,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import "./AccountsTable.scss";
import { IRole, IUser } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import DeleteModal from "@/components/modals/delete-modal/DeleteModal";

interface DataType {
    key: string;
    login: string;
    name: string;
    role: IRole;
    phone: string;
    email: string;
}

type DataIndex = keyof DataType;

const convertUsersToTableData = (users: IUser[]) => {
    return users.map(
        (user) =>
            ({
                key: user.id,
                login: user.login,
                name: user.name + " " + user.surname,
                role: user.roles,
                phone: user.phone,
                email: user.email,
            } as DataType)
    );
};

interface AccountsTableProps {
    fetch: () => void;
    data: IUser[];
}

const AccountsTable = ({ data, fetch }: AccountsTableProps) => {
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Учетная запись успешно удалена",
        });
    };
    const errorDeleteNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Не удалось удалить данную учетную запись",
        });
    };

    const { deleteUser, getAccounts } = useFetch();

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        id: string;
    }>({ open: false, id: "" });

    const showModal = (id: string) => {
        setDeleteModal({ open: true, id: id });
    };
    const handleOk = () => {
        handleDeleteUser(deleteModal.id);
        setDeleteModal({ open: false, id: "" });
    };

    const handleCancel = () => {
        setDeleteModal({ open: false, id: "" });
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            fetch();

            succesDeleteNotification();
        } catch (error) {
            errorDeleteNotification();
            console.error(error);
        }
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): TableColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "var(--main-color)" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        render: (text) => text,
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: "Логин",
            dataIndex: "login",
            key: "login",
            width: "20%",
            ...getColumnSearchProps("login"),
            sorter: (a, b) => a.login.length - b.login.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Имя Фамилия",
            dataIndex: "name",
            key: "name",
            width: "20%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Роль",
            dataIndex: "role",
            key: "role",
            ...getColumnSearchProps("role"),
            render: (text) => text.label,
            sorter: (a, b) => a.role.label.length - b.role.label.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
            ...getColumnSearchProps("phone"),
            sorter: (a, b) => a.phone.length - b.phone.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            width: "10%",
            render: (value, record) => (
                <div className="manage-buttons">
                    <a
                        className="manage-button manage-buttons__edit"
                        href={`/admin/accounts/edit/${value.key}`}
                    >
                        <img
                            className="light-img hover-img"
                            src="/edit.svg"
                            alt="Редактировать"
                            width={25}
                            height={25}
                        />
                    </a>
                    <button
                        onClick={() => showModal(record?.key as string)}
                        className=" manage-button manage-buttons__delete"
                    >
                        <img
                            className="hover-img"
                            src="/red-x-icon.svg"
                            alt="Удалить"
                            width={15}
                            height={15}
                        />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: "var(--tm-color-dark-black-2)",

                    colorPrimary: "var(--main-color)",
                    colorPrimaryBorder: "var(--main-color)",

                    colorText: "var(--tm-color-white)",
                    colorSplit: "var(--tm-color-white)",
                    colorTextDescription: "var(--tm-color-white)",
                    colorTextDisabled: "var(--tm-color-white)",
                    colorTextHeading: "var(--tm-color-white)",
                    controlItemBgActive: "var(--tm-color-white)",
                    colorLink: "var(--tm-color-white)",
                    colorLinkActive: "var(--tm-color-white)",
                    colorLinkHover: "var(--tm-color-white)",
                    colorIcon: "white",
                    colorIconHover: "var(--main-color)",

                    controlItemBgHover: "var(--main-color)",
                },
                components: {
                    Table: {
                        bodySortBg: "var(--tm-color-dark-grey)", // цвет сортированных колонок
                        borderColor: "var(--tm-color-grey)",
                        rowHoverBg: "var(--tm-color-dark-grey)",

                        headerColor: "var(--tm-color-white)",
                        headerFilterHoverBg: "var(--tm-color-dark-grey)",
                        headerSortActiveBg: "var(--tm-color-dark-grey)",
                        headerSortHoverBg: "var(--tm-color-dark-grey)",

                        expandIconBg: "var(--tm-color-white)",
                    },
                },
            }}
        >
            <div className="accounts-table">
                {contextHolder}
                <Table<DataType>
                    columns={columns}
                    dataSource={convertUsersToTableData(data)}
                />
                <DeleteModal
                    open={deleteModal.open}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    message="Удалить данную учетную запись?"
                />
            </div>
        </ConfigProvider>
    );
};

export default AccountsTable;
