import React from 'react'

import Logo from "../assets/images/Logo.svg";
import usericon from '../assets/images/user-icon.svg';
import loginrunnning from '../assets/images/login-running.svg';
import loginbg from '../assets/images/loginbg.svg'
import Registerusericon from '../assets/images/register-user-icon.svg'
import RegisterLeftIcon from '../assets/images/register_left_icon.svg'
import backicon from '../assets/images/back.svg'
import passwordicon from '../assets/images/password-icon.svg';
import {Link} from 'react-router-dom'
// import emailicon from '../assets/images/email-icon.svg';

const Adminlogin = ({history}) => {
    return (
        <div>
            <div className={['flex justify-between absolute top-8 w-full px-24']}>
                <img src={backicon} alt="" className={['']} style={{zIndex: '1'}} />
                <Link to="/"><img src={Logo} alt="" className={['transform scale-90']} /></Link>
            </div>
            <div className={['w-3/12 mx-auto pt-44']} style={{zIndex : '1000'}}>
                <div className={['flex justify-center']}>
                <img src={Registerusericon} alt="" className={['transform scale-100']} />
                </div>
                <form className={["mt-8"]}>
                    <div className={['flex border py-4 px-5 rounded rounded-full mb-14 bg-white']}>
                        <img src={usericon} alt="" className={['mr-5 transform']} />
                        <input type="text" name="" id="" placeholder="Username" className={["bg-transparent w-full focus:outline-none border-0"]} />
                    </div>
                    <div className={['flex border py-4 px-5 rounded rounded-full mb-10 bg-white opacity-80']}>
                        <img src={passwordicon} alt="" className={['mr-5 transform scale-75']} />
                        <input type="text" name="" id="" placeholder="Password" className={["bg-transparent w-full focus:outline-none border-0"]} />
                    </div>
                    <div className={['text-center mt-12']}>
                        <Link to="/admindashboard">
                            <button className={['py-2 px-8 text-sm font-light bg-white border rounded-full']}>SIGN IN</button>
                        </Link>
                    </div>
                    <div className={['flex justify-center mt-4']} style={{zIndex : '10000'}}>
                        <Link to="/signin"><button className={['py-2 px-8 mx-4 text-sm font-light text-white border rounded-full cursor-pointer']} onClick={() => console.log('admin')}>ADMIN</button></Link>
                        <Link to="/admindashboard"><button className={['py-2 px-8 mx-4 text-sm font-light text-white border rounded-full cursor-pointer']} onClick={() => history.push('admindashboard')}>SKIP</button></Link>
                    </div> 
                </form>
            </div>
            <img src={loginbg} alt="" className={['-mt-16 absolute top-0 object-fit']} style={{zIndex: '-1'}} />
            <img src={RegisterLeftIcon} alt="" className={['absolute transform scale-90 -left-10']} style={{top : '100px', zIndex: '1'}} />
            <img src={loginrunnning} alt="" className={['absolute transform scale-90 right-32']} style={{top : '230px', zIndex: '0'}} />
            <div className={['flex justify-center']} style={{zIndex : '-1000'}}>
                <img src={Logo} alt="" className={['mt-32']} />
            </div>
        </div>
    )
}

export default Adminlogin
