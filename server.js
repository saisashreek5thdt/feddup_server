const express = require("express");
var cors = require('cors');
var db = require('./dbConfig/db')
const app = express();
const userRouter = require("./routes/user-routes");
const feedbackRouter=require("./routes/feedback_routes")
const morgan = require('morgan');

var bodyParser=require("body-parser")

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