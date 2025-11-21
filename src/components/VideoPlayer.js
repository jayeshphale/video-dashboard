import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({src, onReady}){
  const ref = useRef(null);
  useEffect(()=>{
    const video = ref.current;
    if(!video) return;
    let hls;
    if(Hls.isSupported()){
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, ()=>{ video.muted=true; video.play().catch(()=>{}); if(onReady) onReady(video); });
    } else if(video.canPlayType('application/vnd.apple.mpegurl')){
      video.src = src; video.play().catch(()=>{});
    }
    return ()=>{ if(hls) hls.destroy(); }
  },[src]);
  return <video ref={ref} controls style={{width:'100%',height:220}} />;
}