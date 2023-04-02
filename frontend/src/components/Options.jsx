import { CheckCircleTwoTone, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select , message} from "antd";
import React, { useEffect, useState } from "react";
import { createAnswer, getAllAnswers } from "../services/answer.service";
import { capitalizeFirstLetter } from "../services/helper";

const Options = (props) => {

    const { item, index } = props


    const [text, setText] = useState("")
    const [data, setData] = useState([])
    const [type, setType] = useState(false)

    const [visible, setVisible] = useState(false)
    const [added, setAdded] = useState(false)

    const addAnswerHalper = async () => {
        const payload = {
            title: text,
            questionId: item.uuid,
            isCorrect: type ?? false
        }
        const response = await createAnswer(payload)
        const res = await response.json();
        if (res.success) {
            success("Success")
            setAdded(!added)
        }
        if(!res.success) {
            error(res.error.message)
        }
        console.log(res)
    }

    const handleChange = (value) => {
        setType(value)
    };

    const [messageApi, contextHolder] = message.useMessage();

    const error = (msg) => {
        messageApi.open({
          type: 'error',
          content: msg,
        });
      };

      const success = (msg) => {
        messageApi.open({
          type: 'success',
          content: msg,
        });
      };

    useEffect(() => {

        const getAllAnswerHandler = async () => {
            const response = await getAllAnswers(item.uuid);
            const res = await response.json();
            // console.log(res, "asn")
            setData(res.data.answers)
        }

        getAllAnswerHandler()

    }, [added])


    return (
        <div style={{ marginBottom: "40px" }} >
            {contextHolder}
            <h4 style={{ fontSize: "15px" }} >Q.{index + 1} - {capitalizeFirstLetter(item.title)}</h4>
            <div style={{ marginLeft: "30px" }} >

                <Divider style={{ fontSize: "15px" }} orientation="left" orientationMargin="0">
                    Answers
                </Divider>
                {data.length == 0 && <p>No answers added yet.</p>}
                {
                    data.map((item, i) => {
                        return <p>{i + 1}.  {capitalizeFirstLetter(item.title)} {item.isCorrect && <CheckCircleTwoTone twoToneColor="#52c41a" />}</p>
                    })
                }

            </div>

            {

                visible && <> <div style={{ display: "flex", gap: "10px" , marginLeft : "30px"}} >
                <Input  style={{ width: "250px" }} placeholder="Add Answer Text" onChange={(e) => setText(e.currentTarget.value)} />
                <Select
                    defaultValue="Is Correct Answer"
                    style={{
                        width: 160,
                        
                    }}
                    onChange={handleChange}
                    options={[

                        {
                            value: true,
                            label: 'Yes',
                        },
                        {
                            value: false,
                            label: 'No',
                        }
                    ]}
                />
                <Button type="primary" style={{ background: "rgb(0, 34, 40)" }} onClick={() => addAnswerHalper()} >Add Answer</Button>
            </div> 
            
            </>
            

            }
            <Button style={{ marginLeft : "30px" , marginTop : "5px"}} onClick={() => setVisible(!visible)} >{visible ? <MinusOutlined /> : <PlusOutlined />}</Button>
        </div>

    )
}

export default Options;