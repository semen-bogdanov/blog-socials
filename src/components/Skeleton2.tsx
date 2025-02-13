import React from 'react';
import ContentLoader from 'react-content-loader';

// interface PostProps {
//   width: number;
// }

window.scrollTo(0, 0);
const Skeleton2: React.FC = () => (
  <div className="container">
    <ContentLoader
      className={`${'skeleton__block'} ${'skeleton__mod1'} `}
      speed={3}
      width={1200}
      height={1200}
      viewBox={`0 0 1200 1200`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="73" rx="0" ry="0" width="1200" height="855" />
      <rect x="-1" y="13" rx="0" ry="0" width="600" height="40" />
      <rect x="0" y="945" rx="0" ry="0" width="258" height="26" />
      <rect x="0" y="989" rx="0" ry="0" width="719" height="89" />
    </ContentLoader>
  </div>
);

export default Skeleton2;
