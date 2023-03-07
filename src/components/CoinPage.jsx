<<<<<<< HEAD
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Chart from "./Chart";
=======
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import coinMap from "./coingeko_to_binance_map";
import Checkout from "./Checkout";
import Test from "./Test";

const CoinPage = props => {
    // console.log("Props are : ", props.match);
>>>>>>> cc7502dd5b45ebbf6565fa1fd344d4aed2f0564e

    const navigate = useNavigate();
    const { id } = useParams();
    console.log("Here : ", coinMap.get(`${id}`.toUpperCase()));

    const Symbol = coinMap.get(`${id}`.toUpperCase());
    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1>{id}</h1>
<<<<<<< HEAD
            <button onClick={() => { navigate('/') }}>Go Back</button>
            <Chart cryptoName={id} />
=======

            <Container>
                <Row>
                    <Col sm={8}>
                        <Test Symbol={Symbol} />
                    </Col>
                    <Col sm={4}>
                        <Checkout Symbol={Symbol} />
                    </Col>
                </Row>
            </Container>
>>>>>>> cc7502dd5b45ebbf6565fa1fd344d4aed2f0564e
        </div>
    );
};

export default CoinPage;
