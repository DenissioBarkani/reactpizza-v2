import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="122" cy="124" r="120" />
        <rect x="0" y="259" rx="0" ry="0" width="280" height="27" />
        <rect x="0" y="300" rx="0" ry="0" width="280" height="57" />
        <rect x="0" y="370" rx="0" ry="0" width="280" height="25" />
    </ContentLoader>
);

export default Skeleton;
