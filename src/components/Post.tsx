import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
  id: string;
  title: string;
  imageUrl: string;
  text: string;
  user: any;
  tags: any;
  // Добавьте другие свойства, если необходимо
}

const Post: React.FC<PostProps> = ({ id, title, imageUrl, text, user, tags }) => {
  return (
    <>
      <div className="content__post">
        <div className="content__blog1">
          <h3 className="content__h3">{title}</h3>
          <p className="content__breadcrumbs">{user.fullName}</p>
        </div>
        <img className="content__img" src={imageUrl} alt="" />
        <div className="content__description">
          <p className="content__text1">{text}</p>
        </div>

        <Link className="content__button" to={`/posts/${id}`}>
          СМОТРЕТЬ
        </Link>
      </div>
    </>
  );
};

export default Post;
