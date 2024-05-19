'use client'
import { LayoutDashboardIcon, User, UserRoundCheck } from "lucide-react";
import CardBox from "../CardBox";
import LineChart from "./AreaChartPlot";
import AreaUsersList from "./areaUsersList";
import CardBoxWidget from "../Widget";
import { mdiAccountMultiple, mdiCartOutline, mdiChartTimelineVariant } from "@mdi/js";
const CardsAnalytics = ({clientsCount}) => {
    return (
        <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={clientsCount || 0}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={7770}
            numberPrefix="$"
            label="Sales"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="warning"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={256}
            numberSuffix="%"
            label="Performance"
          />
        </div>
            {/* <section>
                <div className="flex m-4 gap-2">
                    <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow
rounded h-300px">
                        <div className="">
                            <p className="text-white font-bold">Total returns</p>
                            <p className="py-4 font-bold text-yellow-500">50,000 TND</p>
                            <p className="text-green-300">+24.5%</p>
                        </div>
                    </div>
                    <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow
rounded max-h-300px">
                        <div className="">
                            <p className="text-white font-bold">Total sales</p>
                            <p className="py-4 font-bold text-yellow-500">30,000 TND</p>
                            <p className="text-green-300">+34.5%</p>
                        </div>
                    </div>
                    <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow
rounded max-h-300px">
                        <div className="">
                            <p className="text-white font-bold">Total subscriptions</p>
                            <p className="py-4 font-bold text-yellow-500">20,000 TND</p>
                            <p className="text-green-300">+24.5%</p>
                        </div>
                    </div>

                    <div className="flex-1 px-2 justify-center w-16 bg-gray-700 shadow
rounded h-300px">
                        <div className="">
                            <p className="text-white font-bold">Total orders</p>
                            <p className="py-4 font-bold text-yellow-500">60,000 TND</p>
                            <p className="text-red-300">-14.5%</p>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="flex m-4 gap-2">
                <div className="w-full bg-gray-700 rounded">
                    <div className="flex items-center bg-gray-50 dark:bg-slate-800 dark:text-slate-100 justify-start">
                        <span className="inline-flex justify-center items-center w-6 h-6 mr-2">
                            <LayoutDashboardIcon />
                        </span>
                        <h1 className="leading-tight text-2xl">Trends overview</h1>
                    </div>

                    <LineChart className="w-full aspect-[2/1]" />
                </div>
            </section>
            <section className="flex m-4 gap-2">
                <CardBox className="w-full" hasTable>
            <div className="flex items-center bg-gray-50 dark:bg-slate-800 dark:text-slate-100 justify-start">
                        <span className="inline-flex justify-center items-center w-6 h-6 mr-2">
                            <User />
                        </span>
                        <h1 className="leading-tight text-2xl">Admins</h1>
                    </div>
                    <AreaUsersList role="admin" />
                </CardBox>
            </section>
        </>
    );
};
export default CardsAnalytics;