import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from 'react-icons/fi';
import { cloudinaryVideoUrl } from '../utils/cloudinary';

interface SpaceVideoPlayerProps {
  /** Direct video URL (local or remote) */
  src?: string;
  /**
   * Cloudinary video public ID, e.g. 'office/intro-reel'.
   * When provided, the optimised Cloudinary delivery URL is used instead of `src`.
   */
  cloudinaryPublicId?: string;
  title: string;
  /** Video quality (default: 'auto') */
  quality?: number | 'auto';
  /** Whether the video should autoplay (default: false) */
  autoPlay?: boolean;
}


export default function SpaceVideoPlayer({ src, cloudinaryPublicId, title, quality = 'auto', autoPlay = false }: SpaceVideoPlayerProps) {
  // Resolve final video source: Cloudinary public ID takes priority over a plain src
  const resolvedSrc = cloudinaryPublicId
    ? cloudinaryVideoUrl(cloudinaryPublicId, { quality, format: 'auto' })
    : (src ?? '');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(autoPlay);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Play interrupted:", err);
        setIsLoading(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(cur);
    setProgress(dur > 0 ? (cur / dur) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
    setProgress(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen error:", err);
      });
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset playing state if src changes
    setIsPlaying(false);
    setIsLoading(autoPlay);
    setCurrentTime(0);
    setProgress(0);

    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleSeeking = () => setIsLoading(true);
    const handleSeeked = () => setIsLoading(false);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadStart = () => setIsLoading(true);

    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('pause', handleVideoPause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);

    if (autoPlay) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Autoplay failed:", err));
    }

    return () => {
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('pause', handleVideoPause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [resolvedSrc, autoPlay]);

  return (
    <div 
      ref={containerRef}
      className="space-video-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={resolvedSrc}
        preload="metadata"
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* CUSTOM OVERLAY PLAY BUTTON */}
      <div className={`space-video-overlay ${isPlaying ? 'fade-out' : 'fade-in'}`} style={isLoading ? { display: 'none' } : undefined}>
        <div className="space-video-play-btn">
          <FiPlay size={30} style={{ marginLeft: isPlaying ? '0' : '4px', fill: 'currentColor' }} />
        </div>
        <span className="space-video-overlay-title">{title}</span>
      </div>

      {/* LOADING SPINNER OVERLAY */}
      {isLoading && (
        <div className="space-video-loader-overlay">
          <div className="space-video-spinner"></div>
          <span className="space-video-loader-text">Loading Video...</span>
        </div>
      )}

      {/* SLEEK GLASSMORPHIC CONTROLS */}
      <div 
        className={`space-video-controls ${isHovered || !isPlaying ? 'slide-up' : 'slide-down'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicking controls from triggering play/pause
      >
        <div className="space-video-seek-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="space-video-seeker"
            style={{
              background: `linear-gradient(to right, var(--orange) 0%, var(--orange) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>

        <div className="space-video-controls-bottom">
          <div className="space-video-controls-left">
            <button className="space-control-btn" onClick={togglePlay}>
              {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
            </button>
            <button className="space-control-btn" onClick={toggleMute}>
              {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>
            <span className="space-video-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="space-video-controls-right">
            <button className="space-control-btn" onClick={toggleFullscreen}>
              <FiMaximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
