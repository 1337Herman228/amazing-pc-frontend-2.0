"use client";

import React, { useRef } from "react";
import "./PriceSlider.scss";
import { ConfigProvider, Slider } from "antd";

const PriceSlider = ({ name, minMax, setMinMax }: any) => {
    const refMin = useRef<HTMLSpanElement>(null);
    const refMax = useRef<HTMLSpanElement>(null);

    const handleChange = (value: any) => {
        setTimeout(() => {
            setMinMax(value);
            if (refMin.current && refMax.current) {
                refMin.current.innerHTML = value[0];
                refMax.current.innerHTML = value[1];
            }
        }, 99);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Slider: {
                        trackHoverBg: "var(--main-color)",
                        trackBg: "var(--main-color)",
                        handleColor: "var(--main-color)",
                        handleActiveColor: "var(--main-color-accent)",
                        dotActiveBorderColor: "var(--main-color-accent)",
                        handleActiveOutlineColor: "var(--main-color-accent)",
                        colorPrimaryBorderHover: "var(--main-color)",

                        railBg: "gray",
                        railHoverBg: "#999",
                    },
                },
            }}
        >
            <div className="price-slider">
                <div className="price-slider__label">
                    <p>
                        {name} | <span ref={refMin}>{minMax[0]}</span> -{" "}
                        <span ref={refMax}>{minMax[1]}</span>
                    </p>
                </div>
                <Slider
                    className="price-slider__slider"
                    min={minMax[0]}
                    max={minMax[1]}
                    range={{}}
                    defaultValue={minMax}
                    onChange={handleChange}
                />
            </div>
        </ConfigProvider>
    );
};

export default PriceSlider;
