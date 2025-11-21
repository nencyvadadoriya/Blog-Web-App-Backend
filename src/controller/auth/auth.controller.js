const { StatusCodes } = require("http-status-codes");
const { sucessResponse, errorResponse } = require("../../utils/responseFormate");
const { MSG } = require("../../utils/messageFormate");
const UserService = require('../../services/auth/auth.services');
const bcrypt = require('bcrypt')
const moment = require('moment');
const jwt = require("jsonwebtoken")
const { sendMail } = require("../../utils/email");
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
        req.body.profile_image = req.file.path;

        const newUser = await userService.registerUser(req.body);

        return res.json(sucessResponse(StatusCodes.CREATED, false, MSG.USER_CREATED, newUser))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }

}

//login user
exports.loginUser = async (req, res) => {
    try {
        const user = await userService.fetchSingleUser({ email: req.body.email });
        if (!user) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.USER_NOT_FOUND))
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchPassword) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.PASSWORD_NOT_MATCH));
        }
        const payload = {
            id: user.id
        }
        const token = jwt.sign(payload, process.env.JWT_KEY)
        return res.json(sucessResponse(StatusCodes.OK, false, MSG.SUCCESS_LOGIN, { token }))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }

}
 
// forgetPassword
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.fetchSingleUser({ email });
        if (!user) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
        }
        if (user.expired_attempt && user.expired_attempt < Date.now()) { 
            user.attempt = 0;
        }

        if (user.attempt >= 3) {
            return res.json(errorResponse(StatusCodes.TOO_MANY_REQUESTS, true, MSG.OTP_SEND_MANYTIME));
        }

        user.attempt++; 
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const expriedTime = new Date(Date.now() + 2 * 60 * 1000);
        await sendMail(email, OTP)
        await userService.updateUser(user._id, { resetOtp: OTP, expriedOtp: expriedTime })
        return res.json(sucessResponse(StatusCodes.OK, false, MSG.OTP_SUCESSFULL_SEND))

    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

//verify otp
exports.verifyOtp = async (req, res) => {
    try {
        const { email, OTP } = req.body;
        const user = await userService.fetchSingleUser({ email })
        if (!user) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
        }
         if (user.expired_attempt && user.expired_attempt < Date.now()) {
            user.attempt = 0;
        }
        if (user.verify_attempt >= 3) {
            return res.json(errorResponse(StatusCodes.TOO_MANY_REQUESTS, true, MSG.OTP_SEND_MANYTIME));
        }
        if (user.expriedOtp < Date.now()) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.OTP_EXPIRED));
        }
         user.verify_attempt++;
        await userService.updateUser(user._id, {  verify_attempt: user.verify_attempt, verify_expired_attempt: new Date(Date.now() + 60 * 60 * 1000)  })
        if (OTP !== user.resetOtp) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.INVALID_OTP));
        }
         await userService.updateUser(user._id, { reset_otp: "", reset_otp_expire: null });
        return res.json(sucessResponse(StatusCodes.OK, false, MSG.VERIFY_OTP))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        const { email, newPassword } = req.body;
        const user = await userService.fetchSingleUser({ email })
        if (!user) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
        }
        const hasePassword = await bcrypt.hash(newPassword, 11)
        await userService.updateUser(user.id, { password: hasePassword })
        return res.json(sucessResponse(StatusCodes.OK, false, MSG.PASSWORD_CHANGED))
    } catch (error) {
        console.log(error);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}