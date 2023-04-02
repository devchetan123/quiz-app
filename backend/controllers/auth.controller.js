const { Router } = require('express');
const authenticater = require('../middleware/authenticate.middleware');
const { UsersService } = require('../services/users.service');
const { hashPassword, generateToken, validatePassword } = require('../utilities/common.service');
const { isPasswordStrong } = require('../utilities/helper.service');
const { error, http } = require('../utilities/response.service');
const router = Router();

const userService = new UsersService();

// for register a new user
router.post("/register", async (req, res) => {

    let data = {};

    try {

        const { password } = req.body;

        const isPassStrong = isPasswordStrong(password);
        if (!isPassStrong) throw new Error('You are password is not strong. Please try with different password');
        // checking password has atleast 1 uppercase, 1 lowercase, 1 numeric, 1 special char and min length 8


        const hashedPassword = await hashPassword(password);
        // hashing password to prevent password for privacy purpose

        req.body.password = hashedPassword;
        // adding password key with hashed password in request body

        const user = await userService.createUser(req.body);
        // creating new user if user already exist also checking by this createUser method

        let token;

        if (user) token = generateToken(user);
        // generating user token

        data = {
            token: token,
            user: user
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})


// for login a user
router.post("/login", async (req, res) => {

    // console.log("req::", req)

    let data = {};

    try {

        const { emailId, mobileNumber, password } = req.body;

        let user;
        if (emailId) {
            user = await userService.getUserByKeyValue({ "emailId": emailId }, { password: true });
        }
        else if (mobileNumber) {
            user = await userService.getUserByKeyValue({ "mobileNumber": mobileNumber }, { password: true });
        }
        // check if user is existing with emailId or Mobile Number 

        if (!user) throw new Error('You are not registered. Please sign up');

        const isAuthenticated = await validatePassword(password, user.password);
        // comparing password

        if (!isAuthenticated) throw new Error('You are password incorrect. Please try again');
        // checking is user authenticated or not

        delete user.password;
        // deleting hashedpassword from user 

        let token;

        if (user) token = generateToken(user);
        // generating user token

        data = {
            token: token,
            user: user
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})

module.exports = router;
