const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;
const Schema = mongoose.Schema;
const userSchema=new Schema({
    _id:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    ratings:[
        {
            movie_id:
            {type:Number,required:true},
            rating:{type:Number,min:0,max:5,required:true}
        }
    ]   
},{
    timestamps:true
})
var Users = mongoose.model('user', userSchema);

module.exports =Users;
