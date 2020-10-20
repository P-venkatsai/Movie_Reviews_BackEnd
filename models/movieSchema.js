const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;
const Schema = mongoose.Schema;
const commentSchema=new Schema({
    _id:{type:String,required:true},
    author:{type:String,required:true},
    comment:{type:String},
    rating:{type:Number,required:true},
    updatedat:{type:Number}    
},{
    timestamps:true
})
const movieSchema=new Schema({
    _id:
    {
        type:Number,
        required:true
    },
    movie_name:
    {
        type:String,
        required:true
    },
    comments:[commentSchema]   
},{
    timestamps:true
})
var Movies = mongoose.model('movie', movieSchema);

module.exports = Movies;