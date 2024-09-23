import Link from "next/link";
import { useState } from "react";

const list_info = [
    {
        title: "Апгрейд-центр",
        description:
            "Место, где мы преображаем Ваши ПК как изнутри, так и снаружи. Здесь наши специалисты с многолетним опытом подарят новую жизнь вашему верному стальному другу.",
        link_to: "/assistance/tech-support",
        services_list: [
            {
                list_item_name: "Обновить видеокарту",
                list_item_svg_link: "/services-list-svg/1.svg",
            },
            {
                list_item_name: "Увеличить объём ОЗУ",
                list_item_svg_link: "/services-list-svg/2.svg",
            },
            {
                list_item_name: "Подобрать новый процессор",
                list_item_svg_link: "/services-list-svg/3.svg",
            },
            {
                list_item_name: "Улучшить систему охлаждения",
                list_item_svg_link: "/services-list-svg/4.svg",
            },
        ],
    },
    {
        title: "Техническое обслуживание",
        description:
            "Здоровый компьютер – залог успеха в играх, работе и творчестве. Наши профессионалы позаботятся о вашем ПК, проведя все необходимые процедуры.",
        link_to: "/assistance/tech-support",
        services_list: [
            {
                list_item_name: "Проведём профессиональную чистку системы",
                list_item_svg_link: "/services-list-svg/5.svg",
            },
            {
                list_item_name: "Обслужить кастомное водяное охлаждение",
                list_item_svg_link: "/services-list-svg/6.svg",
            },
            {
                list_item_name: "Заменить термоинтерфейс",
                list_item_svg_link: "/services-list-svg/7.svg",
            },
            {
                list_item_name: "Оптимизировать ОС",
                list_item_svg_link: "/services-list-svg/8.svg",
            },
        ],
    },
    {
        title: "Сервис-центр",
        description:
            "Опытные сотрудники проведут полную диагностику ПК и устранят проблему, чтобы вы могли без лишних забот наслаждаться стабильной работой вашего компьютера.",
        link_to: "/assistance/tech-support",
        services_list: [
            {
                list_item_name: "Проведем полную диагностику",
                list_item_svg_link: "/services-list-svg/9.svg",
            },
            {
                list_item_name: "Заменим неисправные комплектующие",
                list_item_svg_link: "/services-list-svg/10.svg",
            },
        ],
    },
    {
        title: "Моддинг",
        description:
            "Реализуем все ваши самые интересные задумки по дизайну ПК. Наши мастера создадут уникальный внешний вид вашего компьютера, учитывая все ваши пожелания.",
        link_to: "/assistance/tech-support",
        services_list: [
            {
                list_item_name: "Нанести винил по вашему эскизу",
                list_item_svg_link: "/services-list-svg/11.svg",
            },
            {
                list_item_name: "Сделать профессиональную аэрографию",
                list_item_svg_link: "/services-list-svg/12.svg",
            },
            {
                list_item_name: "Использовать автомобильную покраску",
                list_item_svg_link: "/services-list-svg/13.svg",
            },
            {
                list_item_name: "Установить кастомное водяное охлаждение",
                list_item_svg_link: "/services-list-svg/14.svg",
            },
        ],
    },
];

const ServicesSection = () => {
    const [servListObj, setServListObj] = useState(list_info[0]);

    const accordeonClickFunction = (item: any) => {
        const list = document.querySelectorAll(
            ".services__list__item__accordeon"
        );
        for (var i = 0; i < list.length; i++) {
            list[i].removeAttribute("open");
        }
        setServListObj(item);
    };

    return (
        <div className="services-section__body">
            <div className="services">
                <ul className="services__list">
                    {list_info.map((item, i) => (
                        <li key={i} className="services__list__item">
                            <details
                                className="services__list__item__accordeon"
                                onClick={() => accordeonClickFunction(item)}
                            >
                                <summary className="services__list__item__accordeon__summary">
                                    <h3 className="services__list__item__accordeon__summary__title">
                                        {item.title}
                                    </h3>
                                    <svg
                                        className="services__list__item__accordeon__summary__indicator"
                                        width="34"
                                        height="34"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                                            fill="#c0ff01"
                                        />
                                    </svg>
                                </summary>
                                <div className="services__list__item__accordeon__body">
                                    <p>{item.description}</p>
                                </div>
                            </details>
                            <div className="services-what-we-can-do visible-tablet">
                                <div className="services-what-we-can-do__body">
                                    <div className="services-what-we-can-do__body__title">
                                        Что можно сделать
                                    </div>
                                    <ul className="services-what-we-can-do__body__list">
                                        {servListObj.services_list.map(
                                            (item, i) => (
                                                <li
                                                    key={i}
                                                    className="services-what-we-can-do__body__list__item"
                                                >
                                                    <img
                                                        className="services-what-we-can-do__body__list__item__svg"
                                                        width={50}
                                                        height={50}
                                                        src={
                                                            item.list_item_svg_link
                                                        }
                                                        alt=""
                                                    />
                                                    <div className="services-what-we-can-do__body__list__item__description">
                                                        {item.list_item_name}
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <Link
                                        className="services-what-we-can-do__body__link button-transparent-white"
                                        href={servListObj.link_to}
                                    >
                                        Узнать все про {servListObj.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="services-what-we-can-do hidden-tablet">
                <div className="services-what-we-can-do__body">
                    <div className="services-what-we-can-do__body__title">
                        Что можно сделать
                    </div>
                    <ul className="services-what-we-can-do__body__list">
                        {servListObj.services_list.map((item, i) => (
                            <li
                                key={i}
                                className="services-what-we-can-do__body__list__item"
                            >
                                <img
                                    className="services-what-we-can-do__body__list__item__svg"
                                    width={70}
                                    height={70}
                                    src={item.list_item_svg_link}
                                    alt=""
                                />
                                <div className="services-what-we-can-do__body__list__item__description">
                                    {item.list_item_name}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link
                        className="services-what-we-can-do__body__link button-transparent-white"
                        href={servListObj.link_to}
                    >
                        Узнать все про {servListObj.title}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
