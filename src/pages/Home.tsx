import React, { useEffect, useRef, useState } from 'react';
import banner from '../assets/Header/Banner_2.jpg';
// import imgpost from '../assets/img/1.jpg';
import Post from '../components/Post';
import { Filter } from '../components/Filter';
import filter from '../assets/Header/filter.png';
import cross2 from '../assets/Header/cross2.png';
// import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';
import { Pagination } from '../components/Pagination';
import {
  selectCurrentTagsclick,
  selectCurrentSearch,
  selectCurrentSearchclick,
  setCurrentPage,
  selectCurrentPage,
  selectCurrentCategories,
  selectCurrentCatclick,
  selectCurrentTags,
} from '../redux/slices/filterSlice';
import Skeleton from '../components/Skeleton';
import { useContainerDimensions } from '../components/Utility/useContainerDimensions';
import { massivImg } from '../components/Slider_1/DataSlider_1';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home: React.FC = () => {
  // настройки слайдера
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
          appendDots: (dots: any) => (
            <div
              style={{
                bottom: '0px',
                top: '90%',
                opacity: '1',
              }}>
              <ul
                style={{
                  margin: '0px',
                }}>
                {' '}
                {dots}{' '}
              </ul>
            </div>
          ),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const componentRef = useRef<HTMLDivElement>(null); // поиск блока div для узнования текущего размера
  const { width } = useContainerDimensions(componentRef); // вытаскивание текущей длины div
  const [close, setClose] = useState<boolean>(false); // close

  const dispatch = useDispatch<any>();
  const { posts } = useSelector((state: any) => state.posts);
  const [postsPerPage] = useState(5); //! Количество постов на странице
  const currentPage = useSelector(selectCurrentPage);

  const selectCurrentCategories1 = useSelector(selectCurrentCategories); // выбранные категории
  const selectCurrentCatclik1 = useSelector(selectCurrentCatclick); // выбранные категории
  const selectCurrentTags1 = useSelector(selectCurrentTags); // выбранные теги
  const selectCurrentTagclik1 = useSelector(selectCurrentTagsclick); // выбранные категории
  const selectCurrentSearch1 = useSelector(selectCurrentSearch); // поиск по сайту
  const selectCurrentSearchclick1 = useSelector(selectCurrentSearchclick); // поиск по сайту - false/true

  // КАТЕГОРИИ EN
  const categoryNameEn = ['numbersc', `technologies`, `earth`, `sea`, `sky`, `shield`];

  // Получение текущих постов. Пагинация
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let reversedPosts = posts.items.slice().reverse(); // развернуть массив чтобы новые посты появлялись в началае, а не в конце

  // фильтрация при выборе категории
  let reversedPosts2 = reversedPosts;
  if (selectCurrentCatclik1) {
    reversedPosts2 = reversedPosts.filter(
      (element: any) => element.categories === categoryNameEn[selectCurrentCategories1],
    );
  }

  // фильтрация при выборе тегов
  if (selectCurrentTagclik1) {
    reversedPosts2 = reversedPosts.filter((element1: any) => {
      if (element1.tags[0] === selectCurrentTags1) {
        return element1;
      }
      if (element1.tags[1] === selectCurrentTags1) {
        return element1;
      }
      if (element1.tags[2] === selectCurrentTags1) {
        return element1;
      }
    });
  }

  // поиск по сайту
  if (selectCurrentSearchclick1) {
    reversedPosts2 = reversedPosts.filter(
      (element: any) =>
        element.title.toLowerCase().includes(selectCurrentSearch1.toLowerCase()) ||
        element.text.toLowerCase().includes(selectCurrentSearch1.toLowerCase()),
    );
  }

  let currentPosts: any = reversedPosts2.slice(indexOfFirstPost, indexOfLastPost);

  // Пагинация
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const [isSidebarShow, setIsSidebarShow] = useState(false); // Бургер фильтер
  const bodyButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bodyButton.current && !bodyButton.current.contains(event.target as Node)) {
        setIsSidebarShow(false);
      }
    };
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Бургер фильтер
  const handleBodyClick = () => {
    setIsSidebarShow(!isSidebarShow);
  };

  return (
    <div className="header">
      {isSidebarShow ? (
        <></>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          <button onClick={handleBodyClick} className="nav__burger2" ref={bodyButton}>
            <img className="nav__burgerimg4" src={filter} alt="burger" />
          </button>
        </div>
      )}

      {isSidebarShow ? (
        <div className="nav__burgerMenu4" style={{ width: !isSidebarShow ? '0%' : '500px' }}>
          <div className="Filter__absolute">
            <div style={close ? { display: 'none' } : { display: 'block' }}>
              <div onClick={() => setClose(true)} className="Filter__close">
                ЗАКРЫТЬ ФИЛЬТР
              </div>
              <Filter />
            </div>
          </div>
        </div>
      ) : (
        <>
          {' '}
          <div className="header__banner">
            <div className="slider__container">
              <Slider {...settings}>
                {massivImg.map((obj: any, index: number) => (
                  <img key={index} className="header__banner1" src={obj.img} alt="Баннер" />
                ))}
              </Slider>
            </div>
          </div>
          <div className="container">
            <div className="header__blogcont">
              <div ref={componentRef} className="posts1">
                {reversedPosts2.length === 0 &&
                (selectCurrentCatclik1 === true || selectCurrentSearchclick1 === true) ? (
                  <div className="content__postnew">Ничего не найдено!</div>
                ) : (
                  <></>
                )}
                {currentPosts.length === 0
                  ? [...new Array(postsPerPage)].map((_, index) => (
                      <Skeleton key={index} width={width} />
                    ))
                  : currentPosts.map((obj: any, index: number) => (
                      <Post
                        key={index}
                        id={obj._id}
                        title={obj.title}
                        imageUrl={
                          obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : obj.imageUrl
                        }
                        user={obj.user}
                        tags={obj.tags}
                        text={obj.text}
                      />
                    ))}
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  fullnum={reversedPosts2.length}
                  postsPerPage={postsPerPage}
                />
              </div>
              <div className="header__filter2">
                <Filter />
              </div>
            </div>
            <div className="header__pagination"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
