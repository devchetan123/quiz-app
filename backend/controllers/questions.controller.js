const { Router } = require('express');
const { QuestionService } = require('../services/questions.service');
const { reqBodyAdder } = require('../utilities/common.service');
const { pagePayloadHelper, getUuid } = require('../utilities/helper.service');
const { error, http } = require('../utilities/response.service');
const router = Router();

const questionService = new QuestionService();

// for add a new 
router.post("/" , async (req, res) => {

    let data = {};

    try {

        if(!req.body.title) throw new Error("Question text missiong!");

        const uuid = getUuid("QS", [0, 27]);

        reqBodyAdder(req.body,{uuid});
        // this method is help to add key values in request body
        
        const question = await questionService.create(req.body);
        // creating new if already exist also checking by this create method

        data = {
            question: question
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})


// for get all 
router.get('/', async (req, res) => {

    const { page, limit } = req.query;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const questions = await questionService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount)

        data = {
            questions: questions
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
});


// questions by quiz
router.get('/quiz/:quizId', async (req, res) => {

    const { page, limit } = req.query;
    const { quizId } = req.params;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const questions = await questionService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount, {quizId : quizId})

        data = {
            questions: questions
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
});

// get specific by uuid
router.get("/:id", async (req, res) => {

    const { id } = req.params;

    let data = {};

    try {
        const question = await questionService.getByKeyValue({ "uuid": id });

        data = {
            question: question
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})


// update by uuid
router.put("/:id", async (req, res) => {

    const { id } = req.params;

    let data = {};

    try {

        const question = await questionService.updateByKeyVal({ "uuid": id }, req.body);

        data = {
            updated: true,
            question: question
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})



// for delete a by its uuid
router.delete("/:id", async (req, res) => {


    const { id } = req.params;

    let data = {};

    try {

        const question = await questionService.deleteByKeyVal({ "uuid": id });

        data = {
            deleted: true,
            question: question
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})

module.exports = router;
