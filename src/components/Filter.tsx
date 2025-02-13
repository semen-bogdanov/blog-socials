import React, { useEffect, useState, memo } from 'react';
import avater from '../assets/img/avatar.png';
import banner1 from '../assets/img/banner_1.jpg';
import banner2 from '../assets/img/banner_2.jpg';
import banner3 from '../assets/img/banner_3.jpg';
import Recent from './Recent';
import Categories from './Categories';
import Tags from './Tags';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Righte from '../assets/slider/arr_active_3.png';
import Left from '../assets/slider/arr_active_4.png';
import axios from '../axios';
import { Link } from 'react-router-dom';
import {
  selectCurrentClickClear,
  setCurrentClickClear,
  setCurrentCategories,
  setCurrentCatclick,
  setCurrentTags,
  setCurrentTagsclick,
  setCurrentSearch,
  setCurrentSearchclick,
  setCurrentClickPag,
  setCurrentPage,
} from '../redux/slices/filterSlice';

const FilterComp: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { posts } = useSelector((state: any) => state.posts);
  const CurrentClickClear = useSelector(selectCurrentClickClear);
  const imgSlider: string[] = [banner1, banner2, banner3];

  const [comment1, setComment1] = useState<any>(); // коментарии
  const [filter1, setFilter1] = useState<boolean>(false); // фильтрация цвет кнопки
  const [search1, setSearch1] = useState<string>(''); // поиск
  const [categoriColor, setCategoriColor] = useState<any>(); // выбранная категория
  const [tegColor, setTegColor] = useState<any>(); // выбранный тег

  // Типы для стрелок слайдера
  interface ArrowProps {
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLElement>;
  }

  const SampleNextArrow: React.FC<ArrowProps> = ({ style, onClick }) => {
    return (
      <>
        <div
          className="slick-next2"
          style={{ ...style, backgroundColor: '#fffff' }}
          onClick={onClick}>
          <img className="slick-righte" src={Righte} alt="Righte" />
        </div>
      </>
    );
  };

  const SamplePrevArrow: React.FC<ArrowProps> = ({ style, onClick }) => {
    return (
      <div className="slick-prev2" style={{ ...style, display: 'flex' }} onClick={onClick}>
        <img className="slick-left" src={Left} alt="Left" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    // initialSlide: 0,
    // adaptiveHeight: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
          appendDots: (dots: any) => (
            <div
              style={{
                bottom: '0px',
                top: '0px',
                opacity: '1',
              }}>
              <ul style={{ margin: '0px' }}> {dots} </ul>
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
          appendDots: (dots: any) => (
            <div
              style={{
                bottom: '0px',
                top: '110%',
                opacity: '1',
              }}>
              <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
          ),
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
          appendDots: (dots: any) => (
            <div
              style={{
                bottom: '0px',
                top: '105%',
                opacity: '1',
              }}>
              <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
          ),
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // ТЕГИ
  const mas = posts.items.flatMap((element: any) => element.tags);
  const flatArray = [].concat(...mas); // Объединяем все массивы в один массив
  const uniqueWords = [...new Set(flatArray)]; // Фильтруем уникальные слова
  const uniqueWords2 = uniqueWords.slice(0, 0).concat(uniqueWords.slice(-19)); // выводить не более 20 тегов с конца массива

  // КАТЕГОРИИ RU
  const categoryName = [
    'Искусственный интеллект "Цифра"',
    'Робототехника "Технологии"',
    'Машиностроение "Земля"',
    'Машиностроение "Море"',
    'Машиностроение "Небо"',
    'Щит',
  ];

  // КАТЕГОРИИ EN
  const categoryNameEn = [`numbersc`, `technologies`, `earth`, `sea`, `sky`, `shield`];

  const mas2 = posts.items.flatMap((element: any) =>
    element.categories !== undefined ? element.categories : [],
  );

  // Получение всех сообщений
  useEffect(() => {
    axios.get(`/comment`).then(({ data }) => {
      setComment1(data);
    });
  }, []);

  let comments3: any = [];
  let commentDate: any = [];
  let postComments: any = [];

  if (comment1 !== undefined && comment1 !== null) {
    comments3 = comment1
      .map((element: any) => element.comment)
      .reverse()
      .slice(0, 5);
    commentDate = comment1
      .map((element: any) => element.updatedAt)
      .reverse()
      .slice(0, 5);
    postComments = comment1
      .map((element: any) => element.post)
      .reverse()
      .slice(0, 5);
  }

  // Перевести даты на русский язык
  function formatDates(dates: string[]): string[] {
    return dates.map((dateString) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString('ru-RU', options); // Перевод с американского на Российское время
    });
  }
  const formattedDates = formatDates(commentDate);

  // Категории
  const onChangeCategori = (categori: number) => {
    setCurrentClickPag(false);
    dispatch(setCurrentPage(1));
    dispatch(setCurrentCatclick(true));
    dispatch(setCurrentCategories(categori));
    dispatch(setCurrentTagsclick(false));
    dispatch(setCurrentTags(''));
    dispatch(setCurrentSearchclick(false));
    dispatch(setCurrentSearch(''));
    setFilter1(true);
    setSearch1('');
    setCategoriColor(categori);
    setTegColor('');
  };

  // Теги
  const onChangeTags = (tags: string) => {
    setCurrentClickPag(false);
    dispatch(setCurrentPage(1));
    dispatch(setCurrentTagsclick(true));
    dispatch(setCurrentTags(tags));
    dispatch(setCurrentCatclick(false));
    dispatch(setCurrentSearchclick(false));
    dispatch(setCurrentSearch(''));
    setFilter1(true);
    setSearch1('');
    setCategoriColor(null);
    setTegColor(tags);
  };

  // Очистка фильтра
  const onResetFiltering = () => {
    setCurrentClickPag(false);
    dispatch(setCurrentPage(1));
    dispatch(setCurrentCatclick(false));
    dispatch(setCurrentTagsclick(false));
    dispatch(setCurrentSearchclick(false));
    dispatch(setCurrentSearch(''));
    dispatch(setCurrentTags(''));
    setFilter1(false);
    setSearch1('');
    setCategoriColor(null);
    setTegColor('');
  };

  // Поиск по сайту
  const onChangeSearch = (search: string) => {
    setCurrentClickPag(false);
    dispatch(setCurrentClickPag(false));
    dispatch(setCurrentPage(1));
    dispatch(setCurrentSearch(search));
    dispatch(setCurrentSearchclick(true));
    dispatch(setCurrentCatclick(false));
    dispatch(setCurrentTagsclick(false));
    setSearch1(search);
    setFilter1(search === '' ? false : true);
    setCategoriColor(null);
    setTegColor('');
  };

  // Очистка фильра при клик на лого "Нейронка"
  useEffect(() => {
    onResetFiltering();
    dispatch(setCurrentClickClear(false));
  }, [CurrentClickClear]);

  return (
    <>
      <div className="Filter">
        {/* Поиск по сайту */}

        <input
          onChange={(e: any) => onChangeSearch(e.target.value)}
          value={search1}
          className="Filter__inp"
          placeholder="Поиск по сайту"
          type="text"
        />
        <div className="Filter__recent">
          <h1 className="Filter__name">Последние комментарии</h1>
          {comments3.map((element: string, index: number) => (
            <Link key={index} to={`/posts/${postComments[index]}`}>
              <Recent name1={element} name2={formattedDates[index]} avatar1={avater} />
            </Link>
          ))}
          <div>
            <h1 className="Filter__name">Категории</h1>
            {categoryName.map((element: string, index: number) => (
              <Link key={index} to={'#'} onClick={() => onChangeCategori(index)}>
                <Categories
                  name={element}
                  num={
                    mas2.filter(function (element: any) {
                      return element === categoryNameEn[index];
                    }).length
                  }
                  index1={categoriColor}
                />
              </Link>
            ))}
          </div>
          <div>
            <button
              style={filter1 ? { backgroundColor: '#333333' } : { backgroundColor: '#CFCFCF' }}
              className="Filter__btn"
              onClick={() => onResetFiltering()}>
              СБРОСИТЬ ФИЛЬТРАЦИЮ
            </button>
            <h1 className="Filter__name">Тэги</h1>
            {uniqueWords2.map((element: string, index: number) => (
              <Link key={index} to={'#'} onClick={() => onChangeTags(element)}>
                <Tags tags={element} index1={tegColor} />
              </Link>
            ))}
          </div>
          <div>
            <h1 className="Filter__name">Slider Widget</h1>
            <div className="Filter__slider">
              <Slider className="Filter__img" {...settings}>
                {imgSlider.map((element: string, index: number) => (
                  <img key={index} src={element} alt="баннер 2" />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Filter = memo(FilterComp);
