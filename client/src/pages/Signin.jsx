// import React from 'react'
import React, { useState } from 'react';
import Logo from "../assets/images/Logo.svg";
import usericon from '../assets/images/user-icon.svg';
import loginrunnning from '../assets/images/login-running.svg';
import loginbg from '../assets/images/loginbg.svg'
import Registerusericon from '../assets/images/register-user-icon.svg'
import RegisterLeftIcon from '../assets/images/register_left_icon.svg'
import backicon from '../assets/images/back.svg'
import passwordicon from '../assets/images/password-icon.svg';
import {Link} from 'react-router-dom';
import '../assets/css/animation.css';
import axios from "axios";
import Api from '../Api';
// import emailicon from '../assets/images/email-icon.svg';

import base_url from './Config';

const Signin = ({history}) => {
    console.log(history)
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [UsernameError, setUsernameError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [msg, setMsg] = useState('');

    function handleVallidation() {
        let formIsValid = true;
        if (!Password) {
          formIsValid = false;
          setPasswordError("Please enter password")
        }
        if (Password !== "") {
          if (Password.length <= 6) {
            formIsValid = false;
            setPasswordError("Password must be longer than 6 characters");
          }
        }
        if (!Username) {
          formIsValid = false;
          setUsernameError("Please enter Username");
        }
        if (Username !== "") {
          let lastAtPos = Username.lastIndexOf('@');
          let lastDotPos = Username.lastIndexOf('.');
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && Username.indexOf('@@') === -1 && lastDotPos > 2 && (Username.length - lastDotPos) > 2)) {
            formIsValid = false;
            setUsernameError("Please enter valid Username");
          }
        }
        return formIsValid;
    }

    const submitValue = (e) => {
        e.preventDefault();
        if (handleVallidation()) {
            const formData = {
                username: Username,
                password: Password
            }
        
              Api.login(formData)
            .then(res => {  
                console.log(res,"resresres") 
                if(res.status === 200) {
                    if(res.data.token) {
                        history.push("/dashboard")
                        localStorage.setItem('token', res.data.token);
                    }
                    if (res.data.user) {
                        if (res.data.user.fullName) {
                            localStorage.setItem('userfullName', res.data.user.fullName);
                        }
                        if (res.data.user._id) {
                            localStorage.setItem('userId', res.data.user._id);
                        }
                    }
                    
                } else {
                    setMsg(res.data.msg);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }


    return (
        <div 
        // className={['h-screen overflow-hidden']}
        className='DashboardMain  d-flex flex-column w-100'
        >
             <img src={loginbg} alt="" 
            className={[' absolute ']} 
            style={{height:'100%',width:'100%' ,objectFit:'cover'}} />
            <div className={[' testdemo absolute top-8 px-24']}>
                <img src={backicon} alt="" className={['transform sm:scale-75']} style={{zIndex: '1'}} onClick={() => history.goBack()} />
                <Link to="/"><img src={Logo} alt="" className={['roll-in-left']} /></Link>
            </div>
            <div
             className={['xl:w-3/12 flex-column mx-auto pt-0 sm:w-9/12 sm:pt-36 md:pt-20 lg:w-2/4']}
            
            style={{zIndex : '1000',height:'80%'}}>
                <div 
                  style={{height:'20%'}}
                className={['flex justify-center']}>
                <img src={Registerusericon}
                    style={{height:'100%'}}
                alt="" className={['transform lg:scale-100 sm:scale-50 tilt-in-top-1']} />
                </div>
                <form
                    style={{height:'80%',width:'100%'}}
                    // className={["mt-2 d-flex justify-center flex-column"]}
                    className='loginForm mx-auto mt-3'
                    >
                    <center><span style={{color: "white", textAlign: "center !important", textTransform: "capitalize"}}>{UsernameError}</span></center>
                    <div 
                       style={{height:'15%',width:'100%'}}
                    className={['flex border px-5 rounded rounded-full mb-14 bg-white sm:py-1 sm:mb-8 slide-in-fwd-center']}>
                        <img src={usericon} alt="" className={['mr-5  transform']} />
                        <input type="text"
                         style={{height:'100%',width:'100%'}}
                        name="Username" id="" placeholder="Username" 
                        className={["bg-transparent w-full focus:outline-none border-0"]} 
                        value={Username}
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <center><span style={{color: "white", textAlign: "center !important", textTransform: "capitalize"}}>{PasswordError}</span></center>
                    <div
                       style={{height:'15%',width:'100%'}}
                    className={['flex border  px-5 rounded rounded-full mb-10 bg-white opacity-80 sm:py-1 sm:mb-8 slide-in-fwd-center']}>
                        <img src={passwordicon} alt="" className={['mr-5 transform scale-75']} />
                        <input type="password"
                         style={{height:'100%',width:'100%'}}
                         name="Password" id="" placeholder="Password" 
                         className={["bg-transparent w-full focus:outline-none border-0"]}
                        value={Password}
                         onChange={e => setPassword(e.target.value)} />
                    </div>                    
                    <div className={['text-center mt-5 slide-in-fwd-center']}
                     style={{height:'10%'}}>
                        <button
                          style={{height:'100%',textAlign:'center'}}
                        className={['py-2 px-8 text-sm font-light bg-white border rounded-full']} onClick={(event) => submitValue(event)}>SIGN IN</button>
                    </div>
                    {msg}
                    <div className={['flex justify-center  mt-4']} style={{zIndex : '10000',height:'10%'}}>
                        <Link to="adminlogin">
                        <button 
                         style={{height:'100%',textAlign:'center'}}
                        className={['sm:text-gray-600 py-2 px-8 mx-4 border-white rounded-full Round_btn text-sm font-light xl:text-white border rounded-full cursor-pointer slide-in-fwd-bottom']} onClick={() => console.log('admin')}>ADMIN</button></Link>
                        <Link to="dashboard">
                            <button 
                         style={{height:'100%',textAlign:'center'}}
                        className={['py-2 px-8 mx-4  Round_btn sm:text-gray-600 text-sm font-light xl:text-white border rounded-full cursor-pointer slide-in-fwd-bottom']} onClick={() => history.push('dashboard')}>SKIP</button></Link>
                    </div>
                    <Link to="/forgotpassword"> <p className={['text-white text-center mt-6 pulsate-fwd lg:text-black']}>Forgot Password ? <span className={['text-gray-100 lg:text-black']}>Click Here...</span> </p> </Link>
                </form>
            </div>
           
            <img src={RegisterLeftIcon} alt=""

             className={['absolute transform scale-90 -left-10  xl:block']}
              style={{top : '100px',height:'75%'}} />
            <img src={loginrunnning} alt="" 
            className={['absolute transform scale-90 right-32  xl:block']} 
            style={{top : '150px',height:'75%'}} />
            <div className={['flex justify-center']}
            style={{height:'8%'}}
             >
                <img src={Logo}
                 style={{height:'100%',position:'relative'}}
                alt=""
                 className={['mt-10']}
                  />
            </div>
        </div>
    )
}

export default Signin
