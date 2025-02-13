import React from 'react';

export interface Props {
  tags: string;
  index1: string;
}

const Tags: React.FC<Props> = ({ tags, index1 }) => {
  // console.log(index1);
  // console.log(tags);
  // {index1 === tags ? { color: '#2888fe' } : { color: '#333333' }}
  // style={}
  return (
    <>
      <button className="Filter__tag">
        <p
          className="Filter__tagtext"
          style={index1 === tags ? { color: '#2888fe' } : { color: '#333333' }}>
          {tags}
        </p>
      </button>
    </>
  );
};

export default Tags;
