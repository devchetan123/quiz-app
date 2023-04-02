import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuestionsAPI } from "../services/question.service";
import Options from "./Options";
import ShareModal from "./ShareModal";

const QuizPage = () => {

    const { quizId } = useParams()
    const [data, setData] = useState([]);


    useEffect(() => {
        const getAllQuestions = async () => {
            const response = await getAllQuestionsAPI(quizId);
            const res = await response.json();
            setData(res.data.questions)
        }

        getAllQuestions()
    }, [])

    return (
        <>
            <div style={{ padding: "5px 0px 0px 25px" }} >

                <Divider style={{ fontSize: "20px" }} orientation="left" plain>
                    All Questions
                </Divider>

                {data.length == 0 && <p>No questions added yet.</p>}
                {
                    data.map((item, index) => {
                        return <Options item={item} index={index} />
                    })
                }
                {data.length > 0 && <ShareModal/>}

            </div>
        </>
    )
}

export default QuizPage;