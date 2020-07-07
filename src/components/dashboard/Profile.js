import React, { useState } from 'react'
import EditDetails from './EditDetails'

function Profile(props) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("loginData")))
    const [pageStatus, setPageStatus] = useState("profile")

    const logoutUser = () => {
        localStorage.setItem("loginData", null);
        props.checkStatus("login");
    }

    const changeStatus = (status) => {
        setPageStatus(status)
        setUserData(JSON.parse(localStorage.getItem("loginData")))
    }

    return (
        <>
            {
                pageStatus === "profile"
                    ?
                    <div className="container" style={{ padding: "40px" }}>
                        <div className="card col-md-8 offset-md-2">
                            <div className="card-header">
                                <h5>My Profile</h5>
                            </div>
                            <div className="card-body" style={{ textAlign: "left" }}>
                                {
                                    userData.image !== ''
                                    ?
                                    <img src={userData.image} className="rounded-circle mb-4" alt="profile" width="150" height="150" />
                                    :
                                    <img src="https://via.placeholder.com/150" className="rounded-circle mb-4" alt="profile" width="150" height="150" />
                                }
                                
                                <br />
                                <h5>{userData.firstName} {userData.lastName}</h5>
                                <span><b>Email :</b> {userData.email}</span>
                                <br />
                                <span><b>Phone :</b> {userData.phone}</span>
                                <br />
                                <span><b>Address :</b> {userData.address}</span>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary mr-2" onClick={() => changeStatus("edit")}>Edit</button>
                                <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                            </div>
                        </div>
                    </div>
                    :
                    <EditDetails pageChange={changeStatus}/>
            }
        </>

    )
}

export default Profile
