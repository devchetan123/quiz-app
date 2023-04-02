import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  registerAPI } from '../services/auth.service';
import { getSession, setSession } from '../services/helper';
const Register = () => {

    const navigate  = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {

        const response = await registerAPI(values)
        const res = await response.json();

        if(res.success){
            success("Registered Success...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
        if(!res.success){
            error(res.error.message)
        }
    };

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
        const data = getSession("payload");
        if (data) {
            navigate("/")
        }
    }, [])


    return (
        <>
        {contextHolder}
       <div >
         <Card
            title={`Register`}
            bordered={true}
            style={{
                position : "absolute",
                top : "50%",
                left : "50%",
                transform : "translate(-50%, -50%)",
                width: 450,
                border : "1px solid lightgrey"

            }} >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="emailId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email Id" />
                </Form.Item>
                <Form.Item
                    name="mobileNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your mobile number!',
                        },
                    ]}
                >
                    <Input prefix={<MobileOutlined  className="site-form-item-icon" />} placeholder="Mobile Number" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button> &nbsp;
                    Or &nbsp;<a onClick={() => navigate("/login")}>login now!</a>
                </Form.Item>
            </Form>
        </Card>
       </div>
       </>
    );
};
export default Register;