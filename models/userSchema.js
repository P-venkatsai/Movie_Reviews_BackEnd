var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose')
var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    },
    email:
    {
        type:String,
        unique:true
    },
    registerdate:
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
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('user',User);
