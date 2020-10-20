const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = express.Router();
var cookieParser = require('cookie-parser');
const mongoose=require('mongoose')
var passport =require('passport')
const Users=require('../models/userSchema')
var authenticate=require('../authenticate')
UserRouter.use(bodyParser.json());
//UserRouter.use(cookieParser('12345-67890-09876-54321'));
UserRouter.route('/')
.post((req,res,next)=>
{
  Users.register(new Users({username: req.body.username,email:req.body.email,
    registerdate:req.body.date}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        var token = authenticate.getToken({_id:user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({token:token});
      });
    }
  });
})
UserRouter.route('/admin/:password')
.get((req,res,next) => {
  if(req.params.password=="VenkatKing")
  {
  Users.find({})
  .then((users)=>
  {
      res.statusCode=200
      res.setHeader('Content_Type','apllication/json');
       res.json(users)
  },(err)=>next(err))
  .catch((err)=>next(err))
 }
 else
 {
  res.statusCode=401
   res.end("Not Authorized")
 }
})
.delete((req,res,next)=>
{
  if(req.params.password=="VenkatKing")
  {
  Users.remove({})
  .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
  }
  else
  {
    res.statusCode=401
   res.end("Not Authorized")
  } 
})
UserRouter.route('/verifyuser')
// .get((req,res,next)=>
// {
//   Users.findById(req.params.usersId)
//   .then((user)=>
//   {
//     if(user)
//     {
//     res.statusCode=200
//     res.setHeader('Content_Type','apllication/json');
//     //res.cookie('user','admin',{signed: true});
//     res.json(user)
//     }
//     else
//     {
//       res.statusCode=401;
//       res.end("not authorized")
//     }
//   },(err)=>next(err))
//   .catch((err)=>next(err))
// })
.get(authenticate.verifyUser,(req,res,next)=>
{
  res.setHeader('Content_Type','apllication/json');
  res.json({status:"ok"});
})
UserRouter.route('/login')
.post(passport.authenticate('local'),(req,res,next)=>
{
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  if(req.user.admin)
  {
    res.json({success: true, token: token, status: 'You are successfully logged in!',
    username:req.user.username,uid:req.user._id,email:req.user.email,admin:true});  
  }
  else
  {
  res.json({success: true, token: token, status: 'You are successfully logged in!',
  username:req.user.username,uid:req.user._id,email:req.user.email,admin:false});
  }
})
.put((req,res,next)=>
{
  Users.findByIdAndUpdate(req.params.usersId,{$set:req.body},{new:true})
  .then((user)=>
  {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
    res.json(user)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.delete((req,res,next)=>
{
  Users.findByIdAndDelete(req.params.usersId)
  .then((resp)=>
  {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
    res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
UserRouter.route('/movierating/:userId')
.get((req,res,next)=>
{
  Users.findById(req.params.userId)
  .then((user)=>
  {
       if(user!=null)
       {
        res.statusCode=200;
        res.setHeader('Content_Type','apllication/json');
        res.json(user.ratings)  
       }
       else
       {
        res.statusCode=404;
       res.end(null)
       }
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.post((req,res,next) => {
  Users.create(req.body)
  Users.findById(req.params.userId)
  .then((user)=>
  {
      if(user!=null)
      {
   user.ratings.push(req.body);
   user.save()
   .then((user)=>
   {
      res.statusCode=200;
   res.setHeader('Content_Type','apllication/json');
   res.json(user)    
   },(err)=>next(err))
      }
      else
      {
          err=new Error(`user with ${req.params.userId} not found`)
          err.status(404)
          return next(err)
      }
  },(err)=>
  {
      next(err)
  })
.catch((err)=>next(err))
})
//checking if email or username is already present
UserRouter.get('/present/:email',(req,res,next)=>
{
  Users.findOne({email:req.params.email})
  .then((user)=>
  {
    Users.findOne({username:req.params.username})
    if(user==null)
    {
      res.statusCode=200;
      res.json({user:"ok"});
    }
    else
    {
      res.statusCode=200;
      res.json({user:"not ok"});
    }
  },(err)=>next(err))
  .catch((err)=>next(err))  
})
UserRouter.get('/present/username/:username',(req,res,next)=>
{
  Users.findOne({username:req.params.username})
  .then((user)=>
  {
    res.setHeader('Content-Type', 'application/json');
    if(user==null)
    {
      res.statusCode=200;
      res.json({user:"ok"});
    }
    else
    {
      res.statusCode=200;
      res.json({user:"not ok"});
    }
  },(err)=>next(err))
  .catch((err)=>next(err))  
})
module.exports = UserRouter;