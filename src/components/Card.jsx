import React from 'react'
import "../styles/Style.css";
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const { item } = props;
    console.log("Item : ", item.price_change_percentage_24h);
    const navigate = useNavigate();
    return (
        <>
            <div class="card w-80 border border-black p-2" onClick={() => { navigate(`/coin/${item.symbol}`) }}>
                <div class="card-body">
                    <div class="flex justify-start items-center mb-2">
                        <img src={item.image} alt={item.name} class="h-12" />
                        <div class="details ml-2">
                            <h5 class="card-title">{item.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{item.symbol}</h6>
                        </div>
                    </div>

                    <p class="text-lg font-medium">{'$ ' + item.current_price.toLocaleString("en-US")}</p>
                    <p class={"text-lg " + (item.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600")}>
                        {item.price_change_percentage_24h} %</p>
                </div>
            </div>
        </>
    )
}

export default Card
