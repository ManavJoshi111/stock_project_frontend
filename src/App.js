import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Context/UserContext";
import Header from "./components/Header";
import Login from './components/Login';
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";

function App() {
  const [user, setUser] = useState({ name: null, email: null, contact: null });
  const isLoggedIn = async () => {
    const response = await fetch("http://localhost:8000/api/v1/isLoggedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const content = await response.json();
    if (content.success == "true") {
      console.log("Content : ", content);
      console.log("User : ", content.user);
      setUser(content.user);
    } else {
      setUser({});
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserContext.Provider>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
