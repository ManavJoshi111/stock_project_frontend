import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // NavLink,
} from "react-router-dom";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Context/UserContext";
import PageContext from "./Context/PageContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import CoinPage from "./components/CoinPage";
import Error from "./components/Error";
import OrderDetails from "./components/OrderDetails";
import ContactUsPage from "./components/ContactUsPage";
import About from "./components/About";

function App() {
  const [user, setUser] = useState({ name: null, email: null, contact: null });
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/isLoggedIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const content = await response.json();
    if (content.success === "true") {
      setUser({ id: content.user._id, ...content.user });
    } else {
      setUser({});
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coin/:id" element={<CoinPage />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </PageContext.Provider>
        </UserContext.Provider>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
