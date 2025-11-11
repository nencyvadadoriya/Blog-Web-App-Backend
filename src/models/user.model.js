const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    about : String,
    password : String,
    gender:String,
    profile_image : String,
    create_At : String,
    updated_At : String,
    isActive :{
        type : Boolean,
        default : true
    },
    isDelete :{
        type : Boolean,
        default : false
    }
})

module.exports =  mongoose.model('users' , userSchema , "users")