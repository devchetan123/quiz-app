import { SmileOutlined } from "@ant-design/icons";
import { Card, Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../services/helper";
import { getCompleteQuiz } from "../services/quiz.service";


const UQuiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizData, setQuizData] = useState([])

    const { quizId } = useParams()

    const handleAnswerButtonClick = (answer) => {
        if (quizData[currentQuestion].answerType === 'single') {
            setSelectedAnswers([answer]);
        } else {
            const updatedAnswers = selectedAnswers.includes(answer)
                ? selectedAnswers.filter((a) => a !== answer)
                : [...selectedAnswers, answer];
            setSelectedAnswers(updatedAnswers);
        }
    };

    const handleNextButtonClick = () => {
        const isCorrect = quizData[currentQuestion].answerType === 'single'
            ? selectedAnswers[0] === quizData[currentQuestion].answer
            : selectedAnswers.length === quizData[currentQuestion].answer.length
            && selectedAnswers.every((a) => quizData[currentQuestion].answer.includes(a));
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswers([]);
        } else {
            setShowScore(true);
        }
    };

    const convertData = (questions) => {

        const result = []

        for (let i = 0; i < questions.length; i++) {
            const item = questions[i];
            const options = [];
            const answer = [];
            for (let j = 0; j < item.answers.length; j++) {
                const ele = item.answers[j]
                options.push(ele.answerTitle)
                if (ele.isCorrect) {
                    answer.push(ele.answerTitle)
                }
            }

            const obj = { question: item.questionTitle, options: options, answerType: item.questionType, answer: item.questionType == "single" ? answer[0] : answer }
            result.push(obj)
        }

        return result

    }

    const getCompleteData = async () => {
        const response = await getCompleteQuiz(quizId);
        const res = await response.json();

        const mainData = convertData(res.data.questions);
        setQuizData(mainData)
    }

    useEffect(() => {
        getCompleteData();
    }, [])


    return (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >
            {showScore ?
                <div >
                    <Result
                        icon={<SmileOutlined />}
                        title="Great, we have done all the operations!"
                        extra={ <h2>You scored {score} out of {quizData?.length}</h2>}
                    />
                </div> : <Card
                title={`Question ${currentQuestion + 1}/${quizData?.length}`}
                bordered={true}
                style={{
                    width: 500
                }}
            >

                <div style={{  marginBottom: "35px" }} >
                    <h2 style={{ fontSize: "18px" }} >{quizData[currentQuestion]?.question[0].toUpperCase() + quizData[currentQuestion]?.question.slice(1)}</h2>
                    {quizData[currentQuestion]?.answerType == 'single' ? <p>Choice : Single</p> : <p>Choice : Multiple</p>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} >
                    {quizData[currentQuestion]?.options.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleAnswerButtonClick(option)}
                            style={{ border: selectedAnswers.includes(option) ? "solid 2px blue" : "solid 2px lightgrey" }}
                        >
                            {capitalizeFirstLetter(option)}
                        </Button>
                    ))}
                </div>

                <Button style={{ width: "100%", marginTop: "15px", position: "relative", left: "50%", transform: "translate(-50%)" }} type="primary" onClick={handleNextButtonClick}>Next</Button>

            </Card>
            }
        </div>
    );
}

export default UQuiz;