import React, { useEffect, useState } from 'react';
import "../styles/index.css";
const Header = () => {
    const [price, setPrice] = useState({});
    const [color, setColor] = useState({
        shibusdt: "black",
        adxbtc: "black",
        bnbusd: "black",
        aptbusd: "black",
        ethbusd: "black",
        ethbtc: "black",
        dfbusd: "black"
    });
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
                setPrice(
                    (prevPrize) => {
                        console.log("Prevprize is : ", prevPrize);
                        // dataJson.p and prevPrize[dataJson.s] to be compared
                        if (dataJson.p > prevPrize[dataJson.s]) {
                            setColor({ ...color, [dataJson.s.toLowerCase()]: "green" });
                        }
                        else if (dataJson.p < prevPrize[dataJson.s]) {
                            setColor({ ...color, [dataJson.s.toLowerCase()]: "red" });
                        }
                        // else {
                        //     setColor({ ...color, [dataJson.s.toLowerCase()]: "black" });
                        // }
                        return { ...prevPrize, [dataJson.s]: dataJson.p }
                    }
                );
        }
    }, []);

    return (
        <>
            <center><h1>Real Time Data</h1></center>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {price &&

                        Object.keys(price).map((key, index) => {
                            console.log("Color is : ", color);
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td className={color[key.toLowerCase()]}>{price[key]}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
}
export default Header;