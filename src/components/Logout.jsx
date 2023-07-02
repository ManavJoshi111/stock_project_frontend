import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../Context/UserContext';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = async () => {
        const res = await fetch(`${process.env.REACT_APP_HOST}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const content = await res.json();
        console.log("Content in logout : ", content);
        if (content.success === "true") {
            // clear the context
            setUser(null);
            toast.success("Logout Successful", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                draggable: true,
                theme: "dark"
            });
            setUser(null);
            navigate("../");
        }
        else {
            toast.error(content.error, {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                draggable: true,
                theme: "dark"
            });
        }
    }
    useEffect(() => { if (user && user.email != null) { logout() } else { navigate("../") } });
    if (user && !user.email) {
        return (
            toast.error("You are not LoggedIn", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                draggable: true,
                theme: "dark"
            })
        );
    }
    else {
        return (
            <center>
                <div className="flex justify-center items-center mt-52  flex-col">
                    <div className="flex justify-center items-center mb-4">
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                    </div>
                    <div><h1 className="text-3xl text-gray-800">Logging You Out...!</h1></div>
                </div>
            </center>
        )
    }
}

export default Logout;