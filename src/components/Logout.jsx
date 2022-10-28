import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../Context/UserContext';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = async () => {
        const res = await fetch("http://localhost:8000/api/v1/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const content = await res.json();
        if (content.success === "true") {
            toast.success("Logout Successfull", {
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
                <h1>Loggin You Out...</h1>
            </center>
        )
    }
}

export default Logout;