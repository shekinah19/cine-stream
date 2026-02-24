import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Assistant from './components/Assistant';
import VideoPlayer from './components/VideoPlayer';
import InfoModal from './components/InfoModal';
import Toast from './components/Toast';
import AuthScreen from './components/AuthScreen';
import SettingsScreen from './components/SettingsScreen';
import AccountScreen from './components/AccountScreen';
import { 
  HERO_MOVIE, 
  TRENDING_MOVIES, 
  ACTION_MOVIES,
  COMEDY_MOVIES,
  DRAMA_MOVIES,
  SCIFI_MOVIES,
  THRILLER_MOVIES 
} from './data';
import { Movie } from './types';

type ViewState = 'home' | 'settings' | 'account';

const App: React.FC = () => {
  // State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [heroMovie, setHeroMovie] = useState<Movie>(HERO_MOVIE);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [selectedInfoMovie, setSelectedInfoMovie] = useState<Movie | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [myListIds, setMyListIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{msg: string, visible: boolean}>({msg: '', visible: false});

  // Helper to show toasts
  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Aggregate all movies
  const allMovies = useMemo(() => {
    const movies = [
      HERO_MOVIE,
      ...TRENDING_MOVIES,
      ...ACTION_MOVIES,
      ...COMEDY_MOVIES,
      ...DRAMA_MOVIES,
      ...SCIFI_MOVIES,
      ...THRILLER_MOVIES
    ];
    return Array.from(new Map(movies.map(m => [m.id, m])).values());
  }, []);

  // Data Filtering
  const myListMovies = useMemo(() => {
    return allMovies.filter(movie => myListIds.includes(movie.id));
  }, [allMovies, myListIds]);

  // Filter movies based on search
  const filterMovies = (movies: Movie[]) => {
    if (!searchQuery) return movies;
    const lowerQuery = searchQuery.toLowerCase();
    return movies.filter(m => 
        m.title.toLowerCase().includes(lowerQuery) || 
        m.genre.toLowerCase().includes(lowerQuery) ||
        m.description.toLowerCase().includes(lowerQuery)
    );
  };

  // Handlers
  const handleToggleMyList = (movieId: number) => {
    setMyListIds(prev => {
      const isAdding = !prev.includes(movieId);
      if (isAdding) {
         showToast(language === 'fr' ? "Ajouté à Ma Liste" : "Added to My List");
         return [...prev, movieId];
      } else {
         showToast(language === 'fr' ? "Retiré de Ma Liste" : "Removed from My List");
         return prev.filter(id => id !== movieId);
      }
    });
  };

  // Logic to select a movie and show it in the Hero section (Netflix style)
  const handleMovieSelect = (movie: Movie) => {
    setHeroMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayMovie = (movie: Movie) => {
    setSelectedInfoMovie(null); // Close info modal if playing
    setCurrentMovie(movie);
  };

  const handleOpenInfo = (movie: Movie) => {
    setSelectedInfoMovie(movie);
  };

  const handleFooterClick = (text: string) => {
    showToast(language === 'fr' ? `${text} - Indisponible en mode démo` : `${text} - Unavailable in demo mode`);
  };

  const t = {
    fr: {
      myList: "Ma Liste",
      trending: "Top 10 en France aujourd'hui",
      action: "Action & Aventure",
      comedy: "Comédies",
      drama: "Drames primés",
      scifi: "Science-Fiction & Futur",
      thriller: "Thrillers & Mystères",
      searchResults: "Résultats de recherche",
      footer_audio: "Audio et sous-titres",
      footer_press: "Presse",
      footer_privacy: "Confidentialité",
      footer_contact: "Nous contacter",
      footer_desc: "Description audio",
      footer_invest: "Relations investisseurs",
      footer_legal: "Informations légales",
      footer_help: "Centre d'aide",
      footer_jobs: "Recrutement",
      footer_cookies: "Préférences de cookies",
      footer_gift: "Cartes cadeaux",
      footer_terms: "Conditions d'utilisation",
      footer_mentions: "Mentions légales",
      service_code: "Code de service"
    },
    en: {
      myList: "My List",
      trending: "Top 10 in France Today",
      action: "Action & Adventure",
      comedy: "Comedies",
      drama: "Award-Winning Dramas",
      scifi: "Sci-Fi & Fantasy",
      thriller: "Thrillers & Mysteries",
      searchResults: "Search Results",
      footer_audio: "Audio and Subtitles",
      footer_press: "Media Center",
      footer_privacy: "Privacy",
      footer_contact: "Contact Us",
      footer_desc: "Audio Description",
      footer_invest: "Investor Relations",
      footer_legal: "Legal Notices",
      footer_help: "Help Center",
      footer_jobs: "Jobs",
      footer_cookies: "Cookie Preferences",
      footer_gift: "Gift Cards",
      footer_terms: "Terms of Use",
      footer_mentions: "Corporate Information",
      service_code: "Service Code"
    }
  };

  // Only show rows that have items after filtering
  const renderRow = (title: string, movies: Movie[]) => {
    const filtered = filterMovies(movies);
    if (filtered.length === 0) return null;
    return (
        <MovieRow 
            title={title} 
            movies={filtered} 
            onMovieClick={handleMovieSelect} // Use handleMovieSelect instead of handleOpenInfo
            myListIds={myListIds}
            onToggleList={handleToggleMyList}
        />
    );
  };

  if (!isAuthenticated) {
    return (
      <AuthScreen 
        onLogin={() => setIsAuthenticated(true)} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 pb-20 overflow-x-hidden">
      <Navbar 
        toggleAssistant={() => setIsAssistantOpen(true)} 
        language={language}
        setLanguage={setLanguage}
        onSearch={setSearchQuery}
        onToastRequest={showToast}
        onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      
      <main>
        {currentView === 'home' && (
            <>
                {!searchQuery && (
                    <Hero 
                        key={heroMovie.id} // Key ensures animation triggers on change
                        movie={heroMovie} 
                        onPlay={() => handlePlayMovie(heroMovie)} 
                        onInfoClick={() => handleOpenInfo(heroMovie)}
                        language={language}
                        isInList={myListIds.includes(heroMovie.id)}
                        onToggleList={() => handleToggleMyList(heroMovie.id)}
                    />
                )}

                {/* If searching, show a padding top to clear the navbar, otherwise overlap hero */}
                <div className={`relative z-10 space-y-8 pb-8 min-h-[50vh] ${searchQuery ? 'pt-24 px-4 md:px-8' : '-mt-20'}`}>
                
                {searchQuery && (
                    <h2 className="text-2xl text-gray-400 mb-4">
                        {t[language].searchResults}: <span className="text-white">"{searchQuery}"</span>
                    </h2>
                )}

                {renderRow(t[language].myList, myListMovies)}
                {renderRow(t[language].trending, TRENDING_MOVIES)}
                {renderRow(t[language].action, ACTION_MOVIES)}
                {renderRow(t[language].comedy, COMEDY_MOVIES)}
                {renderRow(t[language].drama, DRAMA_MOVIES)}
                {renderRow(t[language].scifi, SCIFI_MOVIES)}
                {renderRow(t[language].thriller, THRILLER_MOVIES)}
                
                {/* Empty state for search */}
                {searchQuery && filterMovies(allMovies).length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-xl">{language === 'fr' ? "Aucun résultat trouvé." : "No results found."}</p>
                    </div>
                )}
                </div>
            </>
        )}

        {currentView === 'settings' && <SettingsScreen language={language} />}
        {currentView === 'account' && <AccountScreen language={language} />}

      </main>

      <footer className="max-w-7xl mx-auto px-8 py-12 text-gray-500 text-sm mt-12 border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
                <p onClick={() => handleFooterClick(t[language].footer_audio)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_audio}</p>
                <p onClick={() => handleFooterClick(t[language].footer_press)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_press}</p>
                <p onClick={() => handleFooterClick(t[language].footer_privacy)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_privacy}</p>
                <p onClick={() => handleFooterClick(t[language].footer_contact)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_contact}</p>
            </div>
            <div className="space-y-3">
                <p onClick={() => handleFooterClick(t[language].footer_desc)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_desc}</p>
                <p onClick={() => handleFooterClick(t[language].footer_invest)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_invest}</p>
                <p onClick={() => handleFooterClick(t[language].footer_legal)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_legal}</p>
            </div>
            <div className="space-y-3">
                <p onClick={() => handleFooterClick(t[language].footer_help)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_help}</p>
                <p onClick={() => handleFooterClick(t[language].footer_jobs)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_jobs}</p>
                <p onClick={() => handleFooterClick(t[language].footer_cookies)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_cookies}</p>
            </div>
            <div className="space-y-3">
                <p onClick={() => handleFooterClick(t[language].footer_gift)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_gift}</p>
                <p onClick={() => handleFooterClick(t[language].footer_terms)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_terms}</p>
                <p onClick={() => handleFooterClick(t[language].footer_mentions)} className="hover:underline cursor-pointer hover:text-gray-400 transition">{t[language].footer_mentions}</p>
            </div>
        </div>
        <button onClick={() => handleFooterClick(t[language].service_code)} className="border border-gray-500 px-4 py-2 hover:text-white hover:border-white transition mb-4">
            {t[language].service_code}
        </button>
        <p>&copy; 2024 CineStream AI, Inc.</p>
      </footer>

      {/* Overlays */}
      <Assistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        language={language}
      />
      
      {currentMovie && (
        <VideoPlayer movie={currentMovie} onClose={() => setCurrentMovie(null)} />
      )}

      {selectedInfoMovie && (
        <InfoModal 
            movie={selectedInfoMovie} 
            onClose={() => setSelectedInfoMovie(null)}
            onPlay={() => handlePlayMovie(selectedInfoMovie)}
            isInList={myListIds.includes(selectedInfoMovie.id)}
            onToggleList={() => handleToggleMyList(selectedInfoMovie.id)}
            language={language}
        />
      )}

      <Toast 
        message={toast.msg} 
        isVisible={toast.visible} 
        onClose={hideToast} 
        type="info"
      />
    </div>
  );
};

export default App;