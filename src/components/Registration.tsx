import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../redux/slices/auth';

export interface IShippingFields {
  email: string;
  password: string;
  gender: string;
  activity: string;
  fullName: string;
}

const Registration: React.FC = () => {
  const [state, setState] = useState(false);
  const isAuth = useSelector<any>(selectIsAuth);
  const dispatch = useDispatch<any>();
  const {
    register, // базовое подключение. Работает только с input
    handleSubmit,
    formState: { errors }, // 10:20 и 22:30 выводит ошибки
    reset, // сброс, чтобы потом что то вводить. resetField('name) сброс конкретного поля name
  } = useForm<IShippingFields>({
    defaultValues: {
      email: '', // дефолтное значение изначально. 18 минута
      password: '',
      gender: '',
      activity: '',
      fullName: '',
    },
  });

  const onSubmit: SubmitHandler<IShippingFields> = async (values: any) => {
    // сохранение тоrена в localStorage
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container">
        <div className="registration">
          <div className="entrance__name">Регистрация</div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="entrance__login">
              <h1 className="entrance__text1">Почта</h1>
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
              />
            </div>
            <div className="entrance__password">
              <h1 className="entrance__text">Пароль</h1>
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
            <div className="entrance__password">
              <h1 className="entrance__text">Логин</h1>
              <input
                {...register('fullName', {
                  required: `Логин обязательное поле!`, // если ничего не ввели, то включаеться валидация 10:00
                })}
                className="entrance__input1"
                minLength={3}
                placeholder="Имя"
                required
              />
            </div>
            <div className="entrance__gender">
              <h1 className="entrance__text2">Пол</h1>
              <select
                {...register('gender', { required: 'Пожалуйста, выберите пол' })}
                className="entrance__select"
                id="gender-select">
                <option value="">Выбрать...</option>
                <option value="gender male">Мужской</option>
                <option value="gender female">Женский</option>
              </select>
            </div>
            <div className="entrance__gender">
              <h1 className="entrance__text2">Деятельность</h1>
              <select
                {...register('activity', { required: 'Пожалуйста, выберите деятельность' })}
                className="entrance__select"
                id="activity-select">
                <option value="">Выбрать...</option>
                <option value="student">Студент</option>
                <option value="designer">Дизайнер</option>
                <option value="engineer">Инженер</option>
                <option value="programmer">Программист</option>
                <option value="other">Другое</option>
              </select>
            </div>
            <div className="entrance__block1">
              <button className="content__button2">регистрация</button>
            </div>
            <div className="entrance__block2">
              {state && (
                <div style={{ color: 'green' }} className="entrance__name">
                  Вы успешно зарегистрировались!
                </div>
              )}
              {errors?.email && (
                <div className="entrance__errorss" style={{ color: 'red' }}>
                  {errors.email.message}
                </div>
              )}
              <br />
              {errors?.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
              <br />
              {errors?.fullName && <div style={{ color: 'red' }}>{errors.fullName.message}</div>}
              <br />
              {errors?.gender && <div style={{ color: 'red' }}>{errors.gender.message}</div>}
              <br />
              {errors?.activity && <div style={{ color: 'red' }}>{errors.activity.message}</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
