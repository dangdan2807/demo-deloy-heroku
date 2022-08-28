const userModel = require('../models/user.model');
const argon2 = require('argon2');

class UserService {
    getUserByUsername = async (username) => await userModel.findOne({ username });

    createNewUser = async (user) => {
        const hashedPassword = await argon2.hash(user.password);
        const newUser = new userModel({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: hashedPassword,
        });
        const _user = await newUser.save();
        return _user._id;
    };

    getUserById = async (userId) => await userModel.findById(userId).select('-password -deleted -isActive -createdAt -updatedAt');
}

module.exports = new UserService();
