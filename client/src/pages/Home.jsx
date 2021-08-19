import React from "react";
import bg from "../assets/images/Home_bg_1.svg";
import Logo from "../assets/images/Logo.svg";
import HomeIllustration from "../assets/images/Home_illustration.svg";
import HomeUser from "../assets/images/Home_user.svg";
import {Link} from 'react-router-dom';
import '../assets/css/animation.css';
import './home.css'

const Home = () => {
  return (
    <div 
    // className={["relative w-screen"]}
    className='DashboardMain w-100'
    >
      <img src={bg} alt="" 
      className='mainImg'
      // className={["h-screen w-screen object-cover"]} 
      />
      <div 
      // className='100'
      className={["absolute top-0 left-0 h-75 right-0 pt-8"]}
      >
        <div className={["flex w-10/12 mx-auto justify-between"]}>
          <Link to="/">
            <img src={Logo} 
            className={['roll-in-right']} 
            // className='testest'
            alt="" />
          </Link>
          <ul className={["flex align-center items-center"]}>
            <li className="scale-in-hor-center"> 
              <Link to="register" className={['mx-3 font-light bg-white px-5 py-2 rounded rounded-full text-sm text-gray-500 md:max-w-md xl:max-w-xl']}>SIGN UP</Link> 
            </li>
            <li className="scale-in-hor-center"> 
              <Link to="signin" className={['mx-3 font-light bg-white px-5 py-2 rounded rounded-full text-sm text-gray-500']}>SIGN IN</Link> 
            </li>
            <li className="rotate-in-2-fwd-ccw"> <a href="/" className={['']}> <img src={HomeUser} alt="" /> </a> </li>
          </ul>
        </div>
        <div className={['sm:mt-32 mt-16 w-10/12 mx-auto lg:flex']}>
          <div className={['xl:w-1/2 lg:w-11/12 xl:pr-10']}>
              <h2 className={['sm:text-7xl lg:text-6xl xl:text-4xl font-extrabold text-white leading-0 2xl:text-8xl slide-in-left']}>
                Business <span className={['font-thin mt-0']}>workflow</span>
              </h2>
            <p className={['sm:text-xl sm:font-light sm:mt-6 xl:text-xl font-thin text-white xl:mt-10 leading-10 slide-in-top']}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              amet aliquam itaque harum accusantium perferendis cum quas
              expedita rerum magnam.
            </p>
          </div>
          <div>
            <img src={HomeIllustration} alt="" className={['hidden lg:block animate-bounce lg:max-w-lg xl:max-w-xl']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
