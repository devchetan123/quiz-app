import './App.css';
import { Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import Main from './layout/Main';
import { Result } from 'antd';
import UQuiz from './components/UQuiz';
import Login from './components/Login';
import Register from './components/Register';

const NotFound = () => {
  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."

  />
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/quiz/:quizId' element={<Main />} />
        <Route path='/complete/quiz/:quizId' element={<UQuiz />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
