import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/slices/auth';
import back from '../../assets/img/back.png';
import { fetchAuthMe } from '../../redux/slices/auth';
import axios from '../../axios';
import Error404 from './404';
import Error404_2 from './404_2';

export interface IShippingFields {
  email: string;
  password: string;
  gender: string;
  activity: string;
  fullName: string;
}

const Confidentiality: React.FC = () => {
  const [state, setState] = useState(false);
  const isAuth = useSelector<any>(selectIsAuth);
  const dispatch = useDispatch<any>();
  const userData = useSelector((state: any) => state.auth.data);
  const passwordHash = useSelector((state: any) => state.auth.data);
  const [loading1, setLoading1] = useState<boolean>(false); // загрузка

  const [email3, setEmail] = useState<any>(); // новая почта
  const [password1, setPassword] = useState<any>(); // пароль
  const [login, setLogin] = useState<any>(); // логин
  const [gender2, setGender] = useState<any>(); // пол
  const [activity2, setActivity] = useState<any>(); // деятельность
  const [changes1, setChanges1] = useState<boolean>(false); // изменения внесены
  const divYes = <div style={{ color: 'green' }}>Данные изменены!</div>;

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  let email2 = '';
  let name1 = '';
  let gender1 = '';
  let activity = '';
  let id = '';
  if (userData !== undefined && userData !== null) {
    email2 = userData.email;
    name1 = userData.fullName;
    gender1 = userData.gender;
    activity = userData.activity;
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
      email: email2, // дефолтное значение изначально. 18 минута
      password: '',
      gender: gender1,
      activity: activity,
      fullName: name1,
    },
  });

  // const onSubmit: SubmitHandler<IShippingFields> = async (values: any) => {
  //   // сохранение тоrена в localStorage
  //   const data = await dispatch(fetchRegister(values));
  //   if (!data.payload) {
  //     return alert('Не удалось изменить данные!');
  //   }
  //   if ('token' in data.payload) {
  //     window.localStorage.setItem('token', data.payload.token);
  //   }
  // };

  const onSubmit2: SubmitHandler<IShippingFields> = async () => {
    if (isAuth) {
      try {
        const fields = {
          email: email3 !== undefined ? email3 : email2,
          fullName: login !== undefined ? login : name1,
          gender: gender2 !== undefined ? gender2 : gender1,
          activity: activity2 !== undefined ? activity2 : activity,
        };
        console.log(fields);
        await axios.patch(`/personal/${id}`, fields);
        console.log('ОТПРАВЛЕНО!');
        setChanges1(true);
      } catch (err: any) {
        console.warn(err);
        console.warn('Ошибка при изменении данных!');
      }
    }
  };
  console.log(isAuth);

  return (
    <>
      {isAuth ? (
        <>
          <div className="container">
            <Link className="entrance__back1" to="/personalarea">
              <img className="entrance__back" src={back} alt="назад" />
              <p className="entrance__backtext">Личный кабинет</p>
            </Link>
            <div className="registration">
              <div className="entrance__name">Изменить личные данные</div>

              <form onSubmit={handleSubmit(onSubmit2)}>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="entrance__gender">
                  <h1 className="entrance__text2">Пол</h1>
                  <select
                    value={gender2}
                    {...register('gender', { required: 'Пожалуйста, выберите пол' })}
                    className="entrance__select"
                    id="gender-select"
                    onChange={(e) => setGender(e.target.value)}>
                    <option value="">Выбрать...</option>
                    <option value="gender male">Мужской</option>
                    <option value="gender female">Женский</option>
                  </select>
                </div>
                <div className="entrance__gender">
                  <h1 className="entrance__text2">Деятельность</h1>
                  <select
                    value={activity2}
                    {...register('activity', { required: 'Пожалуйста, выберите деятельность' })}
                    className="entrance__select"
                    id="activity-select"
                    onChange={(e) => setActivity(e.target.value)}>
                    <option value="">Выбрать...</option>
                    <option value="student">Студент</option>
                    <option value="designer">Дизайнер</option>
                    <option value="engineer">Инженер</option>
                    <option value="programmer">Программист</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div className="entrance__block1">
                  <button className="content__button2">Изменить данные</button>
                </div>
                <div className="entrance__block2">
                  {state && (
                    <div style={{ color: 'green' }} className="entrance__name">
                      Вы успешно изменили личные данные!
                    </div>
                  )}
                  {errors?.email && (
                    <div className="entrance__errorss" style={{ color: 'red' }}>
                      {errors.email.message}
                    </div>
                  )}
                  {changes1 ? divYes : null}
                  <br />
                  {errors?.password && (
                    <div style={{ color: 'red' }}>{errors.password.message}</div>
                  )}
                  <br />
                  {errors?.fullName && (
                    <div style={{ color: 'red' }}>{errors.fullName.message}</div>
                  )}
                  <br />
                  {errors?.gender && <div style={{ color: 'red' }}>{errors.gender.message}</div>}
                  <br />
                  {errors?.activity && (
                    <div style={{ color: 'red' }}>{errors.activity.message}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};
//   <Error404 />

export default Confidentiality;
