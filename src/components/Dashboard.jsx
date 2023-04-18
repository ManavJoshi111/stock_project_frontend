import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("User : ", user);
    const navigate = useNavigate();
    if (user.email != null) {
        return (
            <>
                <div className="flex flex-col items-center">
                    <img src="https://picsum.photos/200" alt="Profile picture" className="w-32 h-32 rounded-full object-cover mt-8" />
                    <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
                    <h4 className="text-xl mt-1">{user.email}</h4>
                    <p className="text-gray-600 text-lg mt-2">Paper Trader</p>
                    <div className="mt-3 flex justify-between items-center bg-gray-100 px-8 py-4">
                        <div className="flex items-center">
                            <p className="mr-8">Profit: 1000</p>
                            <p className="mr-8">Total Stocks Bought: 400</p>
                            <p>Remaining Amount: 90</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <h1 className="text-lg font-bold">Paper Trading</h1>
                    </div>
                    <div className="mt-8 p-4 rounded-lg shadow-lg bg-white">
                        <h2 className="text-lg font-bold">Portfolio</h2>
                        <div className="mt-2 flex flex-wrap justify-between">
                            <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-100">
                                <h3 className="text-lg font-bold mb-2">Apple Inc.</h3>
                                <p className="text-gray-600 mb-2">AAPL</p>
                                <p className="text-green-500 font-bold">$143.80 (+1.23%)</p>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    }
    else {
        toast.error("You are not loggedin", {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            draggable: true,
            theme: "dark"
        });
        navigate("../");
    }
}

export default Dashboard