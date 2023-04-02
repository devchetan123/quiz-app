import { Button, Input, Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createQuestion } from '../services/question.service';

const AddQuestion = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { added, setAdded } = props;
    const [questionText, setQuestionText] = useState("");
    const [type, setType] = useState("")

    const { quizId } = useParams();

    const addQuestionHandler = async () => {
        const payload = {
            title: questionText,
            type : type ? type : 'single',
            quizId : quizId
        }
        const response = await createQuestion(payload);
        const res = await response.json()
        if (res.success) {
            setAdded(!added)
            success("Success")
        }
        if(!res.success){
            error(res.error.message)
        }
    }

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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        addQuestionHandler();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        setType(value)
    };
    return (
        <>
        {contextHolder}
            <Button style={{ marginTop: "12px", background: "rgb(0, 34, 40)" }} type="primary" onClick={showModal}>
                Add New Question!
            </Button>
            <Modal title="Add New Question" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input style={{marginBottom : "10px"}} placeholder="Question Text" onChange={(e) => setQuestionText(e.currentTarget.value)} />
                <Select
                    defaultValue="Question Type"
                    style={{
                        width: 150,
                    }}
                    onChange={handleChange}
                    options={[

                        {
                            value: 'single',
                            label: 'Single Answer',
                        },
                        {
                            value: 'multiple',
                            label: 'Multiple Answer',
                        }
                    ]}
                />
            </Modal>
        </>
    );
};
export default AddQuestion;