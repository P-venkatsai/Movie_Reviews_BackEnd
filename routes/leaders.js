const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());
const mongoose=require('mongoose')
const Leaders=require('../models/leaderSchema')
leadersRouter.route('/')
/*.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})*/
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(leaders)
    },(err)=>next(err))
    .catch((err)=>next(err))})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((Leader)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(Leader)
    },(err)=>next(err))
    .catch((err)=>next(err))})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaderses');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
});
leadersRouter.route('/:leadersId')
.get((req,res,next) => {
    Leaders.findById(req.params.leadersId)
    .then((Leader)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(Leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaderses/'+ req.params.leadersId);
})

.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leadersId,{$set:req.body},{new:true})
    .then((Leader)=>
    {
      res.statusCode=200
      res.setHeader('Content_Type','apllication/json');
       res.json(Leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

.delete((req, res, next) => {
    Leaders.findByIdAndDelete(req.params.leadersid)
    .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
});
module.exports = leadersRouter;