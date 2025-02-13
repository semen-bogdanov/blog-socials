import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import back from '../../assets/img/back.png';
import Error404 from './404';
import { selectIsAuth, logout, fetchAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';

export interface IShippingFields {
  email: string;
  password: string;
  password2: string;
}

const Change: React.FC = () => {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector<any>(selectIsAuth);
  const userData = useSelector((state: any) => state.auth.data);
  const [loading1, setLoading1] = useState<boolean>(false); // переключатель
  const [password2, setPassword2] = useState<any>(); // новый пароль
  const [state, setState] = useState(false); // надпись после изменения на новый пароль

  let email1 = '';
  let password1 = '';
  let id = '';
  if (userData !== undefined && userData !== null) {
    email1 = userData.email;
    password1 = userData.password;
    id = userData._id;
  } else {
    console.log('Загрузка...');
  }

  const {
    register, // базовое подключение. Работает только с input
    handleSubmit,
    formState: { errors }, // 10:20 и 22:30 выводит ошибки
    reset, // сброс, чтобы потом что то вводить. resetField('name) сброс конкретного поля name
  } = useForm<IShippingFields>({
    defaultValues: {
      email: email1, // дефолтное значение изначально. 18 минута
      password: password1,
      password2: '',
    },
  });

  // Функция будет выполняться в том случаи, если валидация прошла корректно
  const onSubmit: SubmitHandler<IShippingFields> = async (values: any) => {
    const data = await dispatch(fetchAuth(values));
    if (data.payload?.token) {
      window.localStorage.setItem('token', data.payload.token);
      setLoading1(true);
    } else {
      alert('Не правильный логин или пароль! Не удалось авторизоваться! ');
      console.error('Не удалось авторизоваться!');
      window.location.reload();
    }
  };

  const onSubmit2 = async () => {
    if (isAuth) {
      try {
        const fields = {
          password: password2,
        };
        console.log(fields);
        await axios.patch(`/cabinet/${id}`, fields);
        console.log('ОТПРАВЛЕНО!');
        setState(true);
      } catch (err: any) {
        console.warn(err);
        console.warn('Ошибка при изменении данных!');
      }
    }
  };

  // console.log(userData);

  return (
    <>
      {isAuth ? (
        <>
          {loading1 ? (
            <div className="container">
              <div className="registration">
                <h1 className="entrance__name2">Введите новый пароль</h1>
                <div className="entrance__password">
                  <h1 className="entrance__text">Новый пароль</h1>
                  <input
                    {...register('password2', {
                      required: `Пароль обязательное поле!`, // если ничего не ввели, то включаеться валидация 10:00
                    })}
                    className="entrance__input2"
                    type="password"
                    minLength={6}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Пароль"
                    required
                  />
                </div>
                <div className="entrance__block1">
                  <button onClick={onSubmit2} className="content__button2">
                    Изменить на новый пароль
                  </button>
                </div>
                {state && (
                  <div style={{ color: 'green' }} className="entrance__name">
                    Вы успешно изменили пароль!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="container">
              <Link className="entrance__back1" to="/personalarea">
                <img className="entrance__back" src={back} alt="назад" />
                <p className="entrance__backtext">Личный кабинет</p>
              </Link>
              <div className="registration">
                <div className="entrance__name2">Введите сначала текущую почту и пароль</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="entrance__login">
                    <h1
                      className="entrance__text1"
                      style={loading1 ? { opacity: 0.2 } : { opacity: 1 }}>
                      Почта
                    </h1>
                    <input
                      className="entrance__input2"
                      {...register('email', {
                        required: `Email обязательное поле!`, // если ничего не ввели, то включаеться валидация 10:00
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: `Пожалуйста введите правильно email`,
                        },
                      })}
                      type="email"
                      placeholder="Почта"
                      disabled={loading1 ? true : false}
                      style={loading1 ? { opacity: 0.2 } : { opacity: 1 }}
                    />
                  </div>
                  <div className="entrance__password">
                    <h1
                      className="entrance__text"
                      style={loading1 ? { opacity: 0.2 } : { opacity: 1 }}>
                      Текущий пароль
                    </h1>
                    <input
                      {...register('password', {
                        required: `Пароль обязательное поле!`, // если ничего не ввели, то включаеться валидация 10:00
                      })}
                      className="entrance__input2"
                      type="password"
                      minLength={6}
                      placeholder="Пароль"
                      disabled={loading1 ? true : false}
                      style={loading1 ? { opacity: 0.2 } : { opacity: 1 }}
                      required
                    />
                  </div>
                  <div className="entrance__block1">
                    <button className="content__button2">Текущая почта и пароль</button>
                  </div>
                  <div className="entrance__block2">
                    {errors?.email && (
                      <div className="entrance__errorss" style={{ color: 'red' }}>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default Change;
