import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <video ref={videoRef} controls autoPlay muted width="100%" height="100%" />
  );
};

export default VideoPlayer;
