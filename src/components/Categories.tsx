import React from 'react';

export interface Props {
  name: string;
  num: number;
  index1: number;
}

const Categories: React.FC<Props> = ({ name, num, index1 }) => {
  // КАТЕГОРИИ RU
  const categoryName = [
    'Искусственный интеллект "Цифра"',
    'Робототехника "Технологии"',
    'Машиностроение "Земля"',
    'Машиностроение "Море"',
    'Машиностроение "Небо"',
    'Щит',
  ];

  return (
    <>
      <div className="Filter__categories">
        <div className="Filter__cat1">
          <p
            className="Filter__catetext"
            style={categoryName[index1] === name ? { color: '#2888fe' } : { color: '#333333' }}>
            {name}
          </p>
          <p className="Filter__number">{num}</p>
        </div>
      </div>
    </>
  );
};

export default Categories;
