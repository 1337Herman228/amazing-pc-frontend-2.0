import { useEffect } from "react";
import Link from "next/link";

const PopularSectionHead = () => {
    useEffect(() => {
        addScrollToPopularSection();
        addScrollToButtonRight();
        addScrollToButtonLeft();
    }, []);

    const addScrollToPopularSection = () => {
        const block = document.querySelector(".popular-container");
        let isDragging = false;
        let startX: any;
        let scrollLeft: any;

        const isTouchDevice =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.maxTouchPoints > 0;

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

        document.addEventListener("mousemove", (event: any) => {
            if (isDragging) {
                const deltaX = event.clientX - startX;
                if (block) block.scrollLeft = scrollLeft - deltaX;
                isScrolledToMaxRight(block);
                isScrolledToMaxLeft(block);
            }
        });

        if (isTouchDevice) {
            document.addEventListener("touchmove", (event: any) => {
                if (isDragging) {
                    const deltaX = event.touches[0].clientX - startX;
                    if (block) block.scrollLeft = scrollLeft - deltaX;
                    isScrolledToMaxRight(block);
                    isScrolledToMaxLeft(block);
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
            ".popular-head__controls-btn-right"
        );
        const scrollableBlock = document.querySelector(".popular-container");
        let scrollDistance = 390; // Расстояние, на которое будет прокручиваться контент
        let animationDuration = 500; // Длительность анимации, мс

        scrollButton?.addEventListener("click", () => {
            smoothScroll(
                scrollableBlock,
                "right",
                scrollDistance,
                animationDuration
            ); // Прокрутка вправо на 300 пикселей за 1 секунду
            setTimeout(() => {
                isScrolledToMaxLeft(scrollableBlock);
                isScrolledToMaxRight(scrollableBlock);
            }, animationDuration + 1);
        });
    };

    const addScrollToButtonLeft = () => {
        const scrollButton = document.querySelector(
            ".popular-head__controls-btn-left"
        );
        const scrollableBlock = document.querySelector(".popular-container");
        let scrollDistance = 390; // Расстояние, на которое будет прокручиваться контент
        let animationDuration = 500; // Длительность анимации, мс

        scrollButton?.addEventListener("click", () => {
            if (scrollableBlock?.scrollLeft && scrollableBlock.scrollLeft > 0) {
                smoothScroll(
                    scrollableBlock,
                    "left",
                    scrollDistance,
                    animationDuration
                );
            }
            setTimeout(() => {
                isScrolledToMaxLeft(scrollableBlock);
                isScrolledToMaxRight(scrollableBlock);
            }, animationDuration + 1);
        });
    };

    const isScrolledToMaxRight = (scrollableBlock: any) => {
        const scrollButton: any = document.querySelector(
            ".popular-head__controls-btn-right"
        );
        let isScrolledToMaxRight =
            scrollableBlock.scrollLeft + scrollableBlock.clientWidth >=
            scrollableBlock.scrollWidth;
        if (scrollButton)
            isScrolledToMaxRight
                ? (scrollButton.disabled = true)
                : (scrollButton.disabled = false);
    };
    const isScrolledToMaxLeft = (scrollableBlock: any) => {
        const scrollButton: any = document.querySelector(
            ".popular-head__controls-btn-left"
        );
        if (scrollButton)
            scrollableBlock.scrollLeft === 0
                ? (scrollButton.disabled = true)
                : (scrollButton.disabled = false);
    };

    const smoothScroll = (
        element: any,
        direction: any,
        distance: any,
        duration: any
    ) => {
        const start = element.scrollLeft;
        const startTime = performance.now();

        function step(timestamp: any) {
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
        <div className="popular-head">
            <h2 className="popular-head__title">Популярные модели</h2>
            <div className="popular-head__controls">
                <Link
                    href="/gaming-pc"
                    className="popular-head__controls-view-all green-circle-bordered-link hidden-mobile"
                >
                    Смотреть все модели
                </Link>
                <button
                    disabled
                    className="popular-head__controls-btn-left green-circle-bordered-button"
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
                <button className="popular-head__controls-btn-right green-circle-bordered-button">
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
    );
};
export default PopularSectionHead;
