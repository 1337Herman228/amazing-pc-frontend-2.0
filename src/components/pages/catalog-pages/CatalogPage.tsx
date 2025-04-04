"use client";

import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import { IType } from "@/interfaces/types-v2";
import useFetch from "@/lib/hooks/useFetch";
import Link from "next/link";
import { useEffect, useState } from "react";

const CatalogPage = () => {
    const { getTypes } = useFetch();

    const [types, setTypes] = useState<IType[] | null>(null);

    const fetchTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    if (!types) return <LoadingPage />;

    return (
        <section className=" container section">
            <div className="mt-7 flex flex-col place-items-center justify-center gap-3">
                <h1 className="!text-[42px] ">Комплектующие</h1>
                <div className="text-md text-[#999999] text-center">
                    Выбирайте для своего компьютера только лучшее!
                    <br />
                    Широкий ассортимент высококачественных компонентов для
                    мощных игровых и рабочих систем.
                </div>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 pt-10">
                {types.map((type) => (
                    <li key={type.id} className="p-3">
                        <Link href={`/catalog/${type.value}`}>
                            <div className="flex flex-col justify-center place-items-center p-3 py-6 border-1 border-[#999999] hover:bg-[#9999990a] hover:border-amber-50 transition-all rounded-lg gap-3">
                                <img
                                    src={type.image}
                                    alt={type.label}
                                    width={50}
                                    height={50}
                                    className="invert-50"
                                />
                                <div className="">{type.label}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CatalogPage;
