import React, {useState, useEffect} from "react";
import bg from "../assets/images/Home_bg_1.svg";
import Logo from "../assets/images/Logo.svg";
import RegisterLeftIcon from '../assets/images/register_left_icon.svg'
import HomeIllustration from "../assets/images/Home_illustration.svg";
import HomeUser from "../assets/images/Home_user.svg";
import feedbackEmoji1 from '../assets/images/feedbackEmoji-1.svg'
import feedbackEmoji2 from '../assets/images/feedbackEmoji-2.svg'
import feedbackEmoji3 from '../assets/images/feedbackEmoji-3.svg'
import feedbackEmoji4 from '../assets/images/feedbackEmoji-4.svg'
import feedbackEmoji5 from '../assets/images/feedbackEmoji-5.svg'
import rangeslider from '../assets/images/rangeslider.svg'
import feedbacktextarea from '../assets/images/feedbacktextarea.svg'
import {Link} from 'react-router-dom';
import '../assets/css/animation.css';
import $ from "jquery";
import axios from "axios";
import { browserName } from 'react-device-detect';
//import Feedbacklogo from '../assets/images/feedback-logo.svg'
import base_url from './Config';
import './home.css'


const Dashboard = ({history}) => {
    const user = 'Guest User';
    const [feedbackform, setFeedbackForm] = useState(false);
    const [showfeedbackscreen, setShowFeedbackScreen] = useState(false);

    const [Fullname, setFullname] = useState('');
    const [UserId, setUserId] = useState('');
    const [Message, setMessage] = useState('');
    const [Rating, setRating] = useState('');
    const [ip, setIP] = useState('');
    const [userToken, setUserToken] = useState('');
    const [display ,setDisplay] = useState(false)
    const rangeSliderClasses = {
        background : `url(${rangeslider})`,
        
        backgroundRepeat : 'no-repeat',
        outline: 'none',
        opacity: '.7',
        appearance : 'none'
    }
    const getIpData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data.IPv4)
    }
    function getUserInfo() {
      localStorage.getItem('userInfo')
    }

    useEffect(() => {
      $(document.getElementById(Rating)).addClass('img-wrapper').siblings().removeClass('img-wrapper')
    }, [Rating])
    console.log('reamgeeeeeeee============>',Rating)
    // const onChange=()=>{

    // }
    useEffect( () => {
      getIpData();
      getUserInfo();
      let userfullName = localStorage.getItem('userfullName');
      let userId = localStorage.getItem('userId');
      let userToken = localStorage.getItem('token');
      console.log("userInfo",userfullName,"userId",userId);
      if (userfullName) {
        setFullname(userfullName)
      } else {
        setFullname(user)
      }
      if (userId) {
        setUserId(userId)
      }
      if (userToken) {
        setUserToken(userToken)
      }
      
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
    const submitValue = (e) => {
      e.preventDefault();
      const formData = {
          fullName: Fullname,
          os: getOS(),
          browser: browserName,
          ipAddress: ip,
          network: "LAN",
          rating: Rating,
          message: Message,
          id: UserId
      }
      console.log("line 60",formData, browserName)
      axios.post("http://localhost:3030/api/v1/feedback",formData).then(res => {   
          console.log("line 63",res)
          if(res.status === 200) {
              setShowFeedbackScreen(false)
          }
      })
  }
    const onSignOut = (e) => {
      localStorage.removeItem('userfullName');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      history.push("/dashboard")
    }
    return (
        <div 
        // className={["relative h-100 w-screen"]}
        className='DashboardMain w-100'
        >
      <img src={bg} alt="" 
      // className={["h-screen w-screen object-cover"]}
      className='mainImg absolute'
       />
      <div 
      // className={["absolute top-0 left-0 right-0 py-12"]}
      >
        <div className={["flex w-10/12 mx-auto pt-4 justify-between"]}>
          <Link to="/"><img src={Logo} className="roll-in-right" alt="" /></Link>
          <ul className={["flex align-center items-center"]}>
            <li className="scale-in-hor-center"> 
              <Link to="/" className={['mx-3 font-light bg-white px-5 py-2 rounded rounded-full text-sm text-gray-500']} onClick={(event) => onSignOut(event)}>SIGN OUT </Link> 
            </li>
            <li className="rotate-in-2-fwd-ccw"> <Link to="#" className={['']}> <img src={HomeUser} alt="" /> </Link> </li>
          </ul>
        </div>
        <div className={['sm:mt-32 mt-16 w-10/12 mx-auto lg:flex']}>
          <div className={['xl:w-1/2 lg:w-11/12 xl:pr-10']}>
            <h2 className={['sm:text-7xl xl:text-8xl font-extrabold text-white leading-0 2xl:text-9xl slide-in-left']}>Business <span className={['font-thin mt-0']}>workflow</span></h2>
            <p className={['sm:text-xl sm:font-light sm:mt-6 xl:text-xl font-thin text-white xl:mt-10 leading-10 slide-in-top']}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              amet aliquam itaque harum accusantium perferendis cum quas
              expedita rerum magnam.
            </p>
          </div>
          <div>
            <img src={HomeIllustration} alt="" className={['hidden lg:block animate-bounce']} />
          </div>
        </div>
      </div>
      <img  src={Logo} alt=""
       className={feedbackform ? [' mr-2 absolute roll-in-right bottom-0 right-72 transform scale-75 cursor-pointer'] 
       : showfeedbackscreen ? [`mr-14 absolute roll-in-right bottom-5 right-72 transform scale-75 cursor-pointer}`] : [`absolute bottom-5 right-5 transform scale-75 cursor-pointer}`]} 
       style={{zIndex : '1'}}  onClick={() =>setFeedbackForm(!feedbackform)} />
      
      {feedbackform && <div className={['bg-white w-60 h-3/5 shadow-lg rounded-tr-3xl rounded-bl-3xl absolute bottom-5 right-5']} style={{zIndex : '0'}}>
    
       
            <select className='custom-select bg-white w-50 shadow-lg rounded-tr-3xl rounded-bl-3xl absolute mt-5 ml-5' style={{zIndex : '0'}} name="cars" id="cars">
            <option className='custom-select' value="1">Hii</option>
            <option className='custom-select' value="2">{Fullname&& Fullname}</option>

          </select>

         <div className={['mx-auto w-24 signut p-0']}>           
 
            <button href="/" className={['mx-3 mt-2  my-0 py-0 bg-gradient-to-r from-yellow-400 via-red-500 to-red-600 rounded rounded-full text-black']} 
            style={{fontSize: '0.8vw', height:'100%',width:'70%'}} onClick={(event) => onSignOut(event)}>SIGN OUT</button>
        
         </div>
         
         <div className={['sm:mt-1 md:mt-2 w-40 feedbackList  mx-auto']}>
             <h3 
                style={{fontSize: '1.2vw'}}
             className={['text-center text-gray-500']}>FEDDUP PORTAL</h3>
             <div className={[' common_fdbk bg-pink-500 mt-2 w-full py-3 px-4 text-xs rounded flex justify-between font-light text-white cursor-pointer']} onClick={() => {
                 if(feedbackform) {
                    setFeedbackForm(!feedbackform)
                 }
                 setShowFeedbackScreen(!showfeedbackscreen)}
             }>
             <p className={['opacity-100']}>Feedback</p>
             </div>
             <div className={[' common_fdbk bg-pink-500 mt-2 w-full py-3 px-4 text-xs rounded flex justify-between font-light text-white']}>
             <p className={['opacity-100']}>Suggestion</p>
             </div>
             <div className={[' common_fdbk bg-pink-500 mt-2 w-full py-3 px-4 text-xs rounded flex justify-between font-light text-white']}>
             <p className={['opacity-100']}>Help</p>
             </div>
             <div className={[' common_fdbk bg-pink-500 mt-2 w-full py-3 px-4 text-xs rounded flex justify-between font-light text-white']}>
             <p className={['opacity-100']}>FAQs</p>
             </div>
             <div className={['common_fdbk bg-pink-500 mt-2 w-full py-3 px-4 text-xs rounded flex justify-between font-light text-white cursor-pointer']} onClick={() => {
                 if(feedbackform) {
                    setFeedbackForm(!feedbackform)
                 }
                 setShowFeedbackScreen(!showfeedbackscreen)}
             }>
             <p className={['opacity-100']}>Feedback Portal</p>
             </div>
             <div className={['w-24  rounded mx-auto text-center mt-3  bg-red-500 text-white relative cursor-pointer']} style={{padding : '1px'}} onClick={() =>setFeedbackForm(!feedbackform)}>
             <button className={['text-xs font-thin']}>Close</button>
             <span className={['absolute text-red-500 -top-4 left-10']}><i class="fa fa-caret-up fa-2x" aria-hidden="true"></i></span>
             </div>
         </div>
      </div>}
      {showfeedbackscreen &&
        <div className={['px-5 bg-white emojiPopup  h-2/4 shadow-lg rounded-tr-3xl rounded-bl-3xl absolute bottom-5 right-5']}>
            <h3
             style={{fontSize: '1.2vw'}}
            className={['text-center text-lg pt-2']}>FEEDBACK</h3>
            <p
              style={{fontSize: '0.6vw', textAlign:'center'}}
            className={['text-xs font-light mb-2 ']}>Will you recommend the tool to your friends</p>
            <div className={['flex emoji_container justify-between  mb-0 pb-0 px-4']}>
              <div className='emoji_main mx-1 '  id='1'>
              <img src={feedbackEmoji1} className='emoji inner-img' alt="" />
              </div>
              <div className='emoji_main mx-1 '  id='2'>
              <img src={feedbackEmoji2} className='emoji inner-img ' alt="" />
              </div>
              <div className='emoji_main mx-1 ' id='3'>
              <img src={feedbackEmoji3} className='emoji inner-img' alt="" />
              </div>
              <div className='emoji_main mx-1  '  id='4'>
              <img src={feedbackEmoji4} className='emoji inner-img' alt="" />
              </div>
              <div className='emoji_main mx-1  '  id='5'>
              <img src={feedbackEmoji5} className='emoji inner-img' alt="" />
              </div>
             
             
                
              
          
            </div>
            <input type="range"
             name="rating" id="rating" className={['w-full rangeType mt-1 px-2']}
            style={rangeSliderClasses} min='1' max='5' step="1" onChange={(e)=>setRating(e.target.value)}/>
            <p 
              style={{fontSize: '0.8vw', marginTop:'-5px' ,textAlign:'center'}}
            className={['text-xs font-light mt-2 ']}>Your precious feedback...</p>
            <textarea  rows="9" maxLength="100" 
            style={{autoFocus : 'none', 
            height:'50%',
            resize : 'none'}} 
            className={['w-full rounded px-3 font-light text-xs text-gray-100 tracking-wider leading-1 pt-1']} 
            style={{background : `url(${feedbacktextarea}) no-repeat`, zIndex : '1000'}} 
            onChange={e => setMessage(e.target.value)}></textarea>
            <div className={['flex']}>
            <div className={['w-28 rounded mx-auto mt-3 mx-2 text-center bg-yellow-500 text-white relative cursor-pointer']} style={{padding : '0',marginRight:'2%'}} onClick={() =>setFeedbackForm(!feedbackform)}>
             <button className={['text-xs font-light']} onClick={() => {
                 
                     setFeedbackForm(true)
                 
                 setShowFeedbackScreen(false)}
             }>Back</button>
             {/* <span className={['absolute text-yellow-500 -top-4 left-11']}><i class="fa fa-caret-up fa-2x" aria-hidden="true"></i></span> */}
             </div>
             <div className={['w-28 rounded mx-auto mt-3 mx-2 text-center  bg-green-600 text-white relative cursor-pointer']} style={{padding : '',marginLeft:'2%'}}>
             <button className={['text-xs font-light']} 
            //  onClick={() => user ? alert('Feedback submitted') : alert('please login first')} 
             onClick={(event) => submitValue(event)}
             >Submit</button>
             {/* <span className={['absolute text-green-600 -top-4 left-11']}><i class="fa fa-caret-up fa-2x" aria-hidden="true"></i></span> */}
             </div>
            </div>
        </div>
      }
      
    </div>
    )
}

export default Dashboard
