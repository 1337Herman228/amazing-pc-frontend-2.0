"use client";

import React from "react";
import "./AdminSearchInput.scss";

const AdminSearchInput = ({
    name,
    setStateField,
}: {
    name: string;
    setStateField: Function;
}) => {
    const debounceInfo = (info: string) => {
        setTimeout(() => {
            setStateField(info);
        }, 150);
    };

    return (
        <div className="admin-search-input">
            <label className="admin-search-input__label" htmlFor={name}>
                {name}
            </label>
            <input
                onChange={(e) => debounceInfo(e.target.value)}
                className="admin-search-input__input"
                type="text"
                id={name}
                name={name}
            />
        </div>
    );
};

export default AdminSearchInput;
