import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';

export interface IShippingFields {
  email: string;
  password: string;
}

const Entrance: React.FC = () => {
  const isAuth = useSelector<any>(selectIsAuth); // авторизован ли пользователь или нет
  const dispatch = useDispatch<any>();

  const {
    register, // базовое подключение. Работает только с input
    handleSubmit,
    formState: { errors }, // 10:20 и 22:30 выводит ошибки
    reset, // сброс, чтобы потом что то вводить. resetField('name) сброс конкретного поля name
  } = useForm<IShippingFields>({
    defaultValues: {
      email: '', // дефолтное значение изначально. 18 минута
    },
  });

  // Функция будет выполняться в том случаи, если валидация прошла корректно
  const onSubmit: SubmitHandler<IShippingFields> = async (values: any) => {
    // сохранение токена в localStorage
    const data = await dispatch(fetchAuth(values));
    console.log(data);
    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      // reset();
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container">
        <div className="entrance">
          <div className="entrance__name">Вход в личный кабинет</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="entrance__login">
              <h1 className="entrance__text1">Почта:</h1>

              <input
                className="entrance__input1"
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
                // size={30}
                // required
              />
            </div>
            <div className="entrance__password">
              <h1 className="entrance__text">Пароль:</h1>
              <input
                {...register('password', {
                  required: `Пароль обязательное поле!`, // если ничего не ввели, то включаеться валидация 10:00
                })}
                className="entrance__input1"
                type="password"
                minLength={6}
                placeholder="Пароль"
                required
              />
            </div>
            <div className="entrance__block1">
              <button className="content__button2">продолжить</button>
            </div>
            <div className="entrance__block2">
              {errors?.email && (
                <div className="entrance__errorss" style={{ color: 'red' }}>
                  {errors.email.message}
                </div>
              )}
              <br />
              {errors?.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Entrance;
