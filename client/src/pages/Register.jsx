// import React from 'react'
import React, { useState, useEffect} from 'react';
import Registerbg from '../assets/images/Register_bg.svg'
import backicon from '../assets/images/back.svg'
import RegisterLeftIcon from '../assets/images/register_left_icon.svg'
import RegisterRightOne from '../assets/images/register_right-1.svg'
import RegisterRightTwo from '../assets/images/register_right-2.svg'
import Registerusericon from '../assets/images/register-user-icon.svg'
import Logo from "../assets/images/Logo.svg";
import usericon from '../assets/images/user-icon.svg';
import emailicon from '../assets/images/email-icon.svg';
import passwordicon from '../assets/images/password-icon.svg';
import facebook from '../assets/images/facebook.svg'
import instagram from '../assets/images/instagram.svg'
import googleplus from '../assets/images/googleplus.svg'
import linkedin from '../assets/images/linkedin.svg'
import twitter from '../assets/images/twitter.svg'
import axios from "axios";
import { browserName } from 'react-device-detect';
import {Link,useHistory} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import InstagramLogin from 'react-instagram-login';
import GoogleLogin from 'react-google-login';
import LinkedInPage from "./Linkedin";
import TwitterLogin  from "react-twitter-login";
import '../assets/css/animation.css';
import Api from '../Api';

import base_url from './Config';

const Register = () => {
  const history= useHistory()
    const [Fullname, setFullname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [FullnameError, setFulnameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [RePasswordError, setRePasswordError] = useState('');
    const [ip, setIP] = useState('');

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    const errorMsg = {
        color: "black",
        fontFamily: "inherit",
        paddingTop: "5px"
    }

    useEffect( () => {
        getData()
    }, []);

    function getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
        return os;
    }
    function handleVallidation() {
        let formIsValid = true;
        if (!Fullname) {
            formIsValid = false;
            setFulnameError("Please Enter Your FullName");
        } else {
            setFulnameError("");
        }
        if (!Password) {
          formIsValid = false;
          setPasswordError("Please Enter Your Password")
        } else {
            setPasswordError("");
        }
        
        if (Password !== "") {
          if (Password.length <= 6) {
            formIsValid = false;
            setPasswordError("Password must be longer than 6 characters");
          } else {
            setPasswordError("");
          }
        } 
        if (!RePassword) {
            formIsValid = false;
            setRePasswordError("Please Re-Enter Your Password");
        } else {
            setRePasswordError("");
        }
        if (RePassword) {
            if ( Password !== RePassword) { 
                formIsValid = false;
                setRePasswordError("The Password you entered do not match. Please Re-Enter Your Password.");
            } else {
                setRePasswordError("");
            }
        }
        if (!Email) {
          formIsValid = false;
          setEmailError("Please Enter Your Email");
        } else {
            setEmailError("");
        }
        if (Email !== "") {
          let lastAtPos = Email.lastIndexOf('@');
          let lastDotPos = Email.lastIndexOf('.');
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && Email.indexOf('@@') === -1 && lastDotPos > 2 && (Email.length - lastDotPos) > 2)) {
            formIsValid = false;
            setEmailError("Please enter valid email");
          } else {
            setEmailError("");
          }
        } 
        return formIsValid;
    }

    const submitValue = (e) => {
        e.preventDefault();
        if (handleVallidation()) {
            const formData = {
                fullName: Fullname,
                email: Email,
                password: Password,
                // RePassword: RePassword,
                os: getOS(),
                browser: browserName,
                ipAddress: ip,
                network: "LAN",
            }
            // console.log("line 60",formData, browserName)
            Api.signin(formData)
            // axios.post("http://localhost:3030/api/v1/signup",formData)
            .then(res => {   
                console.log("line 63",res)
                if(res.status === 200) {
                    history.push("/signin")
                }
            })
        }
    }


    const responseFacebook = (response) => {
        console.log("hello",response);
        const data={
            accessToken:response.accessToken,
            userID:response.userID
          }
          axios.post('http://159.89.171.252:3030/api/v1/facebooklogin', data
          ).then(response=>{
            history.push("/dashboard")
            console.log("facebook response is done",response)
        })
    }
    const responseSuccessTweeter = (response) => {
        console.log(response)
        const data={
          tokenId:response.tokenId
        }
        axios.post('http://159.89.171.252:3000/linkedin', data
        ).then(response=>{
          history.push("/dashboard")
          console.log(response)
        })
    }
    const responseErrorTweeter=(response)=>{
        console.log("err",response)
    }
    const responseSuccessGoogle = (response) => {
        console.log(response)
        const data={
          tokenId:response.tokenId
        }
        axios.post('http://159.89.171.252:3030/api/v1/googlelogin', data
        ).then(response=>{
          history.push("/dashboard")
          console.log(response)
        })
    }
    const responseErrorGoogle=(response)=>{
        console.log("err",response)
    }
    
    const authHandler = (error, data) => {
    if (error) return console.error(error);
    console.log(data);
    const response={
        token:data.oauth_token,
        newData:{
        email:data.screen_name
        }
    }
    axios.post('http://159.89.171.252:3030/api/v1/twitterlogin', response
    ).then(response=>{
      history.push("/dashboard")
        console.log("twitter response is done",response)
    })
    };




    return (
        <div 
        className='DashboardMain w-100'
        // className={['h-screen overflow-hidden']}
        >
            <div className={['flex w-11/12 m-0 justify-between testdemo absolute top-8 px-24']}>
                <p  alt=""
                style={{fontSize:'40px'}}
                 className={['transform sm:scale-75']} 
                style={{zIndex: '1'}} onClick={() => history.goBack()} 
                >
                	&#60;</p>
                <Link to="/"><img src={Logo} alt="" className={['roll-in-left']} /></Link>
            </div>
           <img src={Registerbg} alt=""
             className='bestest'
             style={{maxHeight:"100%", width:'120%',position:'absolute'}}
              />
            <div
            className=' pt-7 text-right pr-10'
            style={{height:'18%'}}
           
             >
              
                <Link
                  className='h-45'
                to="dashboard"><button 
                style={{height:'45%', paddingTop: '4%'}}
                className={['sm:py-1 h-100 px-8 py-8 text-sm font-light rounded-full border border-solid border-2 border-black slide-in-top']}>SKIP</button></Link>
            </div>
           
            <div
        
            className=' mx-auto '
              style={{height:'60%', width:'33%',marginTop:'-2%'}}>
                <div 
                className={['flex justify-center']}
                style={{height:'20%'}}
                >
                <img src={Registerusericon} alt="" 
                style={{height:'100%',objectFit:'contain'}}
                // className={['sm:scale-50 transform lg:scale-75 tilt-in-top-1']} 
                />
                </div>
                <form 
               
                style={{height:'80%'}}>
                    <span style ={{color: "red", bottom: "90px"}}>{FullnameError}</span>
                    <div 
                    className='flex border mt-2 registerInpt py-4 px-5 rounded rounded-full mb-10 sm:py-2 sm:mb-6 lg:py-3 lg:mb-8 2xl:py-4 slide-in-fwd-center'
                    style={{bottom: "100px"}}
                    >
                        <img src={usericon} alt="" className={['mr-5 transform']} />
                        
                        <input type="text" name="fullname" id="" placeholder="Fullname" 
                        className="bg-transparent h-100 focus:outline-none border-0"
                        style={errorMsg} 
                        value = {Fullname}
                        onChange={e => setFullname(e.target.value)}/>
                    </div>
                    <span style ={{color: "red", top: "90px"}}>{EmailError}</span>
                    <div className={['flex registerInpt border py-4 px-5 rounded rounded-full mb-10 sm:py-2 sm:mb-6 lg:py-3 lg:mb-8 2xl:py-4 slide-in-fwd-center']} style={{bottom: "100px"}}>
                        <img src={emailicon} alt="" className={['mr-5 transform scale-75']} />
                        <input type="text" name="Email" id="" placeholder="Email" 
                        className={["bg-transparent w-full h-100 focus:outline-none border-0"]}
                         value={Email}
                          onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <span style ={{color: "red", top: "20px"}}>{PasswordError}</span>
                    <div className={['flex registerInpt border py-4 px-5 rounded rounded-full mb-10 sm:py-2 sm:mb-6 lg:py-3 lg:mb-8 2xl:py-4 slide-in-fwd-center']} style={{bottom: "100px"}}>
                        <img src={passwordicon} alt="" className={['mr-5 transform scale-75']} />
                        <input type="password" name="Password" id="" placeholder="Password"
                         className={["bg-transparent h-100 w-full focus:outline-none border-0"]} 
                        value={Password}
                         onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <span style ={{color: "red", top: "20px"}}>{RePasswordError}</span>
                    <div className={[' registerInpt flex border py-4 px-5 rounded rounded-full mb-10 sm:py-2 sm:mb-6 lg:py-3 lg:mb-8 2xl:py-4 slide-in-fwd-center']} style={{bottom: "100px"}}>
                        <img src={passwordicon} alt="" className={['mr-5 transform scale-75']} />
                        <input type="password" name="RePassword" id=""
                         placeholder="Re-Password" className={["bg-transparent h-100 w-full focus:outline-none border-0"]}
                        value={RePassword}
                         onChange={e => setRePassword(e.target.value)}/>
                    </div>                    
                    <div className={['registerInpt flex justify-center mt-16 sm:mt-8']}>
                        <button 
                        style={{height:'50%', width:'20%',fontSize:'1vw'}}
                        className={['text-sm font-light border rounded-full slide-in-fwd-bottom']} onClick={(event) => submitValue(event)}>SIGN IN</button>
                    </div>
                    <div
            className=' absolute socialMedia'
              style={{width: "50%"}}
              >
                {/* <img src={facebook}
                className='socialLinks'
                style={{border:'solid'}}
                alt="" className={['transform lg:scale-25 sm:scale-50']} />
                <img src={instagram}
                  className='socialLinks'
                onClick={(e)=>Click(e)}
                
                alt="" className={[' px-0 transform lg:scale-25 sm:scale-50']} />
                <img src={googleplus} 
                alt="" className={[' px-0 transform lg:scale-25 sm:scale-50']} />
                <img src={linkedin} alt="" className={['transform px-0 lg:scale-25 sm:scale-50']} />
                <img src={twitter} alt="" className={['transform px-0 lg:scale-25 sm:scale-50']} />
                */}
                 
                                {/* <FacebookLogin
                                
                             icon={ <img src={facebook}
                             alt="" className={['transform h-100 facebook ']} />}
                                appId="244607770821133"
                                autoLoad={false}
                                callback={responseFacebook}
                                textButton=''
                                style={{ maxWidth: '60%' }}
                              fields="name,email,picture"
                            
                              /> */}

                                  <FacebookLogin
                                
                                icon={ <img src={facebook}
                                alt="" className={['transform h-100 facebook ']} />}
                                   appId="510058686761446"
                                   autoLoad={false}
                                   callback={responseFacebook}
                                   textButton=''
                                   style={{ maxWidth: '60%' }}
                                 fields="name,email,picture"
                               
                                 />                                              
                      <InstagramLogin
                      cssClass='background-none h-100'
                        clientId="5fd2f11482844c5eba963747a5f34556"
                        buttonText=""
                        // onSuccess={responseInstagram}
                        // onFailure={responseInstagram}
                      >
                        <img src={instagram}
                       alt="" className={[' px-0 h-100 instagram transform ']} />
                      </InstagramLogin>


                    <GoogleLogin
                    className='h-100'
                     render={renderProps => (
                      <img onClick={renderProps.onClick} src={googleplus} />
                    )}
                    
                        buttonText=''
                        clientId="1015319600953-vs0ae0bm9eua4e4rrhtn0os2cdll77n1.apps.googleusercontent.com"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <LinkedInPage
                    
                    />
       
                    <TwitterLogin 
                        authCallback={authHandler}
                        consumerKey="1asSwpbFuICXfIxt9nikswjM5" 
                        consumerSecret="QoZ0yqBFeN67wuUI4HxVJOXRKxPPSYW6qbmCdtYgYeh3bm4AJ2"
                    >
                      <img src={twitter} alt="" className={[' instagram transform px-0']} />
                    </TwitterLogin>
                 
            </div>
      
                </form>
          
            </div>
        
            <img src={RegisterLeftIcon} alt=""

            className={['absolute transform scale-90 -left-0  xl:block']}
            style={{top : '25%',height:'75%',width:'35%'}} />
            <img src={RegisterRightOne} alt="" 
            className={['absolute transform scale-90 right-14  xl:block']} 
            style={{top : '35%',height:'65%'}} />
            <img src={RegisterRightTwo} alt="" 
            className={['absolute transform scale-90 right-0  xl:block']} 
            style={{top : '35%',height:'65%'}} />


            {/* <img src={RegisterLeftIcon} alt=""
             className='absolute transform scale-90 -left-10 hidden lg:block lg:scale-75 lg:-left-52 2xl:scale-90 2xl:-left-10'
              style={{top : '300px', zIndex: '-1'}} />
            <img src={RegisterRightOne} alt=""
             className='absolute transform scale-90 right-10 hidden lg:block lg:scale-75 lg:right-0 2xl:scale-90 2xl:right-10'
              style={{top : '300px', zIndex: '-1'}} />
            <img src={RegisterRightTwo} alt=""
             className='absolute transform scale-90 -right-10 hidden lg:block lg:scale-75 lg:-right-20 2xl:scale-90 2xl:right-10'
              style={{top : '300px', zIndex: '-1'}} /> */}
         
        </div>
    )
}

export default Register
