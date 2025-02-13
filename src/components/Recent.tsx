import React from 'react';

export interface Props {
  name1: any;
  name2: any;
  avatar1: string;
}

const Recent: React.FC<Props> = ({ name1, name2, avatar1 }) => {
  return (
    <>
      <div className="Filter__blog1">
        <div className="Filter__blog2">
          <img className="Filter__blogimg" src={avatar1} alt="аватар" />
        </div>
        <div className="Filter__blogtext">
          <p className="Filter__blogtext2">{name1}</p>
          <p>{name2}</p>
        </div>
      </div>
    </>
  );
};

export default Recent;
