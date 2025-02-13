import React from 'react';
import logo1 from '../assets/Header/Neironka2.png';
import Recent from './Recent';
import avater from '../assets/img/avatar.png';
import Tags from './Tags';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const massiv: Array<string> = ['Home', 'Блог', 'Правила', 'Инженерия'];
  const href1: Array<string> = ['/', '/blog', '/', '/'];

  return (
    <>
      <footer className="Footer">
        <div className="container">
          <div className="Footer__blog">
            <div className="Footer__logo">
              <Link to="/">
                <img src={logo1} alt="logo" />
              </Link>
              <p className="Footer__text1">
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vestibulum a
                velit ac tristique. Curabitur est tellus, aliquet at urna fringilla.
              </p>
              <button className="Footer__button">ЧИТАТЬ</button>
            </div>
            <div className="Footer__blog2">
              <h1 className="Footer__news">Useful Links</h1>
              <div className="Footer__links">
                {massiv.map((element: string, index: number) => (
                  <Link key={index} to={href1[index]} className="Footer__menu1">
                    {element}
                    <br />
                    <br />
                  </Link>
                ))}
              </div>
            </div>
            <div className="Footer__blog2">
              <h1 className="Footer__news">Latest News</h1>
              <Recent
                name1={'The Code Less Travelled'}
                name2={'January 29, 2019'}
                avatar1={avater}
              />
              <Recent
                name1={'The Code Less Travelled'}
                name2={'January 29, 2019'}
                avatar1={avater}
              />
            </div>
            <div className="Footer__blog2">
              <h1 className="Footer__news">Item Tags</h1>
              {/* <Tags tags={'UX/UI'} />
              <Tags tags={'beateful'} />
              <Tags tags={'react js'} />
              <Tags tags={'angular'} />
              <Tags tags={'vue js'} />
              <Tags tags={'material dezign'} />
              <Tags tags={'beblioglobus'} /> */}
            </div>
          </div>
        </div>
      </footer>
      <footer className="Footer2">
        <div className="container">
          <p className="Footer2__copyright">
            Copyright © 2021 Your Company Name All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
