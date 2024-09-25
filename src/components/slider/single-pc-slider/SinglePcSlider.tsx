"use client";

import { useMediaQuery } from "react-responsive";
import "./SinglePcSlider.scss";
import { useEffect } from "react";

const SinglePcSlider = ({ items }: { items: React.ReactNode }) => {
    const isTouchDevice = useMediaQuery({
        query: "(hover: none) and (any-pointer: coarse)",
    });

    useEffect(() => {
        addScrollToPopularSection();
        addScrollToButtonRight();
        addScrollToButtonLeft();
    }, []);

    const addScrollToPopularSection = () => {
        const block = document.querySelector("._slider-body");
        let isDragging = false;
        let startX: number;
        let scrollLeft: number;

        block?.addEventListener("mousedown", (event: any) => {
            isDragging = true;
            startX = event.clientX;
            scrollLeft = block.scrollLeft;
        });

        if (isTouchDevice) {
            block?.addEventListener("touchstart", (event: any) => {
                isDragging = true;
                startX = event.touches[0].clientX;
                scrollLeft = block.scrollLeft;
            });
        }

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const deltaX = event.clientX - startX;
                if (block) block.scrollLeft = scrollLeft - deltaX;
                if (block) {
                    isScrolledToMaxRight(block);
                    isScrolledToMaxLeft(block);
                }
            }
        });

        if (isTouchDevice) {
            document.addEventListener("touchmove", (event) => {
                if (isDragging) {
                    const deltaX = event.touches[0].clientX - startX;
                    if (block) block.scrollLeft = scrollLeft - deltaX;
                    if (block) {
                        isScrolledToMaxRight(block);
                        isScrolledToMaxLeft(block);
                    }
                }
            });
        }

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
        document.addEventListener("touchend", () => {
            isDragging = false;
        });
    };

    const addScrollToButtonRight = () => {
        const scrollButton = document.querySelector(
            "._slider-header-controls__btn-right"
        );
        const scrollableBlock = document.querySelector("._slider-body");
        let scrollDistance = 310; // Расстояние, на которое будет прокручиваться контент
        let animationDuration = 500; // Длительность анимации, мс

        scrollButton?.addEventListener("click", () => {
            smoothScroll(
                scrollableBlock,
                "right",
                scrollDistance,
                animationDuration
            ); // Прокрутка вправо на 300 пикселей за 1 секунду
            setTimeout(() => {
                if (scrollableBlock) {
                    isScrolledToMaxLeft(scrollableBlock);
                    isScrolledToMaxRight(scrollableBlock);
                }
            }, animationDuration + 1);
        });
    };

    const addScrollToButtonLeft = () => {
        const scrollButton = document.querySelector(
            "._slider-header-controls__btn-left"
        );
        const scrollableBlock = document.querySelector("._slider-body");
        let scrollDistance = 310; // Расстояние, на которое будет прокручиваться контент
        let animationDuration = 500; // Длительность анимации, мс

        scrollButton?.addEventListener("click", () => {
            if (scrollableBlock!.scrollLeft > 0) {
                smoothScroll(
                    scrollableBlock,
                    "left",
                    scrollDistance,
                    animationDuration
                );
            }
            setTimeout(() => {
                if (scrollableBlock) {
                    isScrolledToMaxLeft(scrollableBlock);
                    isScrolledToMaxRight(scrollableBlock);
                }
            }, animationDuration + 1);
        });
    };

    const isScrolledToMaxRight = (scrollableBlock: Element) => {
        const scrollButton: any = document.querySelector(
            "._slider-header-controls__btn-right"
        );
        let isScrolledToMaxRight =
            scrollableBlock.scrollLeft + scrollableBlock.clientWidth >=
            scrollableBlock.scrollWidth;
        isScrolledToMaxRight && scrollButton
            ? (scrollButton.disabled = true)
            : (scrollButton.disabled = false);
    };
    const isScrolledToMaxLeft = (scrollableBlock: Element) => {
        const scrollButton: any = document.querySelector(
            "._slider-header-controls__btn-left"
        );
        scrollableBlock.scrollLeft === 0 && scrollButton
            ? (scrollButton.disabled = true)
            : (scrollButton.disabled = false);
    };

    const smoothScroll = (
        element: any,
        direction: "right" | "left",
        distance: number,
        duration: number
    ) => {
        const start = element.scrollLeft;
        const startTime = performance.now();

        function step(timestamp: number) {
            const currentTime = timestamp - startTime;
            let targetScrollLeft;

            if (direction === "left") {
                targetScrollLeft = Math.max(
                    0,
                    start - distance * (currentTime / duration)
                );
            } else if (direction === "right") {
                targetScrollLeft = Math.min(
                    element.scrollWidth - element.clientWidth,
                    start + distance * (currentTime / duration)
                );
                targetScrollLeft += 5;
            }

            element.scrollLeft = targetScrollLeft;

            if (currentTime < duration) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    };

    return (
        <div className="_slider">
            <div className="_slider-header hidden-tablet">
                <div className="_slider-header-info"></div>
                <div className="_slider-header-controls">
                    <button
                        disabled
                        className="_slider-header-controls__btn-left green-circle-bordered-button"
                    >
                        <svg
                            width="18"
                            height="22"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.828 6.99974L7.778 11.9497L6.364 13.3637L0 6.99974L6.364 0.635742L7.778 2.04974L2.828 6.99974Z"
                                fill="#03053D"
                            />
                        </svg>
                    </button>
                    <button className="_slider-header-controls__btn-right green-circle-bordered-button">
                        <svg
                            width="18"
                            height="22"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.17168 6.99974L0.22168 2.04974L1.63568 0.635742L7.99968 6.99974L1.63568 13.3637L0.22168 11.9497L5.17168 6.99974Z"
                                fill="#03053D"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="_slider-body">{items}</div>
        </div>
    );
};

export default SinglePcSlider;
