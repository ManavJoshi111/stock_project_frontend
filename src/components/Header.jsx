import React, { useEffect, useState } from 'react';
import "../styles/index.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch data from coingecko api and store it in state
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => { setData(data); console.log("Data is : ", data) });
    }, []);
    return (
        <>
            <div className="container">
                {/* Make a header with photo  */}
                <div className="header">
                    <div className="header__photo">
                        <center>
                            <img src={"https://i.imgur.com/RYEayFx.png"} alt="photo" style={{ height: 300 }} />
                        </center>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                {/* Make a table with data */}
                <h1 className='display-5 mb-3 text-bold fw-bold'>Cryptocurrency Prices :</h1>
                <table className="table table-bordered border-dark">
                    <thead className='thead table-dark'>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>See Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* display the data*/}
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='w-25'>{item.name}</td>
                                        <td>{item.symbol}</td>
                                        <td><img src={item.image} alt={item.name} style={{ height: 50 }}></img></td>
                                        <td>₹ {item.current_price}</td>
                                        <td className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{item.price_change_percentage_24h}</td>
                                        {/* create a button which navigates the user to the coin page */}
                                        <td><button className="btn btn-primary" onClick={() => { navigate(`/coin/${item.id}`) }}>View</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
    // const [price, setPrice] = useState({});
    // let [cryptoName, setCryptoName] = useState();
    // let timer = 1;
    // const [color, setColor] = useState({});
    // useEffect(() => {
    //     const ws = new WebSocket(`wss://stream.binance.com:9443/ws`);
    //     ws.onopen = () => {
    //         ws.send(JSON.stringify({
    //             method: 'SUBSCRIBE',
    //             params: ["btcusdt@trade", "ethusdt@trade", "bnbusdt@trade", "xrpusdt@trade", "busdusdt@trade", "adausdt@trade", "solusdt@trade", "dogeusdt@trade", "maticusdt@trade", "dotusdt@trade", "stethusdt@trade", "shibusdt@trade"],
    //             id: 1,
    //             interval: "SECONDS",
    //             intervalNum: "5"
    //         }));
    //     }
    //     ws.onmessage = (e) => {
    //         const dataJson = JSON.parse(e.data);
    //         setTimeout(() => {
    //             if (dataJson.s)
    //                 setPrice(
    //                     (prevPrize) => {
    //                         // dataJson.p and prevPrize[dataJson.s] to be compared
    //                         if (dataJson.p > prevPrize[dataJson.s]) {
    //                             setColor({ ...color, [dataJson.s.toLowerCase()]: "green" });
    //                         }
    //                         else if (dataJson.p < prevPrize[dataJson.s]) {
    //                             setColor({ ...color, [dataJson.s.toLowerCase()]: "red" });
    //                         }
    //                         else
    //                             setColor({ ...color, [dataJson.s.toLowerCase()]: "black" });
    //                         return {
    //                             ...prevPrize, [dataJson.s]: parseFloat(dataJson.p).toFixed(5)
    //                         }
    //                     }
    //                 );
    //         }, timer * 500);
    //         timer++;
    //     }
    // }, []);

    // return (
    //     <>
    //         {/* Bootstrap Modal */}
    //         {/* <!-- Modal --> */}
    //         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div class="modal-dialog">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h5 class="modal-title" id="exampleModalLabel">Chart Of {cryptoName}</h5>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { console.log("Clicked"); setCryptoName(undefined); }}></button>
    //                     </div>
    //                     <div class="modal-body" id='chart'>
    //                         {useMemo(() => { return <Chart cryptoName={cryptoName} /> }, [cryptoName])}
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         {/* Modal Ends */}
    //         <center><h1>Real Time Data</h1></center>
    //         <div className="continaer">
    //             <table className="table">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">Sr No.</th>
    //                         <th scope="col">Symbol</th>
    //                         <th scope="col">Price</th>
    //                         <th scope="col">Graph</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {price &&

    //                         Object.keys(price).map((key, index) => {
    //                             return (
    //                                 <>

    //                                     <tr key={index} className="mt-2">
    //                                         <td className='w-25'>{index + 1}</td>
    //                                         <td className='w-25'>{key}</td>
    //                                         <td className={color[key.toLowerCase()] + " w-25"}>{price[key]}</td>
    //                                         <td>
    //                                             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setCryptoName(key.toLowerCase()) }} >
    //                                                 Chart
    //                                             </button>
    //                                         </td>
    //                                         <td style={{ textAlign: "center" }} className="w-25"></td>
    //                                     </tr>
    //                                 </>
    //                             )
    //                         })
    //                     }
    //                 </tbody>
    //             </table>
    //         </div>
    //     </>
    // );
}
export default Header;