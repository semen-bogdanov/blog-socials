import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PostData1 {
  text: string;
}

const Text: React.FC<PostData1> = ({ text }) => {
  return (
    <>
      <ReactMarkdown>{text}</ReactMarkdown>,
    </>
  );
};

export default Text;
