import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuiz } from "../services/quiz.service";
import { Avatar, List } from 'antd';
import icon from "../assets/quiz.png"
import { ArrowRightOutlined } from "@ant-design/icons";
import { getSession } from "../services/helper";

const Quiz = (props) => {

    const { added } = props

    const token = getSession("payload")
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getAllQuizHandler = async () => {
            const response = await getAllQuiz(token)
            const res = await response.json()
            setData(res.data.quizes)
        }

        getAllQuizHandler();
    }, [added]);
    return (


        <List
            dataSource={data}
            renderItem={(item) => (
                <List.Item onClick={() => navigate(`/quiz/${item.uuid}`)} >
                    <List.Item.Meta
                        avatar={<Avatar style={{ marginLeft: "10px", marginTop: "5px" }} src={icon} />}
                        title={<p style={{ cursor: "pointer" }} >{item.title}</p>}
                    />
                    <div>
                        <ArrowRightOutlined style={{ cursor: "pointer", marginRight: "20px" }} />
                    </div>
                </List.Item>
            )}
        />

    )
}

export default Quiz;