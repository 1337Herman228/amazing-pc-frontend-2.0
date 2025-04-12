"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Legend, Pie, PieChart, TooltipProps } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/ui/chart";
import useFetch from "@/lib/hooks/useFetch";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

const chartConfig = {
    parts: {
        label: "Комплектующие",
        color: "var(--main-color) !important",
    },
    pc: {
        label: "Официальные сборки",
        color: "var(--main-color) !important",
    },
    configurations: {
        label: "Конфигурации пользователей",
        color: "var(--main-color) !important",
    },
} satisfies ChartConfig;

const colors = [
    "var(--main-color) !important",
    "var(--tm-color-purpur) !important",
    "var(--tm-color-orange-accent) !important",
];

interface ISellingTypes {
    data: {
        type: string;
        percentage: number;
    }[];
    totalSell: number;
}

export function SellingTypesChart() {
    const { getSellingTypes } = useFetch();

    const [sellingTypes, setSellingTypes] =
        React.useState<ISellingTypes | null>(null);

    const fetchBestsellers = async () => {
        const data = await getSellingTypes();
        setSellingTypes(data);
    };

    const firstRender = async () => {
        await fetchBestsellers();
    };

    React.useEffect(() => {
        firstRender();
    }, []);

    if (!sellingTypes) return <LoadingPage />;

    return (
        <div className="statistic container section max-w-[600px]">
            <Card className="flex flex-col border-[#313233] p-3 pb-8.5">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-2xl">
                        Общая сумма от продаж. Доля продаж по типам товаров
                    </CardTitle>
                    <CardDescription>
                        Всего продано товаров на сумму:{" "}
                        <span className="text-amber-400">
                            {sellingTypes.totalSell} BYN
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px] mt-5"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        indicator="color"
                                        valuePostfix={"%"}
                                    />
                                }
                            />
                            <Legend />
                            <Pie
                                data={sellingTypes.data.map((el, i) => ({
                                    type: el.type,
                                    percentage: el.percentage,
                                    fill: colors[i],
                                }))}
                                dataKey="percentage"
                                nameKey="type"
                                innerRadius={45}
                                strokeWidth={0}
                            ></Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
