import React,{ useState } from 'react'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import Profile from './dashboard/Profile'

function MainContent() {
    let status;
    if(localStorage.getItem("loginData") !== "null"){
        status = "dashboard"
    }else{
        status = "login"
    }

    const [pageStatus, SetPageStatus] = useState(status)

    const handleStatus = (status) => {
        SetPageStatus(status)
    }

    return (
        <>
        {
            pageStatus === 'dashboard' &&
            <Profile checkStatus={handleStatus}/>
        } 

        {
            pageStatus === 'login' &&
            <Login checkStatus={handleStatus}/>
        }
        {
            pageStatus === 'signup' &&
            <SignUp checkStatus={handleStatus}/>
        }
          
        </>
    )
}

export default MainContent
