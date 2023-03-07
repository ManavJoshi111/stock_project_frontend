import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Chart from "./Chart";

const CoinPage = (props) => {
    console.log("Props are : ", props.match);
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div>
            <h1>{id}</h1>
            <button onClick={() => { navigate('/') }}>Go Back</button>
            <Chart cryptoName={id} />
        </div>
    )
}


export default CoinPage;