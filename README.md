# Video Streaming Dashboard (React + HLS)

## Overview
A multi-view synchronized streaming dashboard built with React and HLS (HLS.js). The dashboard shows 6 streams in a responsive grid and attempts to keep them in lock-step.

## How it works
- MediaMTX is configured to take the single RTSP source and present 6 HLS endpoints.
- The React app uses Hls.js to attach each HLS stream to an HTML5 video element.
- A lightweight sync function periodically copies the master player's `currentTime` to other players when drift exceeds a small threshold.

## Local setup
1. Clone repo
```bash
git clone <your-repo>
cd video-dashboard
```
2. Install dependencies
```bash
npm install
```
3. Start Mediamtx (ensure mediamtx.yml is in the mediamtx folder)
```bash
./mediamtx.exe
```
4. Start React app
```bash
npm start
```
Open http://localhost:3000

## How I simulated 5-6 HLS streams
- Used MediaMTX config to map the same RTSP URL to multiple HLS paths (cam1..cam6).
- If RTSP isn't available, use public HLS test URLs or generate HLS with FFmpeg from a local MP4.

## Deployment
- Push repo to GitHub and deploy on Vercel or Netlify. Use the `build` folder produced by `npm run build`.

## Notes on synchronization
- This project implements a simple time-copy sync triggered from the master player's `onTimeUpdate` event. For production-grade sync you would use PTS alignment, low-latency CMAF or WebRTC.
