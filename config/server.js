const express = require("express");
var cors = require('cors');
var db = require('./dbConfig/db')
const app = express();
const userRouter = require("./routes/user-routes");
const feedbackRouter=require("./routes/feedback_routes")
const morgan = require('morgan');

var bodyParser=require("body-parser");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
 swaggerDefinition: {
  info: {
   version: "1.0.0",
   title: "FeddUp API",
   description: "FeddUp API Information",
   contact: {
      name: "Amazing Developer"
  },
  servers: [
    {
      "url": "http://159.89.171.252:3030/api/v1",
      "description": "Development server"
    },
    {
      "url": "http://localhost:3030/api/v1",
      "description": "Local server"
    }
  ]
 }
 },
 // ['.routes/*.js']
 apis: ["server.js"]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


  /**
   * @swagger
   * /signup:
   *  post:
   *    description: Signup User
   *    parameters:
   *      - name: fullName
   *        description: fullName.
   *        in: formData
   *        required: true
   *        type: string
   *      - name: ipAddress
   *        description: ipAddress.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: os
   *        description: os Name.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: network
   *        description: network Information.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: browser
   *        description: browser Information.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: email
   *        description: email.
   *        in: formData
   *        required: true
   *        type: string
   *      - name: password
   *        description: password.
   *        in: formData
   *        required: true
   *        type: string
   *      
   *    responses:
   *      '200':
   *        description: A successful response
   */

/**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   *         schema:
   *           type: object
   */

   /**
   * @swagger
   * /forget:
   *   post:
   *     description: forget to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: Email.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: forget password
   *         
   */

   

  /**
   * @swagger
   * /feedback:
   *  post:
   *    description: Feedback Add
   *    parameters:
   *      - name: fullName
   *        description: fullName.
   *        in: formData
   *        required: true
   *        type: string
   *      - name: ipAddress
   *        description: ipAddress.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: os
   *        description: os Name.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: network
   *        description: network Information.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: browser
   *        description: browser Information.
   *        in: formData
   *        required: false
   *        type: string
   *      - name: rating
   *        description: rating.
   *        in: formData
   *        required: true
   *        type: string
   *      - name: message
   *        description: message.
   *        in: formData
   *        required: true
   *        type: string
   *      - name: id
   *        description: User ID.
   *        in: formData
   *        required: true
   *        type: string
   *    responses:
   *      '200':
   *        description: A successful response
   */


app.use(bodyParser.json());

app.use(express.json());

app.use(cors())
  app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
  })
app.use(morgan('tiny'));

app.use("/api/v1", userRouter);
app.use("/api/v1", feedbackRouter);


app.use(express.urlencoded({ extended: false }));


//   app.use(
//     cors({
//       origin: "http://localhost:3000", // allow to server to accept request from different origin
//     //   origin: "https://beetlehunt.herokuapp.com", // allow to server to accept request from different origin
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true, // allow session cookie from browser to pass through
//     })
//   );

app.listen('3030', console.log('listening'))