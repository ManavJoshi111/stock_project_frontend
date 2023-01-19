import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CoinPage = (props) => {
    console.log("Props are : ", props.match);
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div>
            <h1>{id}</h1>
            <button onClick={() => { navigate('/') }}>Go Back</button>
        </div>
    )
}


export default CoinPage;