import React from 'react'
import "../styles/Style.css";
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const { item } = props;
    const navigate = useNavigate();
    return (
        <>
            <div className="card w-80 border border-black p-2" onClick={() => { navigate(`/coin/${item.symbol}`) }}>
                <div className="card-body">
                    <div className="flex justify-start items-center mb-2">
                        <img src={item.image} alt={item.name} className="h-12" />
                        <div className="details ml-2">
                            <h5 className="card-title">{item.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item.symbol}</h6>
                        </div>
                    </div>

                    <p className="text-lg font-medium">{'INR ' + item.current_price.toLocaleString("en-US")}</p>
                    <p className={"text-lg " + (item.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600")}>
                        {item.price_change_percentage_24h} %</p>
                </div>
            </div>
        </>
    )
}

export default Card
