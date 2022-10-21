import React from 'react'
import "../styles/profile.css";
const Profile = () => {
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
                                    <p>Manav H Joshi</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-8">
                                    <p>Lorem, ipsum.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-8">
                                    <p>32040384</p>
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