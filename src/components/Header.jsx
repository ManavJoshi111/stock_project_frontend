import React, { useEffect, useState } from 'react'

const Header = () => {
    const [price, setPrice] = useState({});
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws`);
        ws.onopen = () => {
            console.log("Connection Successfull");
            ws.send(JSON.stringify({
                method: 'SUBSCRIBE',
                params: ["shibusdt@trade", "ethbtc@trade", "adxbtc@trade", "bnbbusd@trade", "aptbusd@trade", "ethbusd@trade", "dfbusd@trade"],
                id: 1,
            }));
        }
        ws.onmessage = (e) => {
            const dataJson = JSON.parse(e.data);
            if (dataJson.s)
                setPrice((prevPrize) => { console.log(prevPrize); return { ...prevPrize, [dataJson.s]: dataJson.p } });
        }
    }, []);

    return (
        <>
            <h1>Header</h1>
            {price &&
                Object.keys(price).map((key, index) => {
                    console.log("Price : ", price)
                    return (
                        <>
                            <div key={index}>
                                <span>{key}</span>
                                <span>{price[key]}</span>
                            </div>
                        </>
                    )
                }
                )
            }
        </>
    );
}
export default Header;