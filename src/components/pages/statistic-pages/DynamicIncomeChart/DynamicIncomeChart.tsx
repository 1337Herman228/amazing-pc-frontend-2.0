"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/loading-page/LoadingPage";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/select";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--tm-color-purpur) !important",
    },
} satisfies ChartConfig;

interface ChartData {
    date: string;
    income: number;
}

export function Component() {
    const { getDailySalesIncomeStatistic } = useFetch();

    const [salesIncomeStatistic, setSalesIncomeStatistic] = useState<
        ChartData[] | null
    >(null);

    const fetch = async () => {
        const data = await getDailySalesIncomeStatistic();
        setSalesIncomeStatistic(data);
    };

    const firstRender = async () => {
        await fetch();
    };

    useEffect(() => {
        firstRender();
    }, []);

    const [timeRange, setTimeRange] = useState("365");

    const filteredData = salesIncomeStatistic
        ? salesIncomeStatistic.filter((item) => {
              const date = new Date(item.date);
              const referenceDate = new Date();

              const startDate = new Date(referenceDate);
              startDate.setDate(startDate.getDate() - +timeRange);
              return date >= startDate;
          })
        : [];

    if (!salesIncomeStatistic) return <LoadingPage />;

    return (
        <div className="statistic container section max-w-[600px]">
            <Card className="border-[#313233] ">
                <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle className="text-2xl">
                            Статистика по продажам
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Данные по продажами за конкретные даты
                        </CardDescription>
                    </div>
                    <div className="flex place-items-center w-[250px]">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="rounded-lg sm:ml-auto  border-[#313233] bg-[#191a1b] text-sm outline-[#313233] focus:ring-0 cursor-pointer"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg  border-[#313233] bg-[#191a1b] text-sm ">
                                <SelectItem
                                    value="365"
                                    className="rounded-lg cursor-pointer hover:bg-[#282a2c]"
                                >
                                    Текущий год
                                </SelectItem>
                                <SelectItem
                                    value="90"
                                    className="rounded-lg cursor-pointer  hover:bg-[#282a2c]"
                                >
                                    3 месяца
                                </SelectItem>
                                <SelectItem
                                    value="30"
                                    className="rounded-lg cursor-pointer  hover:bg-[#282a2c]"
                                >
                                    Текущий месяц
                                </SelectItem>
                                <SelectItem
                                    value="7"
                                    className="rounded-lg cursor-pointer  hover:bg-[#282a2c]"
                                >
                                    Текущая неделя
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[330px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={filteredData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                dataKey="income"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("ru-RU", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        valuePostfix=" BYN"
                                        valueName="Продажи"
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value
                                            ).toLocaleDateString("ru-Ru", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            });
                                        }}
                                    />
                                }
                            />
                            <Bar
                                dataKey="income"
                                fill={chartConfig.desktop.color}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
