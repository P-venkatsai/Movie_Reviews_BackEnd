const express = require('express');
const bodyParser = require('body-parser');
const TrackRouter = express.Router();
const mongoose=require('mongoose')
const UsersTrack=require('../models/userstrackschema')
const authenticate=require('../authenticate')
TrackRouter.use(bodyParser.json());
TrackRouter.route('/:dateId')
.get(authenticate.verifyUser,(req,res,next)=>
{
    UsersTrack.findById(req.params.dateId)
    .then((user)=>
    {
        if(user!=null)
        {
        res.statusCode=200
        let x=user.numberusers
        user.userid.push({
            uid:req.user._id
        })
        user.numberusers=x+1;
        user.save()
        .then(()=>
        {
            res.setHeader('Content_Type','apllication/json');
            res.json(user)
        },(err)=>next(errr))
        }
        else
        {
            res.statusCode=200
            res.setHeader('Content_Type','apllication/json');
             res.json(user)   
        }
    },(err)=>next(err))
    .catch((err)=>next((err)))
})
// authenticate.verifyUser,
TrackRouter.route('/newdate/:i')
.post((req,res,next)=>
{
UsersTrack.create(req.body)
.then((user)=>
{
//uid:req.user._id inside push
  user.userid.push({
      uid:req.params.i
    })
  res.statusCode=200
  res.setHeader('Content_Type','apllication/json');
   res.json(user)
},(err)=>next(err))
.catch((err)=>next(err))
});
TrackRouter.route('/getusers/dates')
.get((req,res,next)=>
{
  //console.log("hai")
  UsersTrack.find({}).limit(11).sort({time:-1})
  .then((user)=>
  {
       if(user!=null)
       {
        res.statusCode=200;
        res.setHeader('Content_Type','apllication/json');
        res.json(user)  
       }
       else
       {
        res.statusCode=404;
       res.end(null)
       }
  },(err)=>next(err))
  .catch((err)=>next(err))
})
module.exports =TrackRouter;
