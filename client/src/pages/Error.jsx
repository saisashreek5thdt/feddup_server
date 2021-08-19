import React from 'react'

import Registerbg from '../assets/images/Register_bg.svg'
import RegisterLeftIcon from '../assets/images/register_left_icon.svg'
import RegisterRightOne from '../assets/images/register_right-1.svg'
import RegisterRightTwo from '../assets/images/register_right-2.svg'
import ErrorImg from '../assets/images/error.png'
// import Registerusericon from '../assets/images/register-user-icon.svg'
// import Logo from "../assets/images/Logo.svg";
// import usericon from '../assets/images/user-icon.svg';
// import emailicon from '../assets/images/email-icon.svg';
// import passwordicon from '../assets/images/password-icon.svg';
// import facebook from '../assets/images/facebook.svg'
// import instagram from '../assets/images/instagram.svg'
// import googleplus from '../assets/images/googleplus.svg'
// import linkedin from '../assets/images/linkedin.svg'
// import twitter from '../assets/images/twitter.svg'


//import {Link} from 'react-router-dom'

const Error = () => {
    return (
        <div className={['h-screen overflow-hidden']}>
            <div className={['relative']}>
                <div className={['text-center flex flex-col align-center items-center h-screen justify-center']}>
                    <img src={ErrorImg} alt="" className={['w-24 h-24']} />
                    <p className={['text-9xl font-black text-pink-500']}>404</p>
                    <p className={['text-pink-500']}>Page Not Found.</p>
                </div>
            <img src={Registerbg} alt="" className={['absolute scale-125 transform object-contain']} style={{top : '520px', zIndex: '-1'}} />
            <img src={RegisterLeftIcon} alt="" className={['absolute transform scale-90 -left-10 hidden lg:block lg:scale-75 lg:-left-52 2xl:scale-90 2xl:-left-10']} style={{top : '300px', zIndex: '-1'}} />
            <img src={RegisterRightOne} alt="" className={['absolute transform scale-90 right-10 hidden lg:block lg:scale-75 lg:right-0 2xl:scale-90 2xl:right-10']} style={{top : '300px', zIndex: '-1'}} />
            <img src={RegisterRightTwo} alt="" className={['absolute transform scale-90 -right-10 hidden lg:block lg:scale-75 lg:-right-20 2xl:scale-90 2xl:right-10']} style={{top : '300px', zIndex: '-1'}} />
        </div>
        </div>
    )
}

export default Error
