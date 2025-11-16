const { StatusCodes } = require("http-status-codes");
const { sucessResponse, errorResponse } = require("../../utils/responseFormate");
const { MSG } = require("../../utils/messageFormate");
const UserService = require('../../services/auth/auth.services');
const bcrypt = require('bcrypt')
const moment = require('moment');
const jwt = require("jsonwebtoken") 

const userService = new UserService()

// register user
exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const exitUser = await userService.fetchSingleUser({ email: req.body.email })
        if (exitUser) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.USER_EXIST))
        }
        req.body.password = await bcrypt.hash(req.body.password, 11)
        req.body.create_At = moment().format('MMMM Do YYYY, h:mm:ss a');
        req.body.updated_At = moment().format('MMMM Do YYYY, h:mm:ss a');
        req.body.profile_image = req.file.path ; 
        
        const newUser = await userService.registerUser(req.body);

        return res.json(sucessResponse(StatusCodes.CREATED, false, MSG.USER_CREATED, newUser))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }

}

//login user
exports.loginUser =async (req, res) => {
    try {
       const user = await  userService.fetchSingleUser({email : req.body.email});
       if(!user){
        return res.json(errorResponse(StatusCodes.BAD_REQUEST , true , MSG.USER_NOT_FOUND))
       }
    const matchPassword =  await  bcrypt.compare(req.body.password , user.password)
    if(!matchPassword){
        return res.json(errorResponse(StatusCodes.BAD_REQUEST , true , MSG.PASSWORD_NOT_MATCH));
    }
    const payload ={
        id : user.id
    }
   const token =  jwt.sign(payload,process.env.JWT_KEY)
    return res.json(sucessResponse(StatusCodes.OK, false , MSG.SUCCESS_LOGIN , {token}))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }

}   