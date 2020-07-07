import React, { useState } from 'react'

function Login(props) {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const [loginStatus, setLoginStatus] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let allData = JSON.parse(localStorage.getItem("userData"));
        allData.filter(data => {
            let status;
            if(data.userName === formData.userName && data.password === formData.password){
                status = true;
                localStorage.setItem("loginData", JSON.stringify(data));
                props.checkStatus("dashboard");
            }else{
                status = false;
                setLoginStatus(true)
            }
            return status;
        })
        
    }

    const changePage = () => {
        props.checkStatus("signup");
    }

    return (
        <div className="container" style={{padding: "40px"}}>
            {
                loginStatus &&
                <h5 style={{marginTop: "20px", textAlign: "center", fontSize: "15px", color: "red"}}>Login Failed</h5>
            }
            <div className="card col-md-6 offset-md-3">
                <div className="card-header">
                    Sign Up
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">User Name</label>
                            <input type="text" className="form-control" name="userName"  value={formData.userName} onChange={handleChange} placeholder="User Name" />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" name="password"  value={formData.conPasswordpassword} onChange={handleChange} placeholder="Password" />
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>

                </div>
            </div>
            <h5 style={{marginTop: "20px", textAlign: "center", fontSize: "15px"}}>Don't have an acoount? <span style={{cursor: "pointer", color: "#007bff"}} onClick={changePage}>Sign Up</span> Now</h5>
        </div>
    )
}

export default Login
