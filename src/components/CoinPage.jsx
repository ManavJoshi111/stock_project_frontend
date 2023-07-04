import React, { Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import coinMap from "../modules/coingeko_to_binance_map";
import Checkout from "./Checkout";
import Loading from "./Loading";
// import Chart from "./Chart";

const Chart = lazy(() => import('./Chart'));

const CoinPage = () => {

    const { id } = useParams();

    const Symbol = coinMap.get(`${id}`.toUpperCase());
    return (
        <div className="h-screen bg-gray-100" style={{ height: "calc(100vh - 64px)" }}>
            <div className="grid grid-cols-12 gap-4 m-4">
                <div className="col-span-12 md:col-span-9 flex-grow">
                    <Suspense fallback={<Loading />}>
                        <Chart Symbol={Symbol} />
                    </Suspense>
                </div>
                <div className="col-span-12 md:col-span-3 flex-shrink-0 my-4">
                    <Checkout Symbol={Symbol} />
                </div>
            </div>
        </div >
    );
};

export default CoinPage;
