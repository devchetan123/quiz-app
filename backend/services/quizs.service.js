const { dbService } = require("./prisma.service");



class QuizsService {

    constructor() {
        this.selectedFields = {
            id: true,
            uuid: true,
            title: true,
            createdAt: true,
            userId: true,
            updatedAt: true,
        }
    }

    async getAllByKeyVal(page = 1, limit = 20, keyVal = {}) {

        try {
            return await dbService.quizs.findMany({
                where: keyVal,
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


    async create(quiz) {

        try {
            return await dbService.quizs.create({
                select: this.selectedFields,
                data: quiz
            })
        } catch (err) {
            if (err.code === 'P2002') {
                const exist = err.meta.target[0];
                throw new Error(`There is a unique constraint violation, a new user cannot be created with this ${exist}`);
            }
            throw new Error(err.message);

        }
    }


    async getByKeyValue(keyValues, populateKey = {}) {

        try {
            return await dbService.quizs.findUnique({
                where: keyValues,
                select: { ...this.selectedFields, ...populateKey }
            })
        } catch (err) {
            throw new Error(err.message);

        }
    }

    async updateByKeyVal(keyValues, product) {

        try {
            return await dbService.quizs.update({
                where: keyValues,
                data: product,
                select: this.selectedFields
            })
        } catch (err) {
            throw new Error(err.message);

        }
    }

    async deleteByKeyVal(keyValues) {
        try {
            return await dbService.quizs.delete({
                where: keyValues,
                select: this.selectedFields
            })
        } catch (err) {
            throw new Error(err.message);

        }
    }
}


module.exports = {
    QuizsService
}

