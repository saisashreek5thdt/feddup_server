import React from 'react';
import Logo from "../assets/images/Logo.svg";
import HomeUser from "../assets/images/Home_user.svg";
import Search from "../assets/images/Search-icon.svg"
import './admin.css'
import Sidebar from "./Sidebar"

const Admindashboard = ({history}) => {

   
    return(
        <div
        className='DashboardMain adminDashboard w-100'
        >
            <Sidebar/>
       </div>
    )
}

export default Admindashboard