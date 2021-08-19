import React, { Component } from 'react';
import axios from"axios"
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import linkedin1 from '../assets/images/linkedin.svg'
class LinkedInPage extends Component {
  handleSuccess = (res) => {
      const data={
        code:res.code
      }
      axios.post('http://localhost:3030/api/v1/linkedinlogin', data
      ).then(response=>{
        console.log(response)
      })
  }

  handleFailure = (error) => {
      console.log ("error",error)
  }
  
  render() {
    return (
      <div className='h-100 '>
        <LinkedIn
        
          clientId="785w8aw6yna19s"
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          redirectUri="http://localhost:3000/linkedin"
        >
          <img src={linkedin1} alt="Log in with Linked In " style={{ height: '66px',marginRight:'auto' }} />
        </LinkedIn>
      </div>
    );
  }
}

export default LinkedInPage;