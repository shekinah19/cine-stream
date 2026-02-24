import React from 'react';
import { Play, Info, Plus, Check } from './Icons';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
  onInfoClick: () => void;
  language: 'fr' | 'en';
  isInList: boolean;
  onToggleList: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay, onInfoClick, language, isInList, onToggleList }) => {
  const t = {
    fr: {
      play: "Lecture",
      info: "Plus d'infos",
      quality: "Ultra HD 4K",
      myList: "Ma Liste",
      added: "Ajouté"
    },
    en: {
      play: "Play",
      info: "More Info",
      quality: "Ultra HD 4K",
      myList: "My List",
      added: "Added"
    }
  };

  return (
    <div className="relative h-[85vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
            src={movie.coverUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 max-w-3xl space-y-6 pt-20">
        
        <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 border border-gray-400 text-gray-300 text-xs font-bold rounded uppercase tracking-wide">{t[language].quality}</span>
            <span className="text-green-400 font-bold text-sm">{movie.rating}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          {movie.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base font-medium">
             <span>{movie.year}</span>
             <span>•</span>
             <span>{movie.genre}</span>
             <span>•</span>
             <span>{movie.duration}</span>
        </div>

        <p className="text-gray-200 text-lg md:text-xl line-clamp-3 max-w-2xl drop-shadow-md">
          {movie.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button 
            onClick={onPlay}
            className="flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded hover:bg-gray-200 transition duration-200 font-bold text-lg shadow-lg hover:scale-105 transform"
          >
            <Play className="fill-black w-6 h-6" />
            {t[language].play}
          </button>
          
          <button 
            onClick={onToggleList}
            className="flex items-center gap-3 bg-gray-500/40 backdrop-blur-sm text-white px-8 py-3.5 rounded hover:bg-gray-500/60 transition duration-200 font-bold text-lg border border-white/20"
          >
            {isInList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            {isInList ? t[language].added : t[language].myList}
          </button>

          <button 
            onClick={onInfoClick}
            className="flex items-center gap-3 bg-gray-500/40 backdrop-blur-sm text-white px-8 py-3.5 rounded hover:bg-gray-500/60 transition duration-200 font-bold text-lg border border-white/20"
          >
            <Info className="w-6 h-6" />
            {t[language].info}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;