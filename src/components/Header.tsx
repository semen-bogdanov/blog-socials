import React, { useEffect, useRef, useState } from 'react';
import logo1 from '../assets/Header/Neironka.png';
import { Link } from 'react-router-dom';
import burger from '../assets/Header/burger.png';
import cross from '../assets/Header/cross.png';
import { selectIsAuth, logout } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentClickClear } from '../redux/slices/filterSlice';

const Header: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const handleMouseEnter2 = () => setIsHovered2(true);
  const handleMouseLeave2 = () => setIsHovered2(false);

  const isAuth = useSelector<any>(selectIsAuth); // авторизован ли пользователь или нет
  const dispatch = useDispatch<any>();

  const [isSidebarShow, setIsSidebarShow] = useState(false); // Бургер меню
  const bodyButton = useRef<HTMLButtonElement>(null);
  const massiv: Array<string> = ['Home', 'Блог', 'Правила', 'Инженерия'];
  const href1: Array<string> = ['/', '/blog', '/rules', '/engineering'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bodyButton.current && !bodyButton.current.contains(event.target as Node)) {
        setIsSidebarShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBodyClick = () => {
    setIsSidebarShow(!isSidebarShow);
  };

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  // Очистка фильтра
  const onResetFiltering = () => {
    dispatch(setCurrentClickClear(true));
  };

  return (
    <>
      <header className="header">
        <div onClick={(e) => e.stopPropagation()}>
          <button onClick={handleBodyClick} className="nav__burger" ref={bodyButton}>
            <img className="nav__burgerimg" src={!isSidebarShow ? burger : cross} alt="burger" />
          </button>
        </div>
        <div className="container">
          {isAuth ? (
            <div className="header__inner">
              <Link
                to="/personalarea"
                className="header__in"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <svg
                  className="header__svg1"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 24"
                  fill={isHovered ? '#a6bdd7' : '#333333'}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 9.56757V14.4324C3.5 16.7258 3.5 17.8724 4.22162 18.5849C4.87718 19.2321 5.89572 19.2913 7.81827 19.2968C7.81303 19.262 7.80803 19.2271 7.80324 19.192C7.68837 18.3484 7.68839 17.2759 7.68841 15.9453L7.68841 15.8919C7.68841 15.4889 8.01933 15.1622 8.42754 15.1622C8.83575 15.1622 9.16667 15.4889 9.16667 15.8919C9.16667 17.2885 9.16824 18.2626 9.26832 18.9975C9.36554 19.7114 9.54337 20.0895 9.81613 20.3588C10.0889 20.6281 10.4718 20.8037 11.195 20.8996C11.9394 20.9985 12.926 21 14.3406 21H15.3261C16.7407 21 17.7273 20.9985 18.4717 20.8996C19.1948 20.8037 19.5778 20.6281 19.8505 20.3588C20.1233 20.0895 20.3011 19.7114 20.3983 18.9975C20.4984 18.2626 20.5 17.2885 20.5 15.8919V8.10811C20.5 6.71149 20.4984 5.73743 20.3983 5.0025C20.3011 4.28855 20.1233 3.91048 19.8505 3.6412C19.5778 3.37192 19.1948 3.19635 18.4717 3.10036C17.7273 3.00155 16.7407 3 15.3261 3H14.3406C12.926 3 11.9394 3.00155 11.195 3.10036C10.4718 3.19635 10.0889 3.37192 9.81613 3.6412C9.54337 3.91048 9.36554 4.28855 9.26832 5.0025C9.16824 5.73743 9.16667 6.71149 9.16667 8.10811C9.16667 8.51113 8.83575 8.83784 8.42754 8.83784C8.01933 8.83784 7.68841 8.51113 7.68841 8.10811L7.68841 8.05472C7.68839 6.72409 7.68837 5.65156 7.80324 4.80803C7.80803 4.77288 7.81303 4.73795 7.81827 4.70325C5.89572 4.70867 4.87718 4.76792 4.22162 5.41515C3.5 6.12759 3.5 7.27425 3.5 9.56757ZM13.385 14.9484L15.8487 12.516C16.1374 12.231 16.1374 11.769 15.8487 11.484L13.385 9.05157C13.0963 8.76659 12.6283 8.76659 12.3397 9.05157C12.051 9.33655 12.051 9.79859 12.3397 10.0836L13.5417 11.2703H6.45652C6.04831 11.2703 5.71739 11.597 5.71739 12C5.71739 12.403 6.04831 12.7297 6.45652 12.7297H13.5417L12.3397 13.9164C12.051 14.2014 12.051 14.6635 12.3397 14.9484C12.6283 15.2334 13.0963 15.2334 13.385 14.9484Z"
                  />
                </svg>
                Личный кабинет
              </Link>

              <Link
                to="/addpost"
                className="header__in"
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}>
                <svg
                  className="header__svg2"
                  fill={isHovered2 ? '#a6bdd7' : '#333333'}
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.093,1.293l-11.2,11.2a.99.99,0,0,0-.242.391l-1.6,4.8A1,1,0,0,0,5,19a1.014,1.014,0,0,0,.316-.051l4.8-1.6a1.006,1.006,0,0,0,.391-.242l11.2-11.2a1,1,0,0,0,0-1.414l-3.2-3.2A1,1,0,0,0,17.093,1.293ZM9.26,15.526l-2.679.893.893-2.679L17.8,3.414,19.586,5.2ZM3,21H20a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2Z" />
                </svg>
                написать статью
              </Link>
              <Link onClick={onClickLogout} to="/" className="header__in2">
                выход
              </Link>
            </div>
          ) : (
            <div className="header__inner">
              <Link to="/entrance" className="header__in2">
                вход
              </Link>
              <Link to="/registration" className="header__in3">
                РЕГИСТРАЦИЯ
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="container">
        <nav className="header__nav">
          <div className="header__blog1">
            <Link to="/" onClick={() => onResetFiltering()}>
              <img className="header__logo" src={logo1} alt="Нейронка" />
            </Link>
          </div>
          <div className="header__nav2">
            {massiv.map((element: string, index: number) => (
              <Link key={index} to={href1[index]} className="header__menu1">
                {element}
              </Link>
            ))}
          </div>
        </nav>

        <div
          className="nav__burgerMenu"
          style={{ width: !isSidebarShow ? '0%' : '150px' }}
          onClick={(e) => e.stopPropagation()}>
          {/* Навигация бургер меню */}
          <div className="nav__display" style={{ opacity: !isSidebarShow ? '0' : '1' }}>
            <nav className="nav__nav2">
              <div className="nav__navigation2">
                {massiv.map((element: string, index: number) => (
                  <Link key={index} to={href1[index]} className="nav__menu">
                    {element}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
