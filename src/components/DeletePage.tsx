import React, { useEffect, useRef, useState } from 'react';

const DeletePage = () => {
  const [state, setState] = useState<boolean>(false);
  const [state1, setState1] = useState<string>('');
  const [state2, setState2] = useState<boolean>(false);
  const [click1, setCkick1] = useState<number>(0);
  const [massiv, setMassiv] = useState<any[]>([]);
  const [massiv2, setMassiv2] = useState<string[]>([]);
  const [massiv3, setMassiv3] = useState<number[]>([]);
  const [massiv4, setMassiv4] = useState<any[]>([]);

  const componentRef = useRef<HTMLDivElement>(null); // поиск блока div для узнования текущего размера
  const component2 = useRef<HTMLDivElement>(null);
  const component3 = useRef<HTMLDivElement>(null);
  const component4 = useRef<HTMLDivElement>(null);
  const component5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`Рендерится`);
  }, []);

  return (
    <div ref={componentRef}>
      <div></div>
    </div>
  );
};

export default DeletePage;
