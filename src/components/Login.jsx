import React from 'react'
import { useState } from 'react';

const Login = () => {
    const [data, setData] = useState();

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const sendData = async () => {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await response.json();
        if (content.success === "true") {
            alert("Login Successful");
        }
        else {
            alert("Login Unsuccesful");
        }
        console.log("In senddata : ", content);
    }

    return (
        <>
            <center className="h1 mt-2">Login</center>
            <form className='container w-25 mt-3'>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="email" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="password" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>
                <center>
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={sendData}>Sign in</button>
                </center>
            </form>
        </>
    )
}

export default Login;