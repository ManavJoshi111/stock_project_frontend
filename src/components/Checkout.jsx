import React, { useContext, useEffect } from "react";
import { useState } from "react";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = ({ Symbol }) => {

    const { user, setUser } = useContext(UserContext);

    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const [holdingQty, setHoldingQty] = useState(0);


    const navigate = useNavigate();


    const handleChange = e => {
        setQty(e.target.value);
    };


    const handleBuy = async () => {

        if (!user || !user.email) {
            navigate("/login")
            return
        }

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

        const res = await fetch(`${process.env.REACT_APP_HOST}/buy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const resData = await res.json();

        if (!res.ok) {
            toast.error("There was a error while placing the order please try again later !!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            return
        }

        console.log(resData.tradeInfo);



        toast.success("Order placed successfully !!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
        });
        navigate(`/order/${resData.tradeInfo._id}`);

    }

    const handleSell = async () => {


        if (!user || !user.email) {
            navigate("/login")
            return
        }

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

        if (qty > holdingQty) {
            toast.error("Not enough holdings..", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            return
        }

        const data = {
            uid: user.email,
            cryptoId: Symbol,
            price: price,
            quantity: qty
        }

        const res = await fetch(`${process.env.REACT_APP_HOST}/sell`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const resData = await res.json();

        if (!res.ok) {
            toast.error("There was a error while placing the order please try again later !!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
            });
            return
        }

        console.log(resData.tradeInfo);
        toast.success("Order placed successfully !!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
        });
        navigate(`/order/${resData.tradeInfo._id}`);

    }

    const fetchQty = async () => {
        try {

            const response = await fetch(`${process.env.REACT_APP_HOST}/qty/${Symbol}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to fetch trades");
            }

            const holdingQty = await response.json();
            setHoldingQty(holdingQty.holdingQty);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {


        fetchQty();

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
            <div className="flex flex-col justify-between  bg-white rounded-lg shadow-lg p-6 h-full">
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
                    <div className="flex justify-between  mt-4">
                        <label htmlFor="">Holding Quantity : </label>
                        <p>{holdingQty}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button onClick={handleSell} className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg">Sell</button>
                    <button onClick={handleBuy} className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg mr-2">Buy</button>
                </div>
            </div>

        </>
    );
};

export default Checkout;
