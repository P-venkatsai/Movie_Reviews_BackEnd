const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = express.Router();
var cookieParser = require('cookie-parser');
const mongoose=require('mongoose')
const Users=require('../models/userSchema')
UserRouter.use(bodyParser.json());
//UserRouter.use(cookieParser('12345-67890-09876-54321'));
UserRouter.route('/')
.post((req,res,next)=>
{
  console.log("hai")
Users.create(req.body)
.then((users)=>
{
  res.statusCode=200
  res.setHeader('Content_Type','apllication/json');
   res.json(users)
},(err)=>next(err))
.catch((err)=>next(err))
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
UserRouter.route('/:usersId')
.get((req,res,next)=>
{
  Users.findById(req.params.usersId)
  .then((user)=>
  {
    if(user)
    {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
    //res.cookie('user','admin',{signed: true});
    res.json(user)
    }
    else
    {
      res.statusCode=401;
      res.end("not authorized")
    }
  },(err)=>next(err))
  .catch((err)=>next(err))
})

UserRouter.route('/:usersId/:password')
.get((req,res,next)=>
{
  Users.findById(req.params.usersId)
  .then((user)=>
  {
    if(user!=null&&user.password==req.params.password)
    {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
    //res.cookie('user','admin',{signed: true});
    res.json(user)
    }
    else
    {
      res.statusCode=403;
      res.end("not authorized")
    }
  },(err)=>next(err))
  .catch((err)=>next(err))
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
module.exports = UserRouter;