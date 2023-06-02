import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [tradeInfo, setTradeInfo] = useState({});

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
            console.log(tradeInfo);
            setTradeInfo(tradeInfo);

        } catch (error) {
            // Handle any errors that occur during the request or parsing of response
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();

    }, [])

    return (

        <div className='m-4 mt-8'>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
                    Back
                </button>
                <div></div> {/* Empty div for spacing */}
            </div>

            {/* main content */}
            <div className="flex flex-col md:flex-row">

                {/* order details card */}

                <div className="md:w-2/3 mr-4">
                    <div className="bg-white rounded shadow-md p-4">
                        <div className="font-bold text-lg mb-2">Order Type and Quantity</div>
                        {/* Replace these with actual order details */}
                        <div className="mb-2">Limit order - Buy - BTC/USD - 1.0</div>
                        <div className="font-bold text-lg mb-2">Other Details</div>
                        {/* Replace these with actual order details */}
                        <div className="mb-2">Price: $50,000.00</div>
                        <div className="mb-2">Total: $50,000.00</div>
                        <div className="mb-2">Date: May 9, 2023</div>
                    </div>
                </div>

                {/* order status card */}

                {/* <div className="md:w-1/3 mx-4">
                    <div className="flex flex-col">
                        <div>
                            <h2 className='text-3xl'>Order status</h2>
                        </div>
                        <div className='ml-4 mt-4'>
                            <div className='flex'>
                                <div className="h-6 w-6 flex flex-col items-center justify-center rounded-full bg-green-500 mb-2">
                                    <p className="text-white text-xs"></p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                    <p>.</p>
                                </div>
                                <div className="flex flex-col justify-between mb-1 ml-2 -mt-1">
                                    <h1 className='text-xl'>Request status</h1>
                                    <div>
                                        <span className='text-sm'>Order ID:</span>
                                        <span className="font-bold">123456</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-400 mb-2">
                                    <span className="text-white text-xs"></span>
                                </div>
                                <div className="flex flex-col justify-between mb-1 ml-2 -mt-1">
                                    <span className="font-bold text-xl">Order executed</span>
                                    <span>time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="md:w-1/3 mx-4">
                    <div className="flex flex-col">
                        <div>
                            <h2 className='text-3xl'>Order status</h2>
                        </div>
                        <div className='ml-4 mt-4'>
                            <div className='flex '>
                                <div className="h-6 w-6 flex flex-col items-center justify-center rounded-full bg-green-500 mr-2">
                                    <p className="text-white text-xs"></p>
                                </div>
                                <div className="flex flex-col justify-between mb-1 ml-2 -mt-1">
                                    <h1 className='text-xl'>Request status</h1>
                                    <h2 className='text-sm'>time</h2>
                                    <div>
                                        <span className='text-sm'>Order ID:</span>
                                        <span className="font-bold">123456</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                                <div className="h-px bg-black-800 flex-1 dot">.</div>
                            </div>
                            <div className='flex mt-4'>
                                <div className="h-6 w-6 flex flex-col items-center justify-center rounded-full bg-green-500 mr-2">
                                    <p className="text-white text-xs"></p>
                                </div>
                                <div className="flex flex-col justify-between mb-1 ml-2 -mt-1">
                                    <span className=" text-xl">Order executed</span>
                                    <span>time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div >
        </div>
    )
}

export default OrderDetails
