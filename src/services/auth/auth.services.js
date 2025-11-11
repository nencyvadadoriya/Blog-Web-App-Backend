const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../../utils/responseFormate");
const { MSG } = require("../../utils/messageFormate");
const user = require('../../models/user.model')
module.exports = class UserService {
    
    //register user
    async registerUser(body) { 
        try {
            return await user.create(body)
        } catch (error) {
            console.log(error);
            return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR)
        }
    }

    // fetch single user login = {email : vadadoriyanency8@gmail.com}
    async fetchSingleUser(body) {
        try {
            return await user.findOne(body)
        } catch (error) {
            console.log(error);
            return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR)

        }
    }

    //update user
    updateUser() {
        try {

        } catch (error) {
            console.log(error);
            return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR)

        }
    }

    //delete user
    deleteUser() {
        try {

        } catch (error) {
            console.log(error);
            return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR)

        }
    }

    //fetch all user
    fetchAllUser() {
        try {

        } catch (error) {
            console.log(error);
            return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR)

        }
    }
}