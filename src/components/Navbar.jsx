import React, { useEffect, useContext } from 'react'
import UserContext from '../Context/UserContext';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">CryptoX</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="#">About Us</NavLink>
                            </li>

                            {user && user.email != null ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/logout">Logout</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/dashboard">Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/liveprice">Live Prices</NavLink>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/signup">Sign Up</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/test">Charts</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;