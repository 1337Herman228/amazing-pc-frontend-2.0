"use client";

import Link from "next/link";
import "./SinglePcHeader.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ISingleProductHeader } from "@/interfaces/types";

const SinglePcHeader = ({
    header_info,
}: {
    header_info: ISingleProductHeader;
}) => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const [bgImg, setBgImg] = useState(
        isTablet
            ? { backgroundImage: `url(${header_info.img_mobile})` }
            : { backgroundImage: `url(${header_info.img})` }
    );

    useEffect(() => {
        setBgImg(
            isTablet
                ? { backgroundImage: `url(${header_info.img_mobile})` }
                : { backgroundImage: `url(${header_info.img})` }
        );
    }, [isTablet]);

    const pathname = usePathname();

    let breadcrumbs_middle_part = "";
    let breadcrumbs_middle_link = "";
    if (pathname)
        switch (true) {
            case pathname.includes("gaming-pc"):
                breadcrumbs_middle_part = "Игровые компьютеры";
                breadcrumbs_middle_link = "/gaming-pc";
                break;
            case pathname.includes("notebook"):
                breadcrumbs_middle_part = "ИГРОВЫЕ НОУТБУКИ";
                breadcrumbs_middle_link = "/notebook";
                break;
            case pathname.includes("workstation"):
                breadcrumbs_middle_part = "ПРОФЕССИОНАЛЬНЫЕ КОМПЬЮТЕРЫ";
                breadcrumbs_middle_link = "/workstation";
                break;
        }

    // useEffect(() => {
    //     handleResize();
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // const handleResize = () => {
    //     window.addEventListener("resize", function () {
    //         if (window.innerWidth < 1024) {
    //             setBgImg({ backgroundImage: `url(${header_info.img_mobile})` });
    //         } else {
    //             setBgImg({ backgroundImage: `url(${header_info.img})` });
    //         }
    //     });
    // };

    return (
        <>
            <section id="start" style={bgImg} className="single-product-header">
                <div className="single-product-header__body container section">
                    <div className="breadcrumbs">
                        <Link href="/" className="breadcrumbs__link">
                            Главная
                        </Link>
                        <span className="breadcrumbs__divider">/</span>
                        <Link
                            href={breadcrumbs_middle_link}
                            className="breadcrumbs__link"
                        >
                            {breadcrumbs_middle_part}
                        </Link>
                        <span className="breadcrumbs__divider">/</span>
                        <span className="breadcrumbs__link current">
                            {header_info.title}
                        </span>
                    </div>
                    <div className="information">
                        <h1 className="information__title">
                            {header_info.title}
                        </h1>
                        <div className="information__description">
                            <p>{header_info.description}</p>
                        </div>
                        <Link
                            href="#kits-and-prices"
                            className="information__link link-more-details"
                        >
                            <img
                                className="information__link__img"
                                src="/arrow-down.svg"
                                width={20}
                                height={20}
                                alt=""
                                loading="lazy"
                            />
                            Варианты {header_info.title}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SinglePcHeader;
