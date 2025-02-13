import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import PersonalArea1 from '../../assets/img/PersonalArea.jpg';
import Skeleton3 from '../Skeletons/Skeleton3';
import Error404 from './404';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

const PersonalArea: React.FC = () => {
  // Создание состояния для хранения состояния загрузки
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);
  const isAuth = useSelector<any>(selectIsAuth);

  return (
    <>
      {isAuth ? (
        <>
          <img
            style={{ display: 'none' }}
            src={PersonalArea1}
            onLoad={() => setImageLoaded(false)}
          />

          <div className="container">
            <div className="personalarea__flex">
              <div className="personalarea__inner">
                <h1 className="personalarea__name">Личный кабинет</h1>
                <div className="personalarea__div">
                  <Link className="personalarea__button" to="/editor">
                    Редактировать посты
                  </Link>
                  <Link className="personalarea__button" to="/personal">
                    Изменить личные данные
                  </Link>
                  <Link className="personalarea__button" to="/change">
                    Изменить пароль
                  </Link>
                </div>
              </div>
              <div>
                {imageLoaded ? (
                  <Skeleton3 width={820} />
                ) : (
                  <img className="personalarea__block" src={PersonalArea1} alt="личный кабинет" />
                )}
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

export default PersonalArea;
