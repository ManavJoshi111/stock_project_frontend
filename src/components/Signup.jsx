import React from 'react'
import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { toast } from "react-toastify";
import '../CSS/login_and_signup.css';
import userContext from '../Context/UserContext';

const Signup = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const sendData = async () => {
    console.log("Data : ", data);
    if (data.password !== data.cpassword) {
      toast.error("Password and Confirm Password should be same", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progress: undefined,
      });
    }
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      const content = await response.json();
      console.log("COntent IS : ", content);
      if (!content.error) content.error = "";
      console.log("Response : ", content);
      if (content.success === "true") {
        toast.success("Account Created!!!", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
          theme: "dark"
        });
        setUser(content.user);
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
    catch (err) {
      toast.error("Internal Error....\nPlease Try Again After Sometime!!!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        theme: "dark"
      });
    }
  }
  if (user && user.email) {
    toast.error("You are already logged in", {
      position: "top-center",
      autoClose: 1000,
      closeOnClick: true,
      draggable: true,
      theme: "dark"
    });
    navigate("../");
  }
  else {
    return (
      <>
        <div className="container-fluid mt-5 w-25 d-flex flex-column justify-content-center align-items-center border border-primary">
          <h1 className="display-6 fw-bold">Sign Up</h1>
          <a className="mt-3 mb-2 g-signin2" onClick={() => { window.open('http://localhost:8000/auth/google', '_self') }} ><span class="g-icon"></span>Signup from Google</a>
          <span className="p-float-label mt-4">
            <InputText id="name" name="name" onChange={(e) => handleOnChange(e)} />
            <label htmlFor="name">Name</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText id="email" name="email" onChange={(e) => handleOnChange(e)} />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText id="contact" name="contact" onChange={(e) => handleOnChange(e)} />
            <label htmlFor="contact">Contact</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText id="password" name="password" type="password" onChange={(e) => handleOnChange(e)} />
            <label htmlFor="password">Password</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText id="cpassword" name="cpassword" type="password" onChange={(e) => handleOnChange(e)} />
            <label htmlFor="cpassword">Confirm Password</label>
          </span>
          <NavLink to="/login" className="mt-4">Already have an account?<Button label="Click Here" link style={{ padding: "0", paddingLeft: "5px" }} /></NavLink>
          <Button className="mt-2 mb-2" label="Submit" onClick={sendData} />
        </div>
      </>
    )
  }
}

export default Signup;

