import React, { useEffect } from "react";
import { useState } from "react";

const Checkout = ({ Symbol }) => {
    console.log(Symbol);

    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const handleChange = e => {
        setQty(e.target.value);
    };

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
                </button>
            </div>

            {/* <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>
                        {Symbol}
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <label htmlFor="quantity">Quantity : </label>
                    <input
                        type="number"
                        id="quantity"
                        placeholder="Enter quantity"
                        onChange={handleChange}
                        value={qty}
                    />
                    <label htmlFor="quantity">Price : </label>
                    <input type="text" id="price" readOnly value={price} />
                    <Button variant="primary">Sell</Button>
                    <Button variant="primary">Buy</Button>
                </Card.Body>
            </Card> */}
        </div>
    );
};

export default Checkout;
