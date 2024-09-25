import Link from "next/link";
import "./UserFooter.scss";

const footer_social = [
    {
        img: "/footer-icons/vk.svg",
        title: "Вконтакте",
        link: "https://vk.com/",
    },
    {
        img: "/footer-icons/youtube.svg",
        title: "Youtube",
        link: "https://youtube.com/",
    },
    {
        img: "/footer-icons/telegram.svg",
        title: "Telegram",
        link: "https://telegram.org/",
    },
    {
        img: "/footer-icons/discord.svg",
        title: "Discord",
        link: "https://discord.com/",
    },
    {
        img: "/footer-icons/instagram.svg",
        title: "Instagram",
        link: "https://instagram.com/",
    },
];

const footer_info = [
    {
        title: "Модели",
        body: [
            {
                name: "Игровые компьютеры",
                link: "/gaming-pc",
            },
            {
                name: "Рабочие станции",
                link: "/workstation",
            },
            {
                name: "Игровые ноутбуки",
                link: "/gaming-laptop",
            },
            {
                name: "Каталог",
                link: "/catalog",
            },
        ],
    },
    {
        title: "Услуги",
        body: [
            {
                name: "Модернизация",
                link: "/gaming-pc",
            },
            {
                name: "Техническое обслуживание",
                link: "/workstation",
            },
            {
                name: "Моддинг и кастомизация",
                link: "/gaming-laptop",
            },
            {
                name: "Трейд-ин",
                link: "/catalog",
            },
        ],
    },
    {
        title: "Поддержка",
        body: [
            {
                name: "Доставка",
                link: "/gaming-pc",
            },
            {
                name: "Оплата",
                link: "/workstation",
            },
            {
                name: "Рассрочка и кредит",
                link: "/gaming-laptop",
            },
            {
                name: "Гарантия",
                link: "/catalog",
            },
            {
                name: "FAQ",
                link: "/gaming-laptop",
            },
        ],
    },
    {
        title: "Услуги",
        body: [
            {
                name: "Модернизация",
                link: "/gaming-pc",
            },
            {
                name: "Техническое обслуживание",
                link: "/workstation",
            },
            {
                name: "Моддинг и кастомизация",
                link: "/gaming-laptop",
            },
            {
                name: "Трейд-ин",
                link: "/catalog",
            },
        ],
    },
    {
        title: "Услуги",
        body: [
            {
                name: "Модернизация",
                link: "/gaming-pc",
            },
            {
                name: "Техническое обслуживание",
                link: "/workstation",
            },
            {
                name: "Моддинг и кастомизация",
                link: "/gaming-laptop",
            },
            {
                name: "Трейд-ин",
                link: "/catalog",
            },
        ],
    },
    {
        title: "Услуги",
        body: [
            {
                name: "Модернизация",
                link: "/gaming-pc",
            },
            {
                name: "Техническое обслуживание",
                link: "/workstation",
            },
            {
                name: "Моддинг и кастомизация",
                link: "/gaming-laptop",
            },
            {
                name: "Трейд-ин",
                link: "/catalog",
            },
        ],
    },
];

const UserFooter = () => {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer-list">
                    {footer_info.map((item, index) => (
                        <li className="footer-list__item" key={index}>
                            <span className="footer-list__item__title">
                                {item.title}
                            </span>
                            <ul className="footer-list__item__body">
                                {item.body.map((item, index) => (
                                    <Link
                                        href={item.link}
                                        className="footer-list__item__body__link"
                                        key={index}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="footer-social">
                    <ul className="footer-social__list">
                        {footer_social.map((item, index) => (
                            <Link
                                key={index}
                                target="_blank"
                                href={item.link}
                                className="footer-social__list__item"
                            >
                                <img
                                    className="footer-social__list__item__img"
                                    alt=""
                                    src={item.img}
                                    loading="lazy"
                                />
                                <span className="footer-social__list__item__name hidden-tablet">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default UserFooter;
