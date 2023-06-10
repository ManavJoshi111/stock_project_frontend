import { useState, useEffect, useMemo, } from 'react';

const LivePrice = () => {
    const [price, setPrice] = useState({});
    let [cryptoName, setCryptoName] = useState();
    let timer = 1;
    const [color, setColor] = useState({});
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
        ws.onmessage = (e) => {
            const dataJson = JSON.parse(e.data);
            setTimeout(() => {
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
                            else
                                setColor({ ...color, [dataJson.s.toLowerCase()]: "black" });
                            return {
                                ...prevPrize, [dataJson.s]: parseFloat(dataJson.p).toFixed(5)
                            }
                        }
                    );
            }, timer * 500);
            timer++;
        }
    }, []);

    return (
        <>
            {/* Bootstrap Modal */}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chart Of {cryptoName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { console.log("Clicked"); setCryptoName(undefined); }}></button>
                        </div>
                        <div className="modal-body" id='chart'>
                            {/* {useMemo(() => { return <Chart cryptoName={cryptoName} /> }, [cryptoName])} */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ends */}
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

                                        <tr key={index} className="mt-2">
                                            <td className='w-25'>{index + 1}</td>
                                            <td className='w-25'>{key}</td>
                                            <td className={color[key.toLowerCase()] + " w-25"}>{price[key]}</td>
                                            <td className="w-25">
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setCryptoName(key.toLowerCase()) }} >
                                                    Chart
                                                </button>
                                            </td>
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

export default LivePrice;