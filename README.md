# Video Streaming Dashboard (React + HLS)

## Overview
This project is a **multi-view synchronized streaming dashboard** built with React and HLS (HLS.js). The dashboard displays **6 streams** in a responsive grid and keeps them as closely synchronized as possible.  

This dashboard was developed for the **Video Streaming Dashboard Assignment (React Edition)** to demonstrate **RTSP → HLS conversion**, React development, and video synchronization.

---

## How it Works
- **MediaMTX** is configured to take a single RTSP source and generate 6 HLS endpoints.  
- The React app uses **Hls.js** to attach each HLS stream to an HTML5 `<video>` element.  
- A lightweight synchronization function **periodically copies the master player's `currentTime`** to other players if the drift exceeds 0.25 seconds, ensuring all streams remain in sync.

---

## 1. HLS Generation Pipeline

### RTSP Source
- **Provided RTSP URL:**  
`rtsp://13.60.76.79:8554/live`

### HLS Generation
- **Tool Used:** [MediaMTX](https://github.com/bluenviron/mediamtx) (FFmpeg can also be used as an alternative)  

**Process:**
1. MediaMTX continuously reads the RTSP stream.  
2. HLS output is generated for multiple paths (`cam1..cam6`), creating 5-6 distinct HLS URLs from a single RTSP source.  
3. Each HLS URL produces a `.m3u8` playlist accessible via HTTP for the React dashboard.  

**Example MediaMTX configuration (`mediamtx.yml`):**
```yaml
paths:
  cam1:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam2:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam3:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam4:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam5:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
  cam6:
    source: rtsp://13.60.76.79:8554/live
    hls: yes
Alternative for Testing:
If the RTSP source is not accessible, public HLS test URLs can be used:

javascript
Copy code
const videoSources = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
];
2. React Dashboard Development
Framework
Built entirely with React functional components and Hooks.

Player Library
Uses Hls.js to attach HLS streams to HTML5 <video> elements.

Display Layout
Responsive grid showing 6 video players simultaneously (2x3 or 3x2 layout).

Works on smaller screens with responsive breakpoints.

Synchronization
Master player: First video is treated as the reference.

On every onTimeUpdate event, all other videos adjust their currentTime if the drift exceeds 0.25 seconds, keeping the streams synchronized.

3. Local Setup Instructions
Clone the repository

bash
Copy code
git clone https://github.com/jayeshphale/video-dashboard.git
cd video-dashboard
Install dependencies

bash
Copy code
npm install
Start MediaMTX (ensure mediamtx.yml is in the same folder)

bash
Copy code
./mediamtx.exe
Start React app

bash
Copy code
npm start
Open http://localhost:3000 in your browser.

4. Deployment
Push repository to GitHub.

Deploy to Vercel or Netlify for a live demo.

Replace any localhost HLS URLs with publicly accessible URLs if MediaMTX is not hosted publicly.

Example live demo URL: https://your-dashboard.vercel.app/

5. Notes on Synchronization
Implements a simple time-copy synchronization from the master player to all others.

For production-grade synchronization, consider using PTS alignment, low-latency CMAF, or WebRTC.

6. References
Dashboard layout reference: https://monitor.theun1t.com/

MediaMTX: https://github.com/bluenviron/mediamtx

Hls.js: https://github.com/video-dev/hls.js