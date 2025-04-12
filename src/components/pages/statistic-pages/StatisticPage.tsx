import React from "react";
import BestsellersChart from "./BestsellersChart/BestsellersChart";
import MostComparingChart from "./MostComparingChart/MostComparingChart";
import { SellingTypesChart } from "./SellingTypesChart/SellingTypesChart";
import { Component } from "./DynamicIncomeChart/DynamicIncomeChart";

const StatisticPage = () => {
    return (
        <div className="container section pt-100 pb-20">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-[100px]">
                <BestsellersChart />
                <MostComparingChart />
                <SellingTypesChart />
                <Component />
            </div>
        </div>
    );
};

export default StatisticPage;
