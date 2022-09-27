const User = require('../model/user_model');
const http_formatter = require('../util/http_formatter');

const getUserItem = async (request, response) => {
    try {
        const {pageNo, perPage} = request.query;
        const users = await User.find({}).skip(perPage * (pageNo - 1)).limit(perPage);
        return response.status(200).json(http_formatter( users,"users got succesfully"));
    } catch (error) {
        console.log(error);
        return response.status(400).json(http_formatter(error, "Something went wrong, please try again", false));
    }
}
const createNewUser = async (request, response) => {
    try {
        const user = await User.create(request.body);
        return response.status(201).json(
            http_formatter(user, "User created successfully"),
        );
    } catch ( err ) {
        return response.status(400).json(http_formatter(err, "Something went wrong, please try again", false));
    }
}

const userLogin = (request, response) => {
    
}

const updateUser = (request, response) => {

}

const deleteUser = (request, response) => {

}

module.exports = { 
    getUserItem,
    createNewUser,
    updateUser,
    deleteUser,
    userLogin
};