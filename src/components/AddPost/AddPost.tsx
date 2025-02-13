import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';

const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector<any>(selectIsAuth);
  const [text, setText] = useState<string>(''); // текст
  const [isLoading, setLoading] = useState<boolean>(false); //
  const [title, setTitle] = useState<any>(''); // Заголовок статьи
  const [tags, setTags] = useState<any>(''); // Тэги статьи
  const [categories, setCategory] = useState<any>(''); // выбранные категории
  const [imageUrl, setImagUrl] = useState<any>(''); // загрузка картинки
  const inputFileRef = useRef<any>(null);
  const isEditing = Boolean(id); // опубликовать или сохранить статью

  // setValue
  // отправка картинки на back end
  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      setImagUrl(data.url);
    } catch (err: any) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  // удаление картинки
  const onClickRemoveImage = () => {
    setImagUrl('');
  };

  const onChange = useCallback((value: any) => {
    setText(value);
  }, []);

  // кнопка "отправить" на backend
  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        text,
        imageUrl,
        tags,
        categories,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      console.log(fields);
      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err: any) {
      console.warn(err);
      alert('Ошибка при создании статьи!');
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.title);
        setImagUrl(data.imageUrl);
        setTags(data.tags.join(','));
        setCategory(data.categories);
      });
    }
  }, []);

  // настройки библиотеки SimpleMDE
  const options: any = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  // console.log(category, value, tags, title);
  console.log(title);

  return (
    <div className="container">
      <Paper style={{ padding: 30 }}>
        <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Загрузить превью
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
          </>
        )}
        <br />
        <br />
        <div className="entrance__gender">
          <h1 className="entrance__text2">Категория</h1>
          <select
            className="entrance__select"
            id="categories"
            value={categories}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="select">Выбрать...</option>
            <option value="numbersc">Искусственный интеллект "Цифра"</option>
            <option value="technologies">Робототехника "Технологии"</option>
            <option value="earth">Машиностроение "Земля"</option>
            <option value="sea">Машиностроение "Море"</option>
            <option value="sky">Машиностроение "Небо"</option>
            <option value="shield">Щит</option>
          </select>
        </div>

        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />

        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </Paper>
    </div>
  );
};

export default AddPost;
