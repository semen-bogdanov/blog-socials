import React from 'react';
import ContentLoader from 'react-content-loader';

interface PostProps {
  width: number;
}

const Skeleton: React.FC<PostProps> = ({ width }) => (
  <ContentLoader
    className={`${'skeleton__block'} ${'skeleton__mod1'} `}
    speed={3}
    width={width}
    height="470"
    viewBox={`0 0 ${width} 470`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width={width} height="470" />
  </ContentLoader>
);

export default Skeleton;
