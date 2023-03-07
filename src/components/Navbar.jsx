import React, { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    console.log("User is : ", user.email ? true : false);
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate(`../`)
            }
        },
        {
            label: 'About',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
                navigate(`../about`)
            }
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-envelope',
            to: '/contact',
            command: () => {
                navigate(`../contact`)
            }
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate(`../login`)
            },
            visible: user.email ? false : true
        },
        {
            label: 'Sign Up',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
                navigate(`../signup`)
            },
            visible: user.email ? false : true
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-user',
            command: () => {
                navigate(`../dashboard`)
            },
            visible: user.email ? true : false
        },
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
                navigate(`../logout`)
            },
            visible: user.email ? true : false,
            end: true
        },
    ];
    const start = <img alt="Logo" src="" width="40" />;
    // const end = <Button icon="pi pi-search" className="p-button-rounded p-button-success" />;
    const handleOnClick = () => {
        console.log("clicked");
        // navigate(`../${item.to}`)
    }
    return (
        <>
            <Menubar model={items} onClick={handleOnClick} start={start} />
        </>
        // <>
        //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //         <div className="container-fluid">
        //             <NavLink className="navbar-brand" to="/">CryptoX</NavLink>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink className="nav-link" to="#">About Us</NavLink>
        //                     </li>

        //                     {user && user.email != null ?
        //                         <>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/dashboard">Dashboard</NavLink>
        //                             </li>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/liveprice">Live Prices</NavLink>
        //                             </li>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/logout">Logout</NavLink>
        //                             </li>
        //                         </> :
        //                         <>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
        //                             </li>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/signup">Sign Up</NavLink>
        //                             </li>
        //                             <li className="nav-item">
        //                                 <NavLink className="nav-link active" aria-current="page" to="/test">Charts</NavLink>
        //                             </li>
        //                         </>
        //                     }
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </>
    );
}

export default Navbar;