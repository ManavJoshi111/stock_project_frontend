import { ExpansionPanelDetails } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [tradeInfo, setTradeInfo] = useState(undefined);

    const fetchData = async () => {
        try {

            const response = await fetch(`${process.env.REACT_APP_HOST}/tradeInfo/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (!response.ok) {
                // Handle error if response status is not in the 2xx range
                throw new Error("Failed to fetch trades");
            }

            const tradeInfo = await response.json();
            // Process the fetched trades data
            console.log("Tradeinfo is : ", tradeInfo);
            setTradeInfo(tradeInfo);

        } catch (error) {
            // Handle any errors that occur during the request or parsing of response
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();

    }, [])

    if (!tradeInfo) {
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className='m-4 mt-8'>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
                        Back
                    </button>
                    <div></div> {/* Empty div for spacing */}
                </div>

                {/* main content */}
                <div className="flex justify-center">
                    <div className="w-full md:w-2/3">
                        <div className="bg-white rounded shadow-md p-4">
                            <div className="font-bold text-2xl mb-2">Order Details:</div>
                            <div className="mb-2">Crypto Name: {tradeInfo[0].cryptoSymbol}</div>
                            <div className="mb-2">Price: {tradeInfo[0].price}</div>
                            <div className="mb-2">Quantity: {tradeInfo[0].quantity}</div>
                            <div className="mb-2">Date: {new Date(tradeInfo[0].date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetails
