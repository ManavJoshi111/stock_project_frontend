import React from 'react'
import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
import { toast } from "react-toastify";
import userContext from '../Context/UserContext';

const Signup = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);

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
      return
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      const content = await response.json();
      console.log("Content IS : ", content);
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
        setLoading(false);
        setUser(content.user);
        navigate("../");
      }
      else {
        setLoading(false);
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
      setLoading(false);
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
        <div className="container flex justify-center">
          < div className="w-full max-w-xs" >
            <div className="flex flex-col break-words bg-white border border-2 shadow-md mt-20">
              <div className="text-3xl text-gray-700 uppercase text-center py-3 px-6 mb-0">
                Sign UP
              </div>
              <a className="mt-1 mb-2 g-signin2" onClick={() => { window.open(process.env.REACT_APP_GOOGLE_AUTH_URL, '_self') }} ><span className="g-icon"></span>Sign UP with Google</a>

              <form className="py-6 px-5">
                <label htmlFor="name" className="block text-gray-700 text-lg font-bold mb-2">
                  Name:
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Enter your Name"
                  onChange={handleOnChange}
                  className="p-3 bg-gray-200 rounded form-input w-full"
                />
                <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  onChange={handleOnChange}
                  className="p-3 bg-gray-200 rounded form-input w-full"
                />
                <label htmlFor="contact" className="block text-gray-700 text-lg font-bold mb-2">
                  Contact:
                </label>
                <input
                  type="contact"
                  name="contact"
                  id="contact"
                  placeholder="Enter your Contact"
                  onChange={handleOnChange}
                  className="p-3 bg-gray-200 rounded form-input w-full"
                />
                <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  onChange={handleOnChange}
                  className="p-3 bg-gray-200 rounded form-input w-full"
                />
                <label htmlFor="cpassword" className="block text-gray-700 text-lg font-bold mb-2">
                  Confirm Password:
                </label>
                <input

                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm your Password"
                  onChange={handleOnChange}
                  className="p-3 bg-gray-200 rounded form-input w-full"
                />
                <button
                  type="button"
                  className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-800 shadow-lg focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  onClick={sendData}
                  disabled={loading}
                >
                  {loading ?
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray"></div>
                    </div> :
                    "Sign UP"}
                </button>
                <div className="text-center pt-3">
                  <NavLink to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                    Already have an account?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Signup;

