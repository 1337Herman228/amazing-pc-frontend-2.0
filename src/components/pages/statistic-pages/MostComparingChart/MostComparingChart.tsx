"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/ui/chart";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";

const chartConfig = {
    product: {
        color: "var(--main-color)",
    },
} satisfies ChartConfig;

const MostComparingChart = () => {
    const { getMostComparing } = useFetch();

    const [mostComparing, setMostComparing] = useState(null);

    const fetchmostComparing = async () => {
        const data = await getMostComparing();
        setMostComparing(data);
    };

    const firstRender = async () => {
        await fetchmostComparing();
    };

    useEffect(() => {
        firstRender();
    }, []);

    if (!mostComparing) return <LoadingPage />;

    return (
        <div className="statistic container section max-w-[600px]">
            <Card className="border-[#313233] p-3">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Наиболее сравниваемые товары (Топ-8)
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Товары, которые чаще всего добавляют в сравнение
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={mostComparing}
                            margin={{
                                top: 40,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                allowDecimals={false}
                                dataKey="quantity"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <XAxis
                                dataKey="product"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={5}
                                tickFormatter={(value: string) =>
                                    value.slice(0, 12)
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<CustomTooltip />}
                            />
                            <Bar
                                dataKey="quantity"
                                fill={`${chartConfig?.product?.color} !important`}
                                radius={6}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={(value: number) =>
                                        value + " шт."
                                    }
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 !text-sm mt-3">
                    <div className="flex gap-2 leading-none !text-sm">
                        От наиболее сравниваемых{" "}
                        <TrendingUp className="h-4 w-4 !text-sm" />
                    </div>
                    <div className="leading-none flex gap-2 !text-sm">
                        К менее сравниваемым
                        <TrendingDown className="h-4 w-4 !text-sm" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className="rounded-lg border border-[#313233] bg-[#191a1b] p-4 shadow-md backdrop-blur-md">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
                {label}
            </p>
            <ul className="space-y-1">
                {payload.map((entry, index) => (
                    <li
                        key={`item-${index}`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span
                            className="inline-block h-3.5 w-3.5 rounded-[2.5px]"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-foreground">
                            Находятся в сравнении:
                        </span>
                        <span className="ml-auto font-medium text-foreground">
                            {entry.value} шт
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostComparingChart;
