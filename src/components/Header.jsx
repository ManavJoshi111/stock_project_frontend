import React, { useEffect, useState } from 'react';
import "../styles/index.css";

import Chart from './Chart';
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
            ws.send(JSON.stringify({
                method: 'SUBSCRIBE',
                params: ["btcusdt@trade", "ethusdt@trade", "bnbusdt@trade", "xrpusdt@trade", "busdusdt@trade", "adausdt@trade", "solusdt@trade", "dogeusdt@trade", "maticusdt@trade", "dotusdt@trade", "stethusdt@trade", "shibusdt@trade"],
                id: 1,
                interval: "SECONDS",
                intervalNum: "5"
            }));
        }
        setTimeout(() => {
            ws.onmessage = (e) => {
                const dataJson = JSON.parse(e.data);
                if (dataJson.s)
                    setPrice(
                        (prevPrize) => {
                            // dataJson.p and prevPrize[dataJson.s] to be compared
                            if (dataJson.p > prevPrize[dataJson.s]) {
                                setColor({ ...color, [dataJson.s.toLowerCase()]: "green" });
                            }
                            else if (dataJson.p < prevPrize[dataJson.s]) {
                                setColor({ ...color, [dataJson.s.toLowerCase()]: "red" });
                            }
                            return {
                                ...prevPrize, [dataJson.s]: parseFloat(dataJson.p).toFixed(5)
                            }
                        }
                    );
            }
        }, 2000);
    }, []);

    return (
        <>
            <center><h1>Real Time Data</h1></center>
            <div className="continaer">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Price</th>
                            <th scope="col">Graph</th>
                        </tr>
                    </thead>
                    <tbody>
                        {price &&

                            Object.keys(price).map((key, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td className='w-25'>{index + 1}</td>
                                            <td className='w-25'>{key}</td>
                                            <td className={color[key.toLowerCase()] + " w-25"}>{price[key]}</td>
                                            <Chart rs={price[key]} title={key} />
                                            <td style={{ textAlign: "center" }} className="w-25"></td>
                                        </tr>
                                    </>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Header;