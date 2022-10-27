import React, { useContext } from 'react'
import "../styles/profile.css";
import UserContext from '../Context/UserContext';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("user in profile : ", user);
    return (
        <center>
            <h1>Manav H Joshi</h1>
            <div className="container-md emp-profile mt-2">
                <div className="row ">
                    <div className="col-md-12 d-flex profile-tab justify-content-center align-items-center">
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-8">
                                    <p>{user.name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-8">
                                    <p>{user.contact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </center >
    )
}

export default Profile;