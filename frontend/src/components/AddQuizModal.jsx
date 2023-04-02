import { Button, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { getSession } from '../services/helper';
import { createQuiz } from '../services/quiz.service';

const AddQuiz = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const { added, setAdded } = props;
    const [quizName, setQuizName] = useState("");
    const token = getSession("payload")

    const addQuizHandler = async () => {
        const payload = {
            title: quizName
        }
        const response = await createQuiz(payload, token);
        const res = await response.json()
        console.log(res)
        if (res.success) {
            setAdded(!added)
            success("Success")
        }
        if (!res.success) {
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
        addQuizHandler();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
         {contextHolder}
            <Button style={{ marginTop: "12px", background: "rgb(0, 34, 40)" }} type="primary" onClick={showModal}>
                Create New Quiz!
            </Button>
            <Modal title="Create New Quiz!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="Quiz Name" onChange={(e) => setQuizName(e.currentTarget.value)} />
            </Modal>
        </>
    );
};
export default AddQuiz;