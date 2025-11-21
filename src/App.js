import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const videoSources = [
  // These are the MediaMTX HLS URLs (replace host if different)
  'http://localhost:8888/cam1/index.m3u8',
  'http://localhost:8888/cam2/index.m3u8',
  'http://localhost:8888/cam3/index.m3u8',
  'http://localhost:8888/cam4/index.m3u8',
  'http://localhost:8888/cam5/index.m3u8',
  'http://localhost:8888/cam6/index.m3u8'
];

function App() {
  const videoRefs = useRef([]);
  const hlsInstances = useRef([]);

  useEffect(() => {
    // initialize players
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 3,
          maxMaxBufferLength: 10
        });
        hls.loadSource(videoSources[idx]);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // autoplay muted
          video.muted = true;
          video.play().catch(()=>{});
        });
        hlsInstances.current[idx] = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSources[idx];
      }
    });

    return () => {
      // destroy
      hlsInstances.current.forEach(h => { if (h) h.destroy(); });
    };
  }, []);

  // Basic sync method — copies time from master (0) to others if drift > 0.25s
  const syncAll = () => {
    const master = videoRefs.current[0];
    if (!master) return;
    const t = master.currentTime;
    videoRefs.current.forEach((v, i) => {
      if (!v || i === 0 || v.readyState < 2) return;
      if (Math.abs(v.currentTime - t) > 0.25) v.currentTime = t;
    });
  };

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1>Multi-Stream Monitoring Dashboard</h1>
        <p className="sub">6 HLS players — synchronized demo</p>
      </header>

      <main className="grid-wrap">
        {videoSources.map((src, i) => (
          <div className="player-card" key={i}>
            <video
              ref={el => videoRefs.current[i] = el}
              className="player-video"
              controls
              autoPlay
              muted
              onTimeUpdate={i === 0 ? syncAll : undefined}
            />
            <div className="card-footer">Camera {i + 1}</div>
          </div>
        ))}
      </main>

      <footer className="dashboard-footer">
        <small>Use MediaMTX or FFmpeg to generate HLS playlists. Replace URLs in <code>videoSources</code> if needed.</small>
      </footer>
    </div>
  );
}

export default App;