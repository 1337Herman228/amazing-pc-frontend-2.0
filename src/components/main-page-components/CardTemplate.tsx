import Link from "next/link";

const CardTemplate = (card_info: any, i: any) => {
    const contentStyleDesktop = {
        backgroundImage: `url(${card_info.img_desktop})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const contentStyleMobile = {
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 32%, rgba(255,255,255,0) 40%), url(${card_info.img_mobile}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div key={i}>
            <div
                className="carousel-card hidden-mobile"
                style={contentStyleDesktop}
            >
                <aside className="carousel-card__aside">
                    <h2 className="carousel-card__aside-title">
                        {card_info.title}
                    </h2>
                    <div className="carousel-card__aside-description">
                        <p>{card_info.description}</p>
                    </div>

                    {card_info.button_link !== "none" && (
                        <Link
                            className="carousel-card__link link-more-details"
                            href={card_info.button_link}
                        >
                            Подробнее
                        </Link>
                    )}
                </aside>
            </div>

            <div
                className="carousel-card visible-mobile"
                style={contentStyleMobile}
            >
                <aside
                    className={
                        card_info.button_link !== "none"
                            ? `carousel-card__aside`
                            : `carousel-card__aside carousel-card__aside--no-button`
                    }
                >
                    <h2 className="carousel-card__aside-title">
                        {card_info.title}
                    </h2>
                    <div className="carousel-card__aside-description">
                        <p>{card_info.description}</p>
                    </div>
                    {card_info.button_link !== "none" && (
                        <Link
                            className="carousel-card__link link-more-details"
                            href={card_info.button_link}
                        >
                            Подробнее
                        </Link>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default CardTemplate;
