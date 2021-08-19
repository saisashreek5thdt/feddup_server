import React,{useEffect,useState} from 'react';
import Logo from "../assets/images/Logo.svg";
import HomeUser from "../assets/images/Home_user.svg";
import Search from "../assets/images/Search-icon.svg"
import './admin.css'
import axios from "axios";

const Sidebar = ({history}) => {

    const myBg = {
        backgroundColor: "#F4F7FE"
    }
    useEffect(async()=>{
        const data={
             pageNo :0,
            size :20
        }
        // const res = await axios.get('http://localhost:3030/api/v1/admin/feedbacks',data)
        const res = await axios.get(`http://localhost:3030/api/v1/admin/feedbacks?size=${20}&pageNo=${1}`)
        .then((resd)=>console.log('feedbackList',resd.data))
    },[])
    return(
        <div
        className='DashboardMain adminDashboard w-100'
        >
            <div className="w-10 h-full bg-gradient-to-b from-blue-400 to-blue-800 shadow rounded rounded-md">
                <img src={Logo} className="pt-4 px-1 pb-2" alt="Feddup Logo" />
            </div>
            <div
            className='sidebarpart'
            //  className="w-3/12 bg-blue-100 rounded rounded-lg md:w-3/12 md:bg-blue-300 lg:w-3/12 lg:bg-blue-300 sm:w-50 sm:bg-light-blue-500" 
             style={myBg}>
               
                 
                            <div 
                            style={{width:'70%',marginTop:'5%'}}
                            className={['flex border mt-2 rounded rounded-full search_box focus:outline-none border-0 bg-white']}>
                                <img src={Search} alt="" className='search_icon my-auto pl-3'/>
                                <input type="text" name="" id="" placeholder="search"
                                 className={["bg-transparent p-0 search_user w-full focus:outline-none border-0 rounded-lg text-center text-xl"]} />
                            </div>
                      
                    <div
                    className='users_list'
                    >

                  
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div
                        className='users px-3 py-3'
                        >
                            <div className='Img_main'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                            </div>
                            <div className='details'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                    <span  className='float-right my-auto w-25 common_font'>554345</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                        </div>
                  
                  
                  </div>
         
            </div>
        </div>
    )
}

export default Sidebar