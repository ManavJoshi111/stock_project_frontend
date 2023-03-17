import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import coinMap from "./coingeko_to_binance_map";
import Checkout from "./Checkout";
import Chart from "./Chart";

const CoinPage = props => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log("Params : ", id.toUpperCase());
    console.log("Here : ", coinMap.get(id.toUpperCase()));

    const Symbol = coinMap.get(`${id}`.toUpperCase());
    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-8 md:col-span-9">
                    <Chart Symbol={Symbol} />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <Checkout Symbol={Symbol} />
                </div>
            </div>

        </div >
    );
};

export default CoinPage;
