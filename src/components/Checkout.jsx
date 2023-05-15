import React, { useContext, useEffect } from "react";
import { useState } from "react";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";

const Checkout = ({ Symbol }) => {

    const { user, setUser } = useContext(UserContext);

    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const handleChange = e => {
        setQty(e.target.value);
    };


    const handleBuy = async () => {


        if (price <= 0 || qty <= 0) {
            toast.error("Please fill the checkout details correctly !!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
        }

        const data = {
            uid: user.email,
            cryptoId: Symbol,
            price: price,
            quantity: qty
        }

        const response = await fetch(`${process.env.REACT_APP_HOST}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

    }

    useEffect(() => {
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@kline_1s`
        );
        ws.onmessage = e => {
            const dataJson = JSON.parse(e.data);

            let data = {
                date: new Date(dataJson.k.t),
                open: parseFloat(dataJson.k.o),
                high: parseFloat(dataJson.k.h),
                low: parseFloat(dataJson.k.l),
                close: parseFloat(dataJson.k.c),
                volume: parseFloat(dataJson.k.v)
            };

            setPrice(data.open);
        };
    }, []);

    return (
        <>
            {/* <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: "18rem" }}> */}
            {/* <div className="font-bold text-lg">{Symbol}</div>
                <div className="text-gray-700 text-base">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </div>
                <label className="text-gray-700 font-bold" for="quantity">Quantity : </label>
                <input
                    className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    id="quantity"
                    placeholder="Enter quantity"
                    onchange="handleChange"
                    value={qty}
                />
                <label className="text-gray-700 font-bold" for="price">Price : </label>
                <input
                    className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="price"
                    readonly
                    value={price}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                >
                    Sell
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                >
                    Buy
                </button> */}
            <div className="flex flex-col justify-around bg-white rounded-lg shadow-lg p-6 h-full">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-4">{Symbol}</h2>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-gray-600 font-medium">Price:</label>
                        <input type="text" className="text-gray-700 font-medium w-1/2 text-right" value={price} readOnly style={{ outline: "unset" }} />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600 font-medium">Quantity:</label>
                        <input type="number" onChange={handleChange} className="text-gray-700 font-medium w-1/2 text-right border border-gray-400 py-2 px-3 rounded-lg" value={qty} />
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg">Sell</button>
                    <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg mr-2">Buy</button>
                </div>
            </div>

            {/* </div> */}

        </>
    );
};

export default Checkout;
