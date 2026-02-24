import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check } from './Icons';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  myListIds?: number[];
  onToggleList?: (movieId: number) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick, myListIds = [], onToggleList }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleToggleList = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    if (onToggleList) {
      onToggleList(movieId);
    }
  };

  return (
    <div className="mb-8 px-4 md:px-8 space-y-4 group">
      <h2 className="text-xl md:text-2xl font-semibold text-white/90 group-hover:text-white transition duration-200">{title}</h2>
      
      <div className="relative group/row">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-30 bg-black/50 hover:bg-black/70 w-12 items-center justify-center hidden group-hover/row:flex transition duration-200 rounded-r"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth px-1 py-4"
        >
          {movies.map((movie) => {
            const isAdded = myListIds.includes(movie.id);
            return (
              <div 
                key={movie.id}
                onClick={() => onMovieClick(movie)}
                className="relative min-w-[200px] md:min-w-[240px] h-[112px] md:h-[135px] rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:z-20"
              >
                <img 
                  src={movie.thumbnailUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover rounded-md opacity-90 hover:opacity-100"
                />
                
                {/* Hover Overlay Info */}
                <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors rounded-md flex items-center justify-center opacity-0 hover:opacity-100 group-hover:delay-300 gap-3">
                   <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition border border-white/30">
                     <Play className="w-6 h-6 text-white fill-white" />
                   </div>
                   
                   {onToggleList && (
                     <div 
                        onClick={(e) => handleToggleList(e, movie.id)}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition border border-white/30"
                        title={isAdded ? "Remove from list" : "Add to list"}
                      >
                       {isAdded ? (
                         <Check className="w-6 h-6 text-white" />
                       ) : (
                         <Plus className="w-6 h-6 text-white" />
                       )}
                     </div>
                   )}
                </div>
                
                <div className="mt-2">
                  <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="text-green-400 font-bold">{movie.rating}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 bg-black/50 hover:bg-black/70 w-12 items-center justify-center hidden group-hover/row:flex transition duration-200 rounded-l"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;