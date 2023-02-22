import React from "react";
import { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { toast } from "react-toastify";
import "../CSS/login_and_signup.css";

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState();
  const { user, setUser } = useContext(UserContext);

  console.log("User is : ", user);
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

  };
  const sendData = async () => {
    console.log(data);
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const content = await response.json();
    console.log("Response : ", content);
    if (content.success === "true") {
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        theme: "dark"
      });
      console.log("Name : ", content.user.name);
      setUser(() => { return { name: content.user.name, email: content.user.email, contact: content.user.contact } });
      console.log("User is : ", user);
      navigate("/dashboard");
    } else {
      console.log("Login Unsuccesful");
      toast.error(content.message, {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        theme: "dark"
      });
    }
  };
  {
    if (user && user.email) {
      return (toast.error("You are already LoggedIn", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        theme: "dark"
      }), navigate("../"));
    }
    else {
      return (
        <>
          <div className="container-fluid mt-5 w-25 d-flex flex-column justify-content-center align-items-center border border-primary">
            <h1 className="display-6 fw-bold">Login</h1>
            <span className="p-float-label mt-4">
              <InputText id="email" onChange={(e) => handleOnChange(e)} />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label mt-4">
              <InputText id="password" onChange={(e) => handleOnChange(e)} />
              <label htmlFor="password">Password</label>
            </span>
            <NavLink to="/signup" className="mt-4">Don't have an account?<Button label="Click Here" link style={{ padding: "0", paddingLeft: "5px" }} /></NavLink>
            <Button className="mt-2 mb-2" label="Submit" onClick={sendData} />
          </div>
        </>
      );
    }
  }

};

export default Login;
