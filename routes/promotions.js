const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();
const mongoose=require('mongoose')
const Promotions=require('../models/promotionSchema')
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
/*.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})*/
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(promotions)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("put operation not supported")
})
.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
promotionRouter.get('/:promotionId', (req,res,next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotion)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

promotionRouter.post('/:promotionId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotiones/'+ req.params.promotionId);
})

promotionRouter.put('/:promotionId', (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promotionId,{$set:req.body},{new:true})
  .then((promotion)=>
  {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
     res.json(promotion)
  },(err)=>next(err))
  .catch((err)=>next(err))
})

promotionRouter.delete('/:promotionId', (req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promotionId)
    .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
});
module.exports = promotionRouter;