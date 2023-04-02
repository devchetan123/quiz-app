import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Config } from '../config';
const ShareModal = () => {

    const config = new Config("dev");
    const envDetails = config.getConfig();

    const { quizId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button style={{marginBottom : "20px"}} type="primary" onClick={showModal}>
                Share link of this quiz
            </Button>
            <Modal title="Share quiz link" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Link  style={{ marginTop: "20px",borderRadius : "5px",border : "2px dotted grey", padding : "5px", fontSize : "13px" }} to={`/complete/quiz/${quizId}`}>{`${envDetails.baseUrl}/complete/quiz/${quizId}`}</Link>
            </Modal>
        </>
    );
};
export default ShareModal;