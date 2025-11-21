import React from 'react';
import VideoPlayer from './VideoPlayer';
import './Dashboard.css';

const videoSources = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      {videoSources.map((src, index) => (
        <VideoPlayer key={index} src={src} />
      ))}
    </div>
  );
};

export default Dashboard;
