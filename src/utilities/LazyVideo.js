import React from 'react';

const LazyVideo = ({ src, ...props }) => {
  return <video src={src} loading="lazy" {...props} />;
};

export default LazyVideo;