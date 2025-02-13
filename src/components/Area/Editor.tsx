import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/img/back.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../../redux/slices/auth';
import { fetchPosts, fetchRemovePost } from '../../redux/slices/posts';
import { selectIsAuth } from '../../redux/slices/auth';
import Error404 from './404';
import Skeleton4 from '../Skeletons/Skeleton4';
import axios from '../../axios';

const Editor: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { data } = useSelector((state: any) => state.auth);
  const { posts } = useSelector((state: any) => state.posts);
  const isAuth = useSelector<any>(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchPosts());
  }, []);

  let massiv: any = [];

  if (
    data !== undefined &&
    data !== null &&
    posts.items !== undefined &&
    posts.items !== null &&
    posts.items.length > 0
  ) {
    massiv = posts.items.filter((element: any) => element.user._id === data._id);
    console.log(massiv);
  } else {
    console.log('Загрузка...');
  }

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/comment/${id}`);
    } catch (err: any) {
      console.warn(err);
      console.warn('Ошибка при отправке на сервер!');
    }
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id)); // удаление поста
      onDelete(id); // удаление клмментария
    }
  };

  return (
    <>
      {isAuth ? (
        <>
          <div className="container">
            <div className="entrance__inner">
              <Link className="entrance__back1" to="/personalarea">
                <img className="entrance__back" src={back} alt="назад" />
                <p className="entrance__backtext">Личный кабинет</p>
              </Link>
              {massiv.length === 0 ? (
                <h1 className="personalarea__name">Нет статей</h1>
              ) : (
                <h1 className="personalarea__name">Опубликованные статьи</h1>
              )}
              <div className="entrance__posts">
                {massiv.length === 0
                  ? [...new Array(3)].map((_, index) => <Skeleton4 key={index} />)
                  : massiv.map((element: any, index: number) => (
                      <div key={index} className="entrance__post">
                        <Link to={`/posts/${element._id}`}>
                          <h1 className="entrance__title3">№ {index + 1}</h1>
                        </Link>
                        <Link to={`/posts/${element._id}`}>
                          <h1 className="entrance__title">{element.title}</h1>
                        </Link>
                        <Link className="entrance__imageurl" to={`/posts/${element._id}`}>
                          <img
                            src={`http://localhost:4444${element.imageUrl}`}
                            alt="картинка поста"
                          />
                        </Link>
                        <Link to={`/posts/${element._id}/edit`}>
                          <h3 className="entrance__title2">Отредактировать статью</h3>
                        </Link>
                        <h3
                          onClick={() => handleDeleteClick(element._id)}
                          className={`${'entrance__title'} ${'entrance__mod1'} `}>
                          Удалить статью
                        </h3>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};
//  onClick={setStates(element._id)}
export default Editor;
