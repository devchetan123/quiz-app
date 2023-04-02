const express = require("express");
const cors = require("cors")
const port = 3001;
const app = express();

const usersController = require("./controllers/users.controller");
const authController = require("./controllers/auth.controller");
const quizController = require("./controllers/quiz.controller");
const questionsController = require("./controllers/questions.controller");
const answersController = require("./controllers/answers.controller");

app.use(cors());
app.use(express.json());

app.use("/auth", authController);
app.use("/users", usersController);
app.use("/quizs", quizController);
app.use("/questions", questionsController);
app.use("/answers", answersController);


app.listen(port, async () => {

    try {
        console.log(`server running on ${port}`)
    }
    catch (err) {
        console.log("err ::", err);
    }

})

