import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // NavLink,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Context/UserContext";
import CoinPage from "./components/CoinPage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import OrderDetails from "./components/OrderDetails";
import ContactUsPage from "./components/ContactUsPage";
import About from "./components/About";
import Logout from "./components/Logout";

// const Header = lazy(() => import('./components/Header'));
// const Login = lazy(() => import('./components/Login'));
// const Signup = lazy(() => import('./components/Signup'));
// const Dashboard = lazy(() => import('./components/Dashboard'));
// const Logout = lazy(() => import('./components/Logout'));
// const LivePrice = lazy(() => import('./components/LivePrice'));
// const Error = lazy(() => import('./components/Error'));
// const OrderDetails = lazy(() => import('./components/OrderDetails'));
// const ContactUsPage = lazy(() => import('./components/ContactUsPage'));
// const About = lazy(() => import('./components/About'));

function App() {
  const [user, setUser] = useState({ name: null, email: null, contact: null });
  const isLoggedIn = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/isLoggedIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const content = await response.json();
    if (content.success === "true") {
      console.log("Content : ", content);
      console.log("User : ", content.user);
      setUser({ id: content.user._id, ...content.user });
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
          {/* <Suspense fallback={<Loading />}> */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coin/:id" element={<CoinPage />} />
              {/* <Route path="/liveprice" element={<LivePrice />} /> */}
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Error />} />
            </Routes>
          {/* </Suspense> */}
        </UserContext.Provider>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
