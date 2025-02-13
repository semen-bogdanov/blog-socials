import './App.css';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Posts from './components/Posts';
import Entrance from './components/Entrance';
import Registration1 from './components/Registration';
import AddPost from './components/AddPost/AddPost';
import PersonalArea from './components/Area/PersonalArea';
import Confidentiality from './components/Area/Confidentiality';
import Error404 from './components/Area/404';
import Error404_2 from './components/Area/404_2';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import Editor from './components/Area/Editor';
import Change from './components/Area/Change';

function App() {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/entrance" element={<Entrance />} />
          <Route path="/registration" element={<Registration1 />} />
          {/*  написать статью */}
          <Route path="/addpost" element={<AddPost />} />
          {/*  личный кабинет */}
          <Route path="/personalarea" element={<PersonalArea />} />
          {/* изменить личные данные */}
          <Route path="/personal" element={<Confidentiality />} />
          {/* Изменить пароль*/}
          <Route path="/change" element={<Change />} />
          {/* Опубликованные статьи */}
          <Route path="/editor" element={<Editor />} />
          <Route path="*" element={<Error404_2 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
