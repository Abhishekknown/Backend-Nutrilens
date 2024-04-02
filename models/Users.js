const mongoose  = require("mongoose")

const findOrCreate = require('mongoose-findorcreate');


const UserSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
    },
    number :{
        type : Number
    },
    "fullname" : {
        type : String,
        trim : true, 
    },
    "sugarlevel" : {
        type : Number
    },
    "cholestrol" : {
        type : Number
    },
    "bloodpressure" : {
        type : String,
        enum : ['Yes', 'No'],
        default : 'No'
    },
    "weightInkg" : {
        type : Number,
        max : 200,
        min : 15,
    },
    "height" : {
        type : Number,
    },
    "physique" : {
        type : String,
        enum : ["Slim", "Normal", "Fit", "Fat", "Overweight"]
    },
}, {timestamps : true})


UserSchema.plugin(findOrCreate)

module.exports = mongoose.model("user", UserSchema);
