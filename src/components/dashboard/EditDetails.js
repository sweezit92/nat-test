import React, { useState, useEffect } from 'react'

function EditDetails(props) {
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem("loginData")));

    const [dataJson, setDataJson] = useState(JSON.stringify(formData))

    const [jsonStatus, setJsonStatus] = useState("hide")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
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
        let prevData = JSON.parse(localStorage.getItem("loginData"))
        let newData = JSON.parse(localStorage.getItem("userData"))
        let newArrayIndex = newData.map((data, index) => {
            if(data.userName === prevData.userName && data.password === prevData.password){
                return index;
            }else{
                return false;
            }
        })
        newData[newArrayIndex] = formData;
        localStorage.setItem("userData", JSON.stringify(newData))
        localStorage.setItem("loginData", JSON.stringify(formData))
        props.pageChange("profile");
    }

    const changeJsonStatus = (e, status) => {
        e.preventDefault();
        setJsonStatus(status)
    }

    return (
        <div className="container" style={{padding: "40px"}}>
            <div className="card col-md-8 offset-md-2">
                <div className="card-header">
                    Edit Details
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
                        <button className="btn btn-primary">Update</button>
                    </form>

                </div>
            </div>


        </div>
    )
}

export default EditDetails
