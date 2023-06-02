import React from "react";
import { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState();
  const { user, setUser } = useContext(UserContext);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

  };

  const sendData = async () => {
    console.log("Data is : ", data);
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
      setUser(() => { return { id: content.user._id, name: content.user.name, email: content.user.email, contact: content.user.contact } });
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
          {/* Add login with google button */}
          <div className="container flex justify-center">
            < div className="w-full max-w-xs" >
              <div className="flex flex-col break-words bg-white border border-2 shadow-md mt-20">
                <div className="text-3xl text-gray-700 uppercase text-center py-3 px-6 mb-0">
                  Login
                </div>
                <a className="mt-3 mb-2 g-signin2" onClick={() => { window.open('http://localhost:8000/auth/google', '_self') }} ><span className="g-icon"></span>Login with Google</a>

                <form className="py-10 px-5">
                  <div className="flex flex-wrap mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
                      Email:
                    </label>
                    <input

                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={handleOnChange}
                      className="p-3 bg-gray-200 rounded form-input w-full"
                    />
                    <label htmlFor="password" className="mt-3 block text-gray-700 text-lg font-bold mb-2">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={handleOnChange}
                      className="p-3 bg-gray-200 rounded form-input w-full"
                    />
                    <button
                      type="button"
                      className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-800 shadow-lg focus:outline-none hover:bg-gray-700 hover:shadow-none"
                      onClick={sendData}
                    >
                      Login
                    </button>
                  </div>
                  <div className="text-center pt-3">
                    <NavLink to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
                      Don't have an account?
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

};

export default Login;
