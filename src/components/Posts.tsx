import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import imgpost from '../assets/img/1.jpg';
import avatar_1 from '../assets/img/avatar_1.png';
import avatar_2 from '../assets/img/avatar_2.png';

import thumbup from '../assets/post/thumb-up.png';
import thumbdown from '../assets/post/thumb-down.png';

import thumbup2 from '../assets/post/thumb-up_2.png';
import thumbdown2 from '../assets/post/thumb-down_2.png';

import man from '../assets/post/man.png';
import styles from './Post.module.scss';
import axios from '../axios';
import Skeleton2 from '../components/Skeleton2';
// import { useContainerDimensions } from '../components/Utility/useContainerDimensions2';
import ReactMarkdown from 'react-markdown';
import Text from './Text';
import remarkGfm from 'remark-gfm';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';

interface PostData {
  likes: number;
  imageUrl: string;
  tags: string[];
  text: string;
  title: string;
  viewsCount: number;
  user: any;
  avatarUrl: string;
}

export const Posts: React.FC = () => {
  // window.scrollTo(0, 0);
  const [data1, setData] = useState<PostData | undefined>(); // пост и его все данные
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const componentRef = useRef<HTMLDivElement>(null); // поиск блока div для узнования текущего размера
  // const { width } = useContainerDimensions(componentRef); // вытаскивание текущей длины div

  const [text, setText] = useState<string>(''); // текст
  const [title, setTitle] = useState<any>(''); // Заголовок статьи
  const [tags, setTags] = useState<any>(''); // Тэги статьи
  const [categories, setCategory] = useState<any>(''); // выбранные категории
  const [imageUrl, setImagUrl] = useState<any>(''); // загрузка картинки
  const [viewscount, setViewscount] = useState<any>(''); // просмотры
  const [clicklike1, setClicklike] = useState<any>(); // клик по like
  const [dizlike1, setDizlikes] = useState<any>(); // клик по dizlike

  const isAuth = useSelector<any>(selectIsAuth);

  const [likes1, setLikes1] = useState<any>(null);
  const [click2, setClick2] = useState<boolean>(false); // like
  const [click3, setClick3] = useState<boolean>(false); // dezlike
  const [click4, setClick4] = useState<boolean>(false); // отправить комментарий

  const [comment1, setPcomment] = useState([]); // коментарий поста
  const refName = useRef<any>(null); // получение текста их textarea
  const userData = useSelector((state: any) => state.auth.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchAuthMe()); // Fetch user data on component mount
  }, []);

  // Получаем пост по id
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  // Likes
  const handleClick = () => {
    if (isAuth) {
      if (clicklike1 === false) {
        setLikes1(likes1 + 1);
        setClicklike(true);
        setDizlikes(false);
      } else {
        setLikes1(likes1 - 1);
        setClicklike(false);
      }

      if (clicklike1 === false && dizlike1 === true) {
        setLikes1(likes1 + 2);
        setClicklike(true);
      }
      setClick2(true);
    }
  };

  // Dezlikes
  const handleClick2 = () => {
    if (isAuth) {
      if (dizlike1 === false) {
        setClicklike(false);
        setLikes1(likes1 - 1);
        setDizlikes(true);
      } else {
        setLikes1(likes1 + 1);
        setDizlikes(false);
      }

      if (clicklike1 === true && dizlike1 === false) {
        setLikes1(likes1 - 2);
        setDizlikes(true);
      }
      setClick3(true);
    }
  };

  // кнопка "отправить" на backend
  const onSubmit = async () => {
    try {
      const likes = {
        title,
        text,
        tags,
        viewsCount: viewscount,
        likes: likes1,
        clicklikes: clicklike1,
        dizlikes: dizlike1,
      };
      await axios.patch(`/posts/${id}`, likes);
    } catch (err: any) {
      console.warn(err);
      console.warn('Ошибка при отправке на сервер!');
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImagUrl(data.imageUrl);
        setTags(data.tags.join(','));
        setCategory(data.categories);
        setViewscount(data.viewsCount);
        setLikes1(data.likes);
        setClicklike(data.clicklikes);
        setDizlikes(data.dizlikes);
      });
    }
  }, [id]);

  if (click2) {
    onSubmit();
  }

  if (click3) {
    onSubmit();
  }

  // Получить коментарии только этого поста
  useEffect(() => {
    axios
      .get(`/comment`)
      .then((res) => {
        setPcomment(res.data);
      })
      .catch((err) => {
        console.warn(err);
        console.warn('Ошибка при получении комментариев');
      });
  }, [click4, title]);

  let comentsPost = comment1.filter((element: any) => element.post === id);

  const onSubmit2 = async () => {
    // пользователь должен быть авторизован (isAuth) и сообщение должно быть заполнено (refName.current.value)
    if (isAuth && refName.current.value !== '') {
      let comments2 = {};

      try {
        comments2 = {
          comment: refName.current.value,
          post: id,
          user: userData._id,
          name: userData.fullName,
          avatarUrl: imageUrl,
        };

        await axios.post(`/comment`, comments2);
        setClick4(!click4); // обнавляем получение постов из базы данных
        refName.current.value = ''; // очищаем поле после отправки
      } catch (err: any) {
        console.warn(err);
        console.warn('Ошибка при отправке на сервер!');
      }
    }
  };

  const onClick1 = async () => {
    onSubmit2();
  };

  return (
    <>
      {isLoading === false && data1 !== undefined ? (
        <div className="container">
          <div className="posts">
            <div ref={componentRef} className="posts__blog">
              <h1 className="posts__title">{data1.title}</h1>
              <img
                className="posts__img1"
                src={`http://localhost:4444${data1.imageUrl}`}
                alt="картинка"
              />
            </div>
            <div className="posts__content">
              <div className="posts__likes">
                <p className="posts__num">{data1.viewsCount}</p>
                <p className="posts__num2"> просмотров </p>

                <img
                  onClick={handleClick}
                  className="posts__like"
                  src={clicklike1 ? thumbup2 : thumbup}
                  alt="like"
                />

                <p className="posts__num">{likes1}</p>
                <div className="posts__line1"></div>

                <img
                  onClick={handleClick2}
                  className="posts__like"
                  src={dizlike1 ? thumbdown2 : thumbdown}
                  alt="like"
                />
              </div>
              <hr className="posts__line" />

              <ReactMarkdown>{data1.text}</ReactMarkdown>
            </div>
            <div className="posts__coments">
              <h1 className="posts__name">Комментарии</h1>
              <br />
              <br />

              {comentsPost.map((element: any, index: number) => (
                <div key={index}>
                  <div className="posts__coment1">
                    <div className="posts__block1">
                      <img className="posts__avatar2" src={avatar_1} alt="avatar" />
                      <h1 className="posts__avatar">{element.name}</h1>
                    </div>
                    <p className="posts__textcom">{element.comment} </p>
                  </div>
                </div>
              ))}

              <div className="posts__write">
                <div className="posts__write2">
                  <img className="posts__avatar1" src={avatar_2} alt="avatar" />
                  <textarea
                    ref={refName}
                    className="posts__textarea"
                    placeholder="Написать сообщение"></textarea>
                </div>

                <div className="posts__div1">
                  <button onClick={onClick1} className="content__button">
                    отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        [...new Array(6)].map((_, index) => <Skeleton2 key={index} />)
      )}
    </>
  );
};

export default Posts;
