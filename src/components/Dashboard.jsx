import React, { useEffect, useState, useContext } from 'react';
import { useRef } from 'react';
import { IgrDoughnutChart } from 'igniteui-react-charts';
import { IgrDoughnutChartModule } from 'igniteui-react-charts';
import { IgrRingSeriesModule } from 'igniteui-react-charts';
import { IgrRingSeries } from 'igniteui-react-charts';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UserContext from '../Context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import cryptoImg from '../assets/crypto.jpg';
import GoToTopButton from './GoToTopButton';
import getPageTitle from '../modules/getPageTitle';

IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();

const Dashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [trades, setTrades] = useState({});
    const [buyChecked, setBuyChecked] = useState(false);
    const [sellChecked, setSellChecked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const qtyChartRef = useRef(0);
    const invChartRef = useRef(0);
    // console.log("user in dashboard", user)

    const handleCheckbox = (e) => {
        if (e.target.name === "buyCheckbox") {
            setBuyChecked(!buyChecked);
        }
        else {
            setSellChecked(!sellChecked);
        }

    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/all-trades?buyChecked=${buyChecked}&&sellChecked=${sellChecked}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (!response.ok) {

                if (response.status === 401) {
                    toast.error("You are not loggedIn", {
                        position: "top-center",
                        autoClose: 1000,
                        closeOnClick: true,
                        draggable: true,
                        theme: "dark"
                    });
                    navigate("/login");
                    return;
                }
            }

            const trades = await response.json();
            // console.log(trades);
            setTrades(trades);
            setLoading(false)

        } catch (error) {
            console.error(error);
        }
    };

    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/isLoggedIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const content = await response.json();
            if (content.success === "true") {
                setUser(() => { return { id: content.user._id, name: content.user.name, email: content.user.email, contact: content.user.contact, budget: content.user.budget } });
                // console.log("User is : ", user);
            } else {
                setUser({});
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                draggable: true,
                theme: "dark"
            });
            navigate("../login");
        }
    }

    useEffect(() => {
        getUserData();
        fetchData();
    }, []);

    useEffect(() => {
        document.title = getPageTitle(location.pathname);
        fetchData();
    }, [buyChecked, sellChecked]);

    return (
        loading ? (
            <div className="h-screen flex flex-col md:flex-row bg-gray-100" style={{ height: "calc(100vh - 64px)" }}>
                <div className="w-full md:w-1/4 bg-white p-4 md:m-4 flex flex-col items-center ">
                    {/* <Skeleton circle={true} height={200} width={200} /> */}
                    <div className='flex flex-col bg-black-800 w-40 p-2 m-4 text-2xl'>
                        <Skeleton />
                    </div>
                    <div className='flex flex-col bg-black-800 w-full p-2 m-4'>
                        <Skeleton count={5} />
                    </div>
                </div>

                <div className='w-full md:w-3/4 bg-gray-100 p-2 mt-2 flex-shrink-0 md:flex-grow md:-ml-8'>
                    <Skeleton height={100} />

                    {/* <div className='mt-4 flex flex-col md:flex-row'>
                        <div className='flex-1 md:pr-2 my-2 flex items-center justify-center'>
                            <Skeleton circle={true} height={250} width={250} />
                        </div>
                        <div className='flex-1 md:pl-2 my-2 flex flex-col md:flex-row  items-center justify-center'>
                            <Skeleton circle={true} height={250} width={250} />
                        </div>
                    </div> */}
                    <div className="flex flex-wrap justify-center mt-4">
                        <div className="w-full p-3">
                            <div className="bg-white rounded-lg shadow-lg p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-1 text-left">
                                        <h2 className="font-bold uppercase text-gray-500 text-xl">Orders</h2>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Skeleton count={5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        ) : (
            trades.length <= 0 ?
                <>
                    <div className="w-full bg-white p-4 flex-shrink-0 md:h-auto rounded-lg shadow-lg ">
                        <div className="flex flex-col items-center justify-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{user.name ? user.name : "userName"}</h2>
                            <h3 className='text-xl font-bold text-gray-600'> {user.email ? user.email : "Email ID"}</h3>
                        </div>
                        <div className="mt-8 mr-4">
                            <h5 className="font-bold uppercase text-gray-500 mb-2">Filters</h5>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center mt-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={buyChecked} name="buyCheckbox" onChange={handleCheckbox} value={buyChecked} />
                                    <span className="ml-2 text-gray-700">Buy Orders</span>
                                </label>
                                <label className="inline-flex items-center mt-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={sellChecked} name="sellChackbox" onChange={handleCheckbox} value={sellChecked} />
                                    <span className="ml-2 text-gray-700">Sell Orders</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="h-screen flex flex-col md:flex-row items-center justify-center text-center" style={{ height: "calc(100vh - 64px)" }}>
                        <div className='m-4'>
                            <img src={cryptoImg} alt="crypto img" className='max-w-full max-h-80 rounded-md' />
                        </div>
                        <div className='mx-4'>
                            <h2 className="text-gray-800 font-bold text-4xl my-4">Not enough data to display</h2>
                        </div>
                    </div>
                </>
                :
                <div className="bg-gray-100 flex flex-wrap">
                    <GoToTopButton />

                    {/* Sidebar */}
                    <div className="w-full md:w-1/4 bg-white p-4 md:m-4 flex-shrink-0 md:h-auto rounded-lg shadow-lg ">
                        <div className="flex flex-col items-center justify-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{user.name ? user.name : "userName"}</h2>
                            <h3 className='text-xl font-bold text-gray-600'> {user.email ? user.email : "Email ID"}</h3>
                        </div>
                        <div className="mt-8 mr-4">
                            <h5 className="font-bold uppercase text-gray-500 mb-2">Filters</h5>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center mt-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={buyChecked} name="buyCheckbox" onChange={handleCheckbox} value={buyChecked} />
                                    <span className="ml-2 text-gray-700">Buy Orders</span>
                                </label>
                                <label className="inline-flex items-center mt-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked={sellChecked} name="sellChackbox" onChange={handleCheckbox} value={sellChecked} />
                                    <span className="ml-2 text-gray-700">Sell Orders</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* main-content */}

                    <div className='w-full md:w-3/4 bg-gray-100 p-2 flex-shrink-0 md:flex-grow md:-ml-8'>
                        <div className="w-full p-2">
                            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-row justify-around items-center">
                                <div className="flex-1 text-center px-4">
                                    <h5 className="font-bold uppercase text-gray-500">Budget</h5>
                                    <h3 className="font-bold">{(user.budget).toFixed(2)}</h3>
                                </div>
                            </div>
                            {/* <div className='mt-4 flex flex-col md:flex-row'>
                                <div className='flex-1 md:pr-2 my-2'>
                                    <h2 className='text-lg font-bold mx-4'>Investments</h2>
                                    <IgrDoughnutChart
                                        ref={invChartRef}
                                        width="100%"
                                        height="400px"
                                        allowSliceSelection="true"
                                        innerExtent={0.6}
                                        sliceClick={onSliceClick}>
                                        <IgrRingSeries
                                            name="series-1"
                                            labelMemberPath="summary"
                                            labelsPosition="OutsideEnd"
                                            labelExtent="30"
                                            valueMemberPath="value"
                                            legendLabelMemberPath="category"
                                            outlines="white"
                                            radiusFactor="0.6"
                                            startAngle="30"
                                            dataSource={data}
                                        />
                                    </IgrDoughnutChart>
                                </div>
                                <div className='flex-1 md:pl-2 my-2'>
                                    <h2 className='text-lg font-bold mx-4'>Holdings</h2>
                                    <IgrDoughnutChart
                                        ref={qtyChartRef}
                                        width="100%"
                                        height="400px"
                                        allowSliceSelection="true"
                                        innerExtent={0.6}
                                        sliceClick={onSliceClick}>
                                        <IgrRingSeries
                                            name="series-2"
                                            labelMemberPath="summary"
                                            labelsPosition="OutsideEnd"
                                            labelExtent="30"
                                            valueMemberPath="qty"
                                            legendLabelMemberPath="category"
                                            outlines="white"
                                            radiusFactor="0.6"
                                            startAngle="30"
                                            dataSource={data}
                                        />
                                    </IgrDoughnutChart>
                                </div>
                            </div> */}
                        </div>
                        <div className="flex flex-wrap justify-center mt-4">
                            <div className="w-full p-3">
                                <div className="bg-white rounded-lg shadow-lg p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-1 text-left">
                                            <h2 className="font-bold uppercase text-gray-500 text-xl">Orders</h2>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {trades.length <= 0 ?
                                            <div className="border-t border-gray-400 flex-1 text-center">
                                                <h5 className="text-gray-800">No Orders to show</h5>
                                            </div> :
                                            Object.entries(
                                                trades.reduce((groups, transaction) => {
                                                    const date = new Date(transaction.date).toLocaleDateString('en-US', {
                                                        timeZone: "UTC",
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true
                                                    });
                                                    if (!groups[date]) {
                                                        groups[date] = [];
                                                    }
                                                    groups[date].push(transaction);
                                                    return groups;
                                                }, {})
                                            )
                                                .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                                                .map(([date, group]) => (
                                                    <div key={date}>
                                                        <h4 className="font-bold text-gray-500 mt-4 pb-2">
                                                            {new Date(date).toLocaleDateString('en-US', {
                                                                timeZone: "UTC",
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </h4>

                                                        {group.map((transaction, index) => (
                                                            <div
                                                                className="border-t border-gray-400 p-2 flex justify-between hover:bg-gray-200 cursor-pointer ease-out duration-1000"
                                                                key={index}
                                                                onClick={() => { navigate(`/order/${transaction._id}`) }}
                                                            >
                                                                <div className='flex-1'>
                                                                    <div>
                                                                        <h3 className="font-bold">{transaction.cryptoSymbol}</h3>
                                                                        <p>{transaction.type}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <div>
                                                                        <h3>{transaction.quantity}</h3>
                                                                        <p>Qty</p>
                                                                    </div>
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <div>
                                                                        <h3>{transaction.price}</h3>
                                                                        <p>Price</p>
                                                                    </div>
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <div>
                                                                        <p>
                                                                            {new Date(transaction.date).toLocaleTimeString('en-US', {
                                                                                timeZone: "UTC",
                                                                                hour: 'numeric',
                                                                                minute: 'numeric',
                                                                                hour12: true
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    );
};

export default Dashboard;
