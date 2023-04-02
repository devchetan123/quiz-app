import { DesktopOutlined, DownOutlined, FileOutlined, PieChartOutlined, QuestionOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import AddQuestion from '../components/AddQuestionModal';
import AddQuiz from '../components/AddQuizModal';
import Quiz from '../components/Quizes';
import QuizPage from '../components/QuizPage';
import { clearSession, getSession } from '../services/helper';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const menuItem = [
    getItem('Quizes', 'quizes', <QuestionOutlined />),
    //   getItem('Option 2', '2', <DesktopOutlined />),
    //   getItem('Files', '9', <FileOutlined />),
];


const Main = () => {


    const [collapsed, setCollapsed] = useState(false);
    const [added, setAdded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const data = getSession("payload");
        if (!data) {
            navigate("/login")
        }
    }, [])



    const HomeComponent = () => {
        return (<>
            <AddQuiz added={added} setAdded={setAdded} />
            <div style={{ background: colorBgContainer, height: "100%", marginTop: "15px" }} >
                <Quiz added={added} />
            </div>
        </>
        )
    }

    const QuestionsComponent = () => {
        return (
            <>
                <AddQuestion added={added} setAdded={setAdded} />
                <div style={{ background: colorBgContainer, height: "100%", marginTop: "15px" }} >
                    <QuizPage />
                </div>
            </>
        )
    }

    const content = [
        { path: "", component: <HomeComponent /> },
        { path: "quiz", component: <QuestionsComponent /> },

    ];

    const menu = [
        { key: "quizes", path: `/` }
    ]

    const renderElement = () => {
        const currentPathName = location.pathname.split("/")
        currentPathName.shift();
        const ele = currentPathName[0]

        const find = content.find(item => item.path == ele)
        if (find) {
            if(find.path == ""){
                return getSession("payload") ? find.component : ""
            }
            return find.component;
        }
        else {
            navigate("/not-found")
        }
    }

    const navigater = (key) => {
        const find = menu.find(item => item.key == key)
        navigate(`${find.path}`)
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logoutHandler = () => {
        clearSession("payload")
        navigate("/login")
    }

    const items = [
        {
            label: <p onClick={() => logoutHandler()} >Logout</p>,
            key: '0',
        }
    ];

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider style={{ background: "rgba(1, 53, 62)" }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

                <img src={logo} style={{ display: "flex", height: "65px", width: "100%" }} />
                <Menu onClick={(e) => navigater(e.key)} style={{ background: "rgba(1, 53, 62)", marginTop: "5px", paddingRight: "2px" }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItem} />
            </Sider>
            <Layout className="site-layout">

                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a style={{ position: "absolute", right: "20px", top: "-3px" }} onClick={(e) => e.preventDefault()}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </a>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {renderElement()}

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Created by Chetan
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Main;