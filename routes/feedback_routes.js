const express = require("express");
const router = express.Router();
const Feedbacks=require("../models/feedback")


router.post("/feedback",
    async(req,res)=>{
      console.log("bo0dy",req.body)
      try{
      const{
        fullName,
        ipAddress,
        os,
        network,
        browser,
        rating,
        message,
        id
      }=req.body

      feedback = new Feedbacks({
        fullName,
        ipAddress,
        os,
        network,
        browser,
        rating,
        message,
        id
    });
        await feedback.save()
              res.status(200).json({
                message: "registered"
              });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }

    })

    // For User
    // http://localhost:3030/api/v1/feedback/6107e2e84013b61f54205f47?pageNo=1&size=10

    router.get("/feedback/:id",
    async(req,res)=>{
      try{
        var pageNo = parseInt(req.query.pageNo)
        var size = parseInt(req.query.size);
       
        if(pageNo < 0 || pageNo === 0) {
              response = {"error" : true,"message" : "invalid page number, should start with 1"};
              return res.json(response)
        }
        let skip =size*(pageNo-1)
        let limit = size;
        let feedbacks = await Feedbacks.find({id:req.params.id}).skip(skip).limit(limit)
        res.json(feedbacks)
      }catch (err){
        console.log(err.message);
        res.status(500).send("Error in Fetching");
      }
  })

  // For Admin
  // http://localhost:3030/api/v1/admin/feedbacks?pageNo=1&size=10

  router.get("/admin/feedbacks",
    async(req,res)=>{
      var pageNo = parseInt(req.query.pageNo)
      var size = parseInt(req.query.size);
      try{
        let skip =size*(pageNo-1)
        console.log(skip)
        let limit = size;
        let feedbacks = await Feedbacks.find({}).skip(skip).limit(limit)
        res.json({feedbacks})
      }catch (err){
        console.log(err.message);
        res.status(500).send("Error in Fetching");
      }
  })
  
module.exports = router;