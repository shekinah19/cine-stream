import React from 'react';
import { X, Play, Plus, Check, ThumbsUp, Share, Calendar, Star, Volume2 } from './Icons';
import { Movie } from '../types';

interface InfoModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: () => void;
  onToggleList: () => void;
  isInList: boolean;
  language: 'fr' | 'en';
}

const InfoModal: React.FC<InfoModalProps> = ({ movie, onClose, onPlay, onToggleList, isInList, language }) => {
  // Mock data for demonstration since it's not in the main data structure
  const matchScore = "98%";
  const ageRating = "16+";
  const cast = language === 'fr' ? "Tom Holland, Zendaya, Benedict Cumberbatch" : "Tom Holland, Zendaya, Benedict Cumberbatch";
  const director = language === 'fr' ? "Jon Watts" : "Jon Watts";

  const t = {
    fr: {
      play: "Lecture",
      myList: "Ma Liste",
      added: "Ajouté",
      match: "Recommandé",
      cast: "Distribution :",
      director: "Réalisateur :",
      genre: "Genres :",
      about: "À propos de"
    },
    en: {
      play: "Play",
      myList: "My List",
      added: "Added",
      match: "Match",
      cast: "Cast:",
      director: "Director:",
      genre: "Genres:",
      about: "About"
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-[#181818] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 mt-10 mb-10">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#181818] p-2 rounded-full hover:bg-white hover:text-black transition duration-200"
        >
          <X size={24} />
        </button>

        {/* Hero Image Area */}
        <div className="relative h-[400px] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />
          <img 
            src={movie.coverUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Action Buttons inside Hero */}
          <div className="absolute bottom-10 left-8 z-20 flex items-center gap-4">
            <button 
              onClick={onPlay}
              className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-gray-200 transition"
            >
              <Play className="fill-black w-6 h-6" />
              {t[language].play}
            </button>

            <button 
              onClick={onToggleList}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 bg-[#2a2a2a]/60 hover:border-white transition text-white"
              title={isInList ? t[language].added : t[language].myList}
            >
              {isInList ? <Check size={20} /> : <Plus size={20} />}
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 bg-[#2a2a2a]/60 hover:border-white transition text-white">
              <ThumbsUp size={20} />
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 bg-[#2a2a2a]/60 hover:border-white transition text-white">
              <Share size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-8 flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Info */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-400 font-bold">{movie.rating} {t[language].match}</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="border border-gray-500 px-1 text-xs rounded">{ageRating}</span>
              <span className="text-white">{movie.duration}</span>
              <div className="flex items-center text-xs border border-gray-500 px-1 rounded text-white">HD</div>
            </div>

            <div>
               <h2 className="text-3xl font-bold text-white mb-4">{movie.title}</h2>
               <p className="text-white text-base leading-relaxed">
                 {movie.description}
               </p>
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="w-full md:w-1/3 space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">{t[language].cast}</span>
              <span className="text-white hover:underline cursor-pointer">{cast}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">{t[language].genre}</span>
              <span className="text-white hover:underline cursor-pointer">{movie.genre}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">{t[language].director}</span>
              <span className="text-white hover:underline cursor-pointer">{director}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfoModal;