import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton4: React.FC = () => (
  <ContentLoader
    className="skeleton__editor"
    speed={2}
    width={1170}
    height={87.7}
    viewBox="0 0 1170 87.7"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="1170" height="87.7" />
  </ContentLoader>
);

export default Skeleton4;
