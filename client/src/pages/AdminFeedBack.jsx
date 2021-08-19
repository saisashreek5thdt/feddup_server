import React from 'react';
import Logo from "../assets/images/Logo.svg";
import HomeUser from "../assets/images/Home_user.svg";
import msg from "../assets/images/msgIcon.png"
import heart  from "../assets/images/heart.png"
import brokheart from "../assets/images/brokenHeart.png"
import './admin.css'
import Sidebar from "./Sidebar"

const AdminFeedBack = ({history}) => {

   
    return(
        <div
        className='DashboardMain adminDashboard w-100'
        >
         <div className='admn_feedbck_sidebar'>
         <Sidebar/>
         </div>
         <div className='admn_feedbck_main p-5'>
         <span className='mainHeading'>Feedback</span>

         <div
         className='feedbackAdminList'
         >

             <div className='detailFeedback'>

                 <div className='user_small_detail'>
                        <div className='feedbackImg'>
                            <img src={HomeUser} className="users_img h-100" alt="" />
                        </div>
                        <div className='h-100'>
                                <div className='user_name'>
                                    <span className='float-left my-auto w-75 common_font'>ffffffff</span>
                                </div>
                                <div className='user_name'>
                                <span className='w-100 h-100 common_font'>hhhhhhhhh kj jsjjs ajjaj gdgytd</span>
                                </div>
                                
                            
                            </div>
                 </div>
                 <div className='user_cmnt px-10'>
                     <span className='feedback_comnt'>hlhh</span><br/>
                     <p  className='feedback_comnt '>The ::placeholder selector selects form elements with placeholder text, and let you style the placeholder text.

The placeholder text is set with the placeholder attribute, which specifies a hint that
describes the expected value of an input field.
 describes the expected value of an input field.

Tip: The default color of the placeholder text is light grey in most browsers.</p>
                 </div>
                 <div className='buttonss d-flex pb-3'>
                 <div 
                            style={{width:'20%',height:'100%',}}
                            className={['flex mt-2 border-0 ']}>
                               
                               
                            <img 
                            
                            src={heart} alt="" className=' ml-auto search_icon my-auto pr-3'/>
                          40  </div>
                 <div 
                            style={{width:'20%',height:'100%'}}
                            className={['flex mt-2 ']}>
                               
                               
                            <img src={brokheart} alt="" className='  ml-auto search_icon my-auto pr-3'/>23
                            </div>
                 <div 
                            style={{width:'30%',height:'100%'}}
                            className={['flex border mt-2 rounded rounded-full search_box focus:outline-none border-0 bg-white']}>
                               
                                <input type="text" name="" id="" placeholder="search"
                                 className={["bg-transparent pl-0 search_user w-full focus:outline-none border-0 rounded-lg text-center text-xl"]} />
                            <img src={msg} alt="" className='search_icon my-auto pr-3'/>
                            </div>

                 </div>
             </div>
         </div>
         </div>
          
       </div>
    )
}

export default AdminFeedBack