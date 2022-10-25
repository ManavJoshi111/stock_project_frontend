import { useState } from "react";
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
import Profile from "./components/Profile";
function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserContext.Provider>
      </Router>
      <ToastContainer style={{ width: "400px" }} />
    </>
  );
}

export default App;
