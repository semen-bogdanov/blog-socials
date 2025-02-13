import React from 'react';
import ContentLoader from 'react-content-loader';

interface PostProps {
  width: number;
}

const Skeleton3: React.FC<PostProps> = ({ width }) => (
  <ContentLoader
    rtl
    speed={2}
    width={674}
    height={390}
    viewBox="0 0 674 390"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    id="unique-id" // Добавляем статический идентификатор
    {...props}>
    <rect x="0" y="0" rx="0" ry="0" width="674" height="390" />
  </ContentLoader>
);

export default Skeleton3;
