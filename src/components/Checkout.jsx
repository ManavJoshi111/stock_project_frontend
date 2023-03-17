import React, { useEffect } from "react";
import { useState } from "react";
import { Card as PCard } from 'primereact/card';
import { Button } from "primereact/button";

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
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" />
        </span>
    );

    return (
        <div>
            <PCard title={Symbol} className="md:w-25rem">
                {/* <label htmlFor="quantity">Quantity : </label> */}
                <Button label="Buy" icon="pi pi-arrow-left" />
                &nbsp; &nbsp;
                <Button label="Sell" icon="pi pi-arrow-right" />
            </PCard>
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
