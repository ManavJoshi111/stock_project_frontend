import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import coinMap from "../modules/coingeko_to_binance_map";
import Checkout from "./Checkout";
import Chart from "./Chart";

const CoinPage = props => {

    const navigate = useNavigate();
    const { id } = useParams();

    const Symbol = coinMap.get(`${id}`.toUpperCase());
    return (
        <div className="grid grid-cols-12 gap-4 m-4">
            <div className="col-span-12 md:col-span-9 flex-grow">
                <Chart Symbol={Symbol} />
            </div>
            <div className="col-span-12 md:col-span-3 flex-shrink-0">
                <Checkout Symbol={Symbol} />
            </div>
        </div>

    );
};

export default CoinPage;
