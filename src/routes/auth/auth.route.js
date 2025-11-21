const express = require('express')
const { registerUser, loginUser, forgetPassword, changePassword, verifyOtp } = require('../../controller/auth/auth.controller')
const multer = require('multer')
const {storage} = require('../../config/cloudinary.config')

const upload = multer({ storage})
const route = express.Router()
route.post('/register',upload.single("profile_image"),  registerUser)
route.post('/login',loginUser) 
route.post('/forgetPassword',forgetPassword)
route.post('/verifyOtp',verifyOtp)
route.post('/changePassword',changePassword)

module.exports = route;  