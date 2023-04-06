import React, { useEffect, useContext } from "react";
import { useState } from "react";
import UserContext from "../Context/UserContext";

const Checkout = ({ Symbol, cid }) => {
    console.log(Symbol);
    const { user, setUser } = useContext(UserContext);
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    console.log("Id is : ", user.id);
    console.log("Id is : ", user.name);
    console.log("Id is : ", user.email);
    console.log("cid : ", cid);
    const handleChange = e => {
        console.log("handleChange : ", e.target.name, " ", e.target.value);
        setQty(e.target.value);
    };

    const buyStock = async () => {
        const res = await fetch(`${process.env.REACT_APP_HOST}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: user.id,
                cryptoId: cid,
                price: price,
                quantity: qty
            })
        });
        const response = await res.json();
        console.log("Response is : ", response);
    }

    const sellStock = async () => {
        const res = await fetch(`${process.env.REACT_APP_HOST}/sell`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: user.id,
                cryptoId: cid,
                price: price,
                quantity: qty
            })
        });
        const response = await res.json();
        console.log("Response is : ", response);
    }
    useEffect(() => {
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@kline_1m`
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

            // console.log(new Date().getSeconds())
        };
    }, []);

    const footer = (
        <span>
            {/* <Button label="Save" icon="pi pi-check" /> */}
            {/* <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" /> */}
        </span>
    );

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: "18rem" }}>
                <div className="font-bold text-lg">{Symbol}</div>
                <div className="text-gray-700 text-base">
                    Buy and Sell your favourite stock from here
                </div>
                <label className="text-gray-700 font-bold" for="quantity">Quantity : </label>
                <input
                    className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    id="quantity"
                    placeholder="Enter quantity"
                    onChange={handleChange}
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
                    onClick={sellStock}
                >
                    Sell
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={buyStock}
                >
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Checkout;
