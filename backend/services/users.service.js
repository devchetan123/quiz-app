const { getUuid } = require("../utilities/helper.service");
const { dbService } = require("./prisma.service")

class UsersService {

    constructor() {
        this.selectedFields = {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            emailId: true,
            mobileNumber: true,
            gender: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isActive: true,
            uuid: true
        }
    }

    async getAllUsers(page = 1, limit = 20) {

        try {
            return await dbService.users.findMany({
                skip: page,
                take: limit,
                select: this.selectedFields,
                orderBy: {
                    id: 'desc'
                }
            })

        } catch (err) {
            throw new Error(err.message);
        }
    }


    async createUser(user) {

        user.uuid = getUuid("U");

        try {
            return await dbService.users.create({
                select: this.selectedFields,
                data: user
            })
        } catch (err) {
            if (err.code === 'P2002') {
                const exist = err.meta.target[0]
                throw new Error(`You are already registered. Please log in`)
            }
            throw new Error(err.message);

        }
    }


    async getUserByKeyValue(keyValues, populateKey = {}) {

        try {
            return await dbService.users.findUnique({
                where: keyValues,
                select: { ...this.selectedFields, ...populateKey }
            })
        } catch (err) {
            throw new Error(err.message);

        }
    }

    async updateUserByKeyVal(keyValues, user) {

        try {
            return await dbService.users.update({
                where: keyValues,
                data: user,
                select: this.selectedFields
            })
        } catch (err) {
            throw new Error(err.message);

        }
    }
}


module.exports = {
    UsersService
}