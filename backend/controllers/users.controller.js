const { Router } = require('express');
const { UsersService } = require('../services/users.service');
const { hashPassword } = require('../utilities/common.service');
const { isPasswordStrong, pagePayloadHelper } = require('../utilities/helper.service');
const { error, http } = require('../utilities/response.service');
const router = Router();

const userService = new UsersService();

// for get all users
router.get('/', async (req, res) => {

    const { page, limit } = req.query;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const users = await userService.getAllUsers(pagePayload.skipCount, pagePayload.payloadCount);

        data = {
            users: users
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
});


// for get one user by its uuid
router.get("/:userId", async (req, res) => {

    const { userId } = req.params;

    let data = {};

    try {
        const user = await userService.getUserByKeyValue({ "uuid": userId });

        data = {
            user: user
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})


// for update a user by it uuid
router.put("/:userId", async (req, res) => {

    const { userId } = req.params;
    const { password } = req.body;

    let data = {};

    try {

        if (password) {

            const isPassStrong = isPasswordStrong(password);
            if (!isPassStrong) throw new Error('You are password is not strong. Please try with different password');
            // checking password has atleast 1 uppercase, 1 lowercase, 1 numeric, 1 special char and min length 8

            const hashedPassword = await hashPassword(password);
            req.body.password = hashedPassword;
        }

        const user = await userService.updateUserByKeyVal({ "uuid": userId }, req.body);

        data = {
            updated: true,
            user: user
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})




module.exports = router;
