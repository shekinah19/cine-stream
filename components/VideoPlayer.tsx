import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, Maximize, ChevronLeft, Settings } from './Icons';
import { Movie } from '../types';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * (videoRef.current.duration || 0);
      
      videoRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const handleSpeedChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  };

  // Format time (seconds -> mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Auto hide controls
  useEffect(() => {
    let timeout: any;
    const resetTimer = () => {
        setShowControls(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowControls(false), 3000);
    };
    
    window.addEventListener('mousemove', resetTimer);
    resetTimer();

    return () => {
        window.removeEventListener('mousemove', resetTimer);
        clearTimeout(timeout);
    }
  }, []);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Video Element */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video 
            ref={videoRef}
            src={movie.videoUrl}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            poster={movie.coverUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
        >
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
      </div>

      {/* Controls Overlay */}
      <div className={`absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Bar */}
        <div className="flex items-center justify-between">
            <button onClick={onClose} className="text-white hover:text-gray-300 transition p-2 rounded-full hover:bg-white/10">
                <ChevronLeft size={40} />
            </button>
            <h2 className="text-xl font-bold tracking-wide text-white/90 drop-shadow-md">{movie.title}</h2>
            <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* Center Play/Pause Animation (Optional, visual feedback) */}
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 p-6 rounded-full backdrop-blur-sm">
                    <Play size={60} className="text-white fill-white ml-2" />
                </div>
            </div>
        )}

        {/* Bottom Bar */}
        <div className="space-y-4 pb-4 px-4">
            {/* Progress Bar */}
            <div 
                className="w-full bg-gray-600/50 h-1.5 rounded-full cursor-pointer group relative hover:h-2.5 transition-all"
                onClick={handleSeek}
            >
                <div 
                    className="bg-red-600 h-full rounded-full relative" 
                    style={{ width: `${progress}%` }}
                >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-100 shadow-lg"></div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-red-500 transition">
                        {isPlaying ? <Pause size={32} className="fill-white" /> : <Play size={32} className="fill-white" />}
                    </button>
                    <div className="text-sm font-medium text-gray-200 font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                    <div className="flex items-center gap-2 text-white hover:text-gray-300 group cursor-pointer">
                        <Volume2 size={24} />
                        <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300">
                             <div className="w-20 h-1 bg-white rounded ml-2"></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                     <span className="text-xs md:text-sm text-gray-300 font-medium bg-white/10 px-2 py-1 rounded hidden sm:inline">{movie.genre}</span>
                     
                     {/* Speed Control */}
                     <div className="relative">
                        {showSpeedMenu && (
                            <div className="absolute bottom-12 right-0 bg-black/90 border border-gray-700 rounded-lg p-2 min-w-[80px] flex flex-col gap-1 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                                <div className="text-xs text-gray-400 px-2 py-1 font-semibold uppercase tracking-wider">Vitesse</div>
                                {speeds.map(rate => (
                                    <button
                                        key={rate}
                                        onClick={() => handleSpeedChange(rate)}
                                        className={`text-left px-3 py-1.5 rounded hover:bg-white/20 text-sm transition-colors ${playbackRate === rate ? 'text-red-500 font-bold bg-white/10' : 'text-white'}`}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>
                        )}
                        <button 
                            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                            className="text-white hover:text-gray-300 font-bold text-sm w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                            title="Vitesse de lecture"
                        >
                            {playbackRate}x
                        </button>
                     </div>

                     <button className="text-white hover:text-gray-300" onClick={() => {
                         if (document.fullscreenElement) {
                             document.exitFullscreen();
                         } else {
                             document.documentElement.requestFullscreen();
                         }
                     }}>
                        <Maximize size={24} />
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;