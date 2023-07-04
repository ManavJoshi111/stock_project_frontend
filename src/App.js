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
<<<<<<< HEAD
import PageContext from "./Context/PageContext";
import Header from "./components/Header";
import Login from './components/Login';
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
=======
>>>>>>> 1c0c8264dee2a080d08e41b2aeed2d9d90c3b08e
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
  const [currentPage, setCurrentPage] = useState(1);
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
<<<<<<< HEAD
          <PageContext.Provider value={{ currentPage, setCurrentPage }}>
=======
          {/* <Suspense fallback={<Loading />}> */}
>>>>>>> 1c0c8264dee2a080d08e41b2aeed2d9d90c3b08e
            <Navbar />
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coin/:id" element={<CoinPage />} />
<<<<<<< HEAD
              <Route path="/liveprice" element={<LivePrice />} />
=======
              {/* <Route path="/liveprice" element={<LivePrice />} /> */}
>>>>>>> 1c0c8264dee2a080d08e41b2aeed2d9d90c3b08e
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Error />} />
            </Routes>
<<<<<<< HEAD
          </PageContext.Provider >
=======
          {/* </Suspense> */}
>>>>>>> 1c0c8264dee2a080d08e41b2aeed2d9d90c3b08e
        </UserContext.Provider>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
