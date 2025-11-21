const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    about: String,
    password: String,
    resetOtp: String,
    expriedOtp: {
        type: Date,
        default: null
    },
    reset_otp_expire: {
        type: Date,
        default: null
    },
    attempt: {
        type: Number,
        default: 0,
    },
    expired_attempt: {
        type: Date,
        default: null
    },
     verify_attempt: {
        type: Number,
        default: 0,
    },
    verify_expired_attempt: {
        type: Date,
        default: null
    },
    gender: String,
    profile_image: String,
    create_At: String,
    updated_At: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', userSchema, "users")