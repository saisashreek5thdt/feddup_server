const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const fetch=require("node-fetch")
const {OAuth2Client}=require("google-auth-library");
const client= new OAuth2Client(keys.google.clientID)
const confirmEmail=require("../controllers/index")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Token =require("../models/token");
const { db } = require("../models/user");


//http://localhost:3030/api/v1/signup/

router.post(
    "/signup",
    async (req, res) => {
      console.log(req.body.fullName, req.body.password,"singnuo",req.body)
        const {
            fullName,
            email,
            password,
            ipAddress,
            os,
            network,
            browser
        } = req.body;
        try {
            let user = await Users.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            user = new Users({
                fullName,
                email,
                password,
                ipAddress,
                os,
                network,
                browser
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save(function (err) {
              if (err) { 
                console.log("error 55",err)
                return res.status(500).send({msg:err.message});
              }
              
              // generate token and save
              var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
              token.save(function (err) {
                if(err){
                  console.log("error 62",err)
                  return res.status(500).send({msg:err.message});
                }
  
                  // Send email (use verified sender's email address & generated API_KEY on SendGrid)
                  const transporter = nodemailer.createTransport(
                    sendgridTransport({
                        auth:{
                            api_key:"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",
                        }
                    })
                  )

                  // send email from your gmail account
                  // const smtpTransport = nodemailer.createTransport({
                  //   service: "Gmail",
                  //   auth: {
                  //     user: "write your email",
                  //     pass: "your password"
                  //   }
                  // });

                  var mailOptions = { from: 'sonam@5thdt.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.fullName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/v1/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                  transporter.sendMail(mailOptions, function (err) {
                      if (err) { 
                          return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                       } else {
                        return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                       }
                  });
                  return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
              });
            });
        } catch (err) {
            res.status(500).send("Error in Saving");
        }
    }
);

router.get('/confirmation/:email/:token',confirmEmail)

router.post("/forget", async (req, res) => {
  try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user){
          return res.status(400).send("user with given email doesn't exist");
      }
      let token=crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save()
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sashreeksharma@gmail.com",
            pass: "gemini1992"
        }
    });
    var mailOptions = { from: 'st040192@gmail.com', to: user.email, subject: 'Password Reset Link', text: 'Hello '+ user.fullName +',\n\n' + 'Please reset your password by clicking the link: \nhttp://localhost:3000/resetpassword/' + token + '\n\nThank You!\n' };
                  smtpTransport.sendMail(mailOptions, function (err) {
                      if (err) { 
                          return res.status(500).send({msg:'Technical Issue!.'});
                       }
                      return res.status(200).send('A reset link has been sent to ' + user.email + '. It will be expire after one day.');
                  });
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});

//Get route for above will be made in frontend render ui for reset password, then use below for post data//

// router.get('/reset/:token', async (req, res)=> {
//   try {
//   let user= await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
//     if (!user) {
//       {return res.status(400).send("invalid link or expired")};
//     }else
//     {return res.status(200).send("token sent")};
// } catch (error){
//     res.send("An error occured");
//     console.log(error);
// }
// });

router.post("/resetpassword/:token", async (req, res) => {
  // console.log(req.body,req.params)
  try {
      const user = await Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }});
      if (!user) {return res.status(400).send("invalid link or expired")};
    
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save()
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sashreeksharma@gmail.com",
            pass: "gemini1992"
        }
    });
        const dbUser = await Users.findOne(user.email)
        if (user.email === dbUser.email && user.password === dbUser.password){
          const changePassword = await Users.findByIdAndUpdate(user._id, user.password)
          var mailOptions = { from: 'sashreeksharma@gmail.com', to: user.email, subject: 'Password Reset successfully', text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n' };
                  smtpTransport.sendMail(mailOptions, function (err) {
                      if (err) { 
                        console.log(err)
                          return res.status(500).send({msg:'Technical Issue!.'});
                       }
                      return res.status(200).send('Success! Your password has been changed.');
                  });
        }else{
          return res.status(401).send('invalid crenditials');
        }

    
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
//http://localhost:3030/api/v1/login/

router.post(
  "/login",
  async (req, res,next) => {
    const { username, password } = req.body;
    try {
      let user = await Users.findOne({
        email:username
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      if (!user.isVerified){
          return res.status(401).send({msg:'Your Email has not been verified. Please click on resend'});
      } 
        const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
          req.token = token;
          const newUser = {
              token: req.token,
              user: user,
            };
            res.status(200).send(newUser);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
    next()
  }
);

router.get("/users/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.send("User Not Found");
  res.send(user);
});

  router.post("/googlelogin", 
  
  async(req,res)=>{
    const{tokenId}=req.body
    const data= await client.verifyIdToken({idToken:tokenId,audience:keys.google.clientID}).then( (res)=>{
      return res.payload
    })
    const {email_verified,name,email}=data
      if(email_verified){
        let user= await Users.findOne({email})
        if(user){
          const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
            const {fullName,email,_id}=user
            res.json({
              token:token,
              user:{_id,fullName,email}
            })
        }else{
          console.log("data",data)
          console.log("email",data.email)
          let password=data.email+keys.token.TOKEN_SECRET
            newUser=new Users({fullName:data.name, email:data.email, password:password})
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save()
            const token = jwt.sign({newUser }, keys.token.TOKEN_SECRET);
            const {fullName, email, _id}=newUser
          res.json({
            token:token,
            user:{fullName, email, _id}
          })
        }
      }
    })


  router.post("/facebooklogin", 
  async(req,res)=>{
    const{accessToken,userID}=req.body
    let urlGraphFacebook=`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
    const data= await fetch(urlGraphFacebook,{
      method:'GET'
    }).then( (res)=>{
      return res.json()
    })
    console.log("data",data)
    const {name,email}=data
        let user= await Users.findOne({email})
        if(user){
          const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
            const {fullName,email,_id}=user
            res.json({
              token:token,
              user:{_id,fullName,email}
            })
        }else{
          console.log("data",data)
          console.log("email",data.email)
          let password=data.email+keys.token.TOKEN_SECRET
            newUser=new Users({fullName:data.name, email:data.email, password:password})
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save()
            const token = jwt.sign({newUser }, keys.token.TOKEN_SECRET);
            const {fullName, email, _id}=newUser
          res.json({
            token:token,
            user:{fullName, email, _id}
          })
        }
    })
    router.post("/linkedinlogin", 
    async(req,res)=>{
      const{code}=req.body
      let urlLinkedin=`https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/linkedin&client_id=${keys.linkedin.clientID}&client_secret=${keys.linkedin.clientSecret}`
      const token= await fetch(urlLinkedin,{
        method:'GET'
      }).then( (res)=>{
        return res.json()
      })
      console.log("token",token.access_token)
      let url=`https://api.linkedin.com/v2/me`
      const data= await fetch(url,{
      method: 'GET',
      headers: {
        'Host': "api.linkedin.com",
        'Connection': "Keep-Alive",
        'Authorization':'Bearer '+token.access_token
      },}).then((res)=>{
        return res.json()
      })
      console.log("data",data)
      // const {name,email}=data
      //     let user= await Users.findOne({email})
      //     if(user){
      //       const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
      //         const {fullName,email,_id}=user
      //         res.json({
      //           token:token,
      //           user:{_id,fullName,email}
      //         })
      //     }else{
      //       console.log("data",data)
      //       console.log("email",data.email)
      //       let password=data.email+keys.token.TOKEN_SECRET
      //         newUser=new Users({fullName:data.name, email:data.email, password:password})
      //         const salt = await bcrypt.genSalt(10);
      //         newUser.password = await bcrypt.hash(password, salt);
      //         await newUser.save()
      //         const token = jwt.sign({newUser }, keys.token.TOKEN_SECRET);
      //         const {fullName, email, _id}=newUser
      //       res.json({
      //         token:token,
      //         user:{fullName, email, _id}
      //       })
      //     }
      })
      router.post("/twitterlogin", 
      async(req,res)=>{
        const{newData}=req.body
        
        console.log("data",newData)
        const {email}=newData
        console.log(email)
            let user= await Users.findOne({email})
            if(user){
              const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
                const {fullName,email,_id}=user
                res.json({
                  token:token,
                  user:{_id,fullName,email}
                })
            }else{
              console.log("data",newData)
              console.log("email",newData.email)
              let password=newData.email+keys.token.TOKEN_SECRET
                newUser=new Users({fullName:newData.email, email:newData.email, password:password})
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(password, salt);
                await newUser.save()
                const token = jwt.sign({newUser }, keys.token.TOKEN_SECRET);
                const {fullName, email, _id}=newUser
              res.json({
                token:token,
                user:{fullName, email, _id}
              })
            }
        })
  
    
module.exports = router;