import React, { useEffect, useState } from 'react'

const Header = () => {
    const [price, setPrice] = useState();
    const getPrice = (symbol) => {
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
            // console.log(dataJson);
            let _price = dataJson.p;
            let symbol = dataJson.s;
            let something = { [symbol]: _price };
            console.log("Something  : ", something);
            setPrice({ ...price, [dataJson.p]: dataJson.s });
            // setPrice({ ...price, [symbol]: _price });

            console.log("Price : ", ...price);
        }
    }
    useEffect(() => {
        getPrice(crypto);
    }, []);

    return (
        <>
            <h1>Header</h1>
            {price &&
                Object.keys(price).map((key, index) => {
                    return (
                        <div key={index}>
                            <span>{key}</span>
                            <span>{price[key]}</span>
                        </div>
                    )
                }
                )
            }
        </>
    );
}
export default Header;