const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MovieRouter = express.Router();
const mongoose=require('mongoose')
const Movies=require('../models/movieSchema')
MovieRouter.use(bodyParser.json());
MovieRouter.use(cookieParser('12345-67890-09876-54321'));
MovieRouter.route('/')
.delete((req,res,next)=>
{
  Movies.remove({})
  .then((resp)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(resp)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.get((req,res,next)=>
{
    Movies.find({})
    .then((movies)=>
    {
        res.statusCode=200
        res.setHeader('Content_Type','apllication/json');
         res.json(movies)
    },(err)=>next(err))
    .catch((err)=>next((err)))
})
MovieRouter.route('/:movieId')
.get((req,res,next)=>
{
    Movies.findById(req.params.movieId)
    .then((movie)=>
  {
      if(movie!=null)
      {
    res.statusCode=200
    res.setHeader('Content_Type','apllication/json');
     res.json(movie)   
      }
      else
      {
          res.statusCode=403;
          res.end(null);
      }
  },(err)=>next(err))
  .catch((err)=>next(err))
}) 
MovieRouter.route('/newmovie')
.post((req,res,next)=>
{
Movies.create(req.body)
.then((movie)=>
{
  res.statusCode=200
  res.setHeader('Content_Type','apllication/json');
   res.json(movie)
},(err)=>next(err))
.catch((err)=>next(err))
});
MovieRouter.route('/:userId/:movieId/comment')
.post((req,res,next) => 
{
    console.log(req.signedCookies.user)
    Movies.create(req.body)
    Movies.findById(req.params.movieId)
    .then((Movie)=>
    {
        if (Movie != null && Movie.comments.id(req.params.userId) != null) {
            if (req.body.rating) {
                Movie.comments.id(req.params.userId).rating = req.body.rating;
            }
            if (req.body.comment) {
                Movie.comments.id(req.params.userId).comment = req.body.comment;                
            }
            Movie.save()
            .then((Movie) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Movie);                
            }, (err) => next(err));
        }  
        else if(Movie!=null)
        {
            Movie.comments.push(req.body);
            Movie.save()
            .then((Movie)=>
            {
            res.statusCode=200;
            res.setHeader('Content_Type','apllication/json');
             res.json(Movie)    
            },(err)=>next(err))
        }
        else
        {
            //err=new Error(`Movie with ${req.params.userId} not found`)
            //err.status(404)
            res.statusCode=404
            res.end("not present")
        }
    },(err)=>
    {
        next(err)
    })
  .catch((err)=>next(err)) 
})

module.exports =MovieRouter;