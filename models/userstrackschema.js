const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Schema = mongoose.Schema;
const DatesSchema=new Schema({
    _id:
    {
        type:String,
        required:true
    },
    numberusers:
    {
        type:Number,
        required:true
    },
    time:
    {
        type:Number,
        required:true
    },
    userid:
    [
        {
         uid:{type:String,required:true}
        }
    ]  
},{
    timestamps:true
})
var UserDates = mongoose.model('userdates', DatesSchema);

module.exports =UserDates;