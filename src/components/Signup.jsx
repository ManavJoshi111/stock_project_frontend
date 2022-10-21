import React from 'react'
import { useState } from 'react';

const Signup = () => {

    const [data, setData] = useState();
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const sendData = async () => {
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await response.json();
        if (content.success === "true") {
            alert("Signup Successful");
        }
        else {
            alert("Signup Unsuccesful");
        }
        console.log("In senddata : ", content);
    }

    return (
        <>
            <center className="h1 mt-2">Sign UP</center>
            <form className='container w-25 mt-3'>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="name" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example1">Full Name</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="number" id="form2Example2" className="form-control" name="contact" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example2">Contact No</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example2" className="form-control" name="email" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example2">Email ID</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="password" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="cpassword" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form2Example2">Confim Password</label>
                </div>
                <center>
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={sendData}>Sign in</button>
                </center>
            </form>
        </>
    )
}

export default Signup;

