const { Router } = require('express');
const { db } = require('../db/connection');
const authenticater = require('../middleware/authenticate.middleware');
const { QuizsService } = require('../services/quizs.service');
const { reqBodyAdder } = require('../utilities/common.service');
const { pagePayloadHelper, getUuid } = require('../utilities/helper.service');
const { error, http } = require('../utilities/response.service');
const router = Router();

const quizsService = new QuizsService();

// for add a new 
router.post("/", authenticater, async (req, res) => {

    let data = {};

    try {

        if (!req.body.title) throw new Error("Quiz text missiong!");

        const uuid = getUuid("Q");
        const userId = req.user.uuid;

        reqBodyAdder(req.body, { uuid, userId });
        // this method is help to add key values in request body

        const quiz = await quizsService.create(req.body);
        // creating new if already exist also checking by this create method

        data = {
            quiz: quiz
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})


// for get all 
router.get('/', authenticater, async (req, res) => {

    const { page, limit } = req.query;

    const pagePayload = pagePayloadHelper(page, limit);
    // calculating page skipping and limit

    let data = {};

    try {
        const quizes = await quizsService.getAllByKeyVal(pagePayload.skipCount, pagePayload.payloadCount, { userId: req.user.uuid });

        data = {
            quizes: quizes
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
});

router.get("/complete/:quizId", async (req, res) => {

    const { quizId } = req.params;

    const query = `SELECT q."uuid" as quizId, q."title" as quizTitle, 
    qu."uuid" as questionId, qu."title" as questionTitle, qu."type" as questionType, 
    a."uuid" as answerId, a."title" as answerTitle, a."isCorrect"
FROM "Quizs" q
FULL JOIN "Questions" qu ON q."uuid" = qu."quizId"
FULL JOIN "Answers" a ON qu."uuid" = a."questionId"
`
    const result = await db.query(query);

    const quizIds = new Set(result.rows.map(item => item.quizid));
    const allQuizIds = [...quizIds];

    const questionIds = new Set(result.rows.map(item => item.questionid));
    const allQuestionIds = [...questionIds];

    const findElement = (array, searchBy, searchTo) => {
        const find = array.find(x => x[searchTo] == searchBy)
        return find;
    }

    const finalRes = []

    for (let q = 0; q < allQuizIds.length; q++) {

        let quizItem = allQuizIds[q]
        const questions = []

        for (let i = 0; i < allQuestionIds.length; i++) {
            let ele = allQuestionIds[i]
            let answers = []

            for (let j = 0; j < result.rows.length; j++) {
                let item = result.rows[j]
                if (item.questionid == ele) {
                    let obj = {
                        answerId: item.answerid,
                        answerTitle: item.answertitle,
                        isCorrect: item.isCorrect
                    }
                    answers.push(obj)
                }
                const questionTitle = findElement(result.rows, ele, "questionid")
                let o = {
                    questionId: ele,
                    questionTitle: questionTitle.questiontitle,
                    questionType : questionTitle.questiontype,
                    answers: answers
                }

                let find = questions.find(item => item.questionId == ele)

                if (!find) {
                    if (questionTitle.quizid === quizItem) {
                        questions.push(o);
                    }
                }

            }
        }

        const quizTitle = findElement(result.rows, quizItem, "quizid")

        let quizes = {
            quizId: quizItem,
            quizTitle: quizTitle.quiztitle,
            questions: questions
        }

        let findQuiz = finalRes.find(item => item.quizId === quizItem)
        if (!findQuiz) {
            finalRes.push(quizes);
        }

    }

    const findByQuizId = finalRes.find(ele => ele.quizId == quizId)

    const response = http(req, findByQuizId);
    res.status(response.statusCode).json(response);

})

// get specific by uuid
router.get("/:id", async (req, res) => {

    const { id } = req.params;

    let data = {};

    try {
        const quiz = await quizsService.getByKeyValue({ "uuid": id });

        data = {
            quiz: quiz
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

        const quiz = await quizsService.updateByKeyVal({ "uuid": id }, req.body);

        data = {
            updated: true,
            quiz: quiz
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

        const quiz = await quizsService.deleteByKeyVal({ "uuid": id });

        data = {
            deleted: true,
            quiz: quiz
        }

    } catch (err) {
        data = error(err, err.message);
    }

    const response = http(req, data);
    res.status(response.statusCode).json(response);
})

module.exports = router;
