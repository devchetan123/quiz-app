const { Router } = require('express');
const { AnswerService } = require('../services/answers.service');
const { QuestionService } = require('../services/questions.service');
const { reqBodyAdder } = require('../utilities/common.service');
const { pagePayloadHelper, getUuid } = require('../utilities/helper.service');
const { error, http } = require('../utilities/response.service');
const router = Router();

const answerService = new AnswerService();
const questionService = new QuestionService();


// for add a new 
router.post("/", async (req, res) => {

    let data = {};

    try {

        const uuid = getUuid("A");

        const pagePayload = pagePayloadHelper(1, 1000000);

        const questionById = await questionService.getByKeyValue({ uuid: req.body.questionId })
        const allAnswers = await answerService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount, { questionId: questionById.uuid })
        if (questionById.type === 'single' && req.body.isCorrect === true) {
            const find = allAnswers.find(item => item.isCorrect == true)
            if (find) {
                throw new Error("Question type is single answer cannot select multiple correct answer")
            }
        }

        reqBodyAdder(req.body, { uuid });
        // this method is help to add key values in request body

        const answer = await answerService.create(req.body);
        // creating new if already exist also checking by this create method

        data = {
            answer: answer
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})

// for get all against questions
router.get('/question/:questionId', async (req, res) => {

    const { page, limit } = req.query;
    const { questionId } = req.params;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const answers = await answerService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount, { questionId: questionId });

        data = {
            answers: answers
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
});


// for get all 
router.get('/', async (req, res) => {

    const { page, limit } = req.query;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const answers = await answerService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount);

        data = {
            answers: answers
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
        const answer = await answerService.getByKeyValue({ "uuid": id });

        data = {
            answer: answer
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

        const answer = await answerService.updateByKeyVal({ "uuid": id }, req.body);

        data = {
            updated: true,
            answer: answer
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

        const answer = await answerService.deleteByKeyVal({ "uuid": id });

        data = {
            deleted: true,
            answer: answer
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})

module.exports = router;
