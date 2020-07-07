import React, { useState, useEffect } from 'react'

function SignUp(props) {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        userName: '',
        image: '',
        password: '',
        conPassword: '',
    });

    const [dataJson, setDataJson] = useState(JSON.stringify(formData))

    const [jsonStatus, setJsonStatus] = useState("hide")

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            setFormData({
                ...formData,
                image : base64
            })
        });
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        setDataJson(JSON.stringify(formData))
    }, [formData])

    const handleJson = (e) => {
        setDataJson(e.target.value)
    }

    useEffect(() => {
        setFormData(JSON.parse(dataJson))
    }, [dataJson])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(localStorage.getItem("userData")){
            let userData = JSON.parse(localStorage.getItem("userData"));
            userData.push(formData);
            localStorage.setItem("userData", JSON.stringify(userData));
        }else{
            let newArray = [];
            newArray.push(formData);
            localStorage.setItem("userData", JSON.stringify(newArray));
        }
        props.checkStatus("login");
    }

    const changePage = () => {
        props.checkStatus("login");
    }

    const changeJsonStatus = (e, status) => {
        e.preventDefault();
        setJsonStatus(status)
    }

    return (
        <div className="container" style={{padding: "40px"}}>
            <div className="card col-md-8 offset-md-2">
                <div className="card-header">
                    Sign Up
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Last Name</label>
                                <input type="text" className="form-control" name="lastName"  value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" name="email"  value={formData.email} onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Phone</label>
                                <input type="number" className="form-control" name="phone"  value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <textarea type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Address" row="3"></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">User Name</label>
                                <input type="text" className="form-control" name="userName"  value={formData.userName} onChange={handleChange} placeholder="User Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Image</label>
                                {
                                    formData.image !== '' &&
                                    <img src={formData.image} className="rounded-circle mb-4" alt="profile" width="150" height="150" />
                                }
                                <input type="file" className="form-control" name="image" onChange={handleImageChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Password</label>
                                <input type="password" className="form-control" name="password"  value={formData.password} onChange={handleChange} placeholder="Password" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Confirm Password</label>
                                <input type="password" className="form-control" name="conPassword"  value={formData.conPassword} onChange={handleChange} placeholder="Confirm Password" />
                            </div>
                        </div>
                        {
                            jsonStatus === "hide"
                            ?
                            <>
                                <button className="btn btn-success mb-2" onClick={(e)=>changeJsonStatus(e,"show")}>Show JSON Data</button>
                                <br />
                            </>
                            :
                            <>
                                <button className="btn btn-danger mb-2" onClick={(e)=>changeJsonStatus(e,"hide")}>Hide JSON Data</button>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Data JSON</label>
                                    <textarea type="text" className="form-control" name="dataJson" value={dataJson} onChange={handleJson}  row="4"></textarea>
                                </div>
                            </>
                        }
                        <button className="btn btn-primary">Sign up</button>
                        
                        
                    </form>

                </div>
            </div>

            <h5 style={{marginTop: "20px", textAlign: "center", fontSize: "15px"}}>Have an acoount? <span style={{cursor: "pointer", color: "#007bff"}} onClick={changePage}>Login</span> Now</h5>
        </div>
    )
}

export default SignUp
