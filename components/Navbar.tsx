import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Sparkles, User, Settings, LogOut, HelpCircle, X } from './Icons';

interface NavbarProps {
  toggleAssistant: () => void;
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  onSearch: (query: string) => void;
  onToastRequest: (msg: string) => void;
  onNavigate: (view: 'home' | 'settings' | 'account') => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleAssistant, language, setLanguage, onSearch, onToastRequest, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const toggleSearch = () => {
    if (searchOpen) {
        setSearchOpen(false);
        setSearchValue("");
        onSearch("");
    } else {
        setSearchOpen(true);
    }
  };

  const t = {
    fr: {
      home: "Accueil",
      series: "Séries",
      movies: "Films",
      new: "Nouveautés",
      list: "Ma Liste",
      assistant: "Assistant AI",
      search: "Titres, personnes, genres",
      notifications: "Notifications",
      noNotif: "Aucune nouvelle notification",
      account: "Compte",
      settings: "Paramètres",
      help: "Aide",
      logout: "Se déconnecter",
      manage: "Gérer les profils"
    },
    en: {
      home: "Home",
      series: "TV Shows",
      movies: "Movies",
      new: "New & Popular",
      list: "My List",
      assistant: "AI Assistant",
      search: "Titles, people, genres",
      notifications: "Notifications",
      noNotif: "No new notifications",
      account: "Account",
      settings: "Settings",
      help: "Help Center",
      logout: "Sign out",
      manage: "Manage Profiles"
    }
  };

  const handleNavClick = (item: string) => {
      // Only Home works for real nav in this demo structure, others just toast or route to home filtered
      if (item === t[language].home) {
          onNavigate('home');
      } else {
          onToastRequest(language === 'fr' ? `Navigation vers ${item}` : `Navigating to ${item}`);
      }
  };

  return (
    <nav className={`fixed w-full z-40 transition-colors duration-300 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-8">
          <h1 
            className="text-red-600 text-3xl font-bold tracking-tighter cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            CINESTREAM
          </h1>
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <li onClick={() => handleNavClick(t[language].home)} className="hover:text-white cursor-pointer transition">{t[language].home}</li>
            <li onClick={() => handleNavClick(t[language].series)} className="hover:text-white cursor-pointer transition">{t[language].series}</li>
            <li onClick={() => handleNavClick(t[language].movies)} className="hover:text-white cursor-pointer transition">{t[language].movies}</li>
            <li onClick={() => handleNavClick(t[language].new)} className="hover:text-white cursor-pointer transition">{t[language].new}</li>
            <li onClick={() => handleNavClick(t[language].list)} className="hover:text-white cursor-pointer transition">{t[language].list}</li>
          </ul>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 text-white">
          
           {/* Search Bar */}
           <div className={`flex items-center border transition-all duration-300 ${searchOpen ? 'border-white bg-black/50 px-2 py-1 w-64' : 'border-transparent w-8'}`}>
                <Search 
                    className="w-5 h-5 cursor-pointer hover:text-gray-300 transition flex-shrink-0" 
                    onClick={toggleSearch}
                />
                <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder={t[language].search}
                    value={searchValue}
                    onChange={handleSearchChange}
                    className={`bg-transparent border-none outline-none text-sm ml-2 text-white placeholder-gray-400 w-full ${searchOpen ? 'block' : 'hidden'}`}
                />
                {searchOpen && searchValue && (
                    <X 
                        size={16} 
                        className="cursor-pointer text-gray-400 hover:text-white" 
                        onClick={() => { setSearchValue(""); onSearch(""); }}
                    />
                )}
           </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 border border-gray-600 rounded px-2 py-1 bg-black/20 backdrop-blur">
            <button 
                onClick={() => setLanguage('fr')} 
                className={`text-xs font-bold transition-colors ${language === 'fr' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                VF
            </button>
            <span className="text-gray-600 text-xs">|</span>
            <button 
                onClick={() => setLanguage('en')} 
                className={`text-xs font-bold transition-colors ${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
                VO
            </button>
          </div>

          <button 
            onClick={toggleAssistant}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-3 py-1.5 rounded-full transition text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-indigo-500/30"
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">{t[language].assistant}</span>
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative group">
            <Bell 
                className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" 
                onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
                <div className="absolute right-0 top-8 w-72 bg-slate-900 border border-slate-800 shadow-xl rounded-md overflow-hidden z-50">
                    <div className="p-3 border-b border-slate-800 text-sm font-bold text-gray-300">
                        {t[language].notifications}
                    </div>
                    <div className="p-8 text-center text-gray-500 text-xs">
                        {t[language].noNotif}
                    </div>
                </div>
            )}
             {/* Invisible backdrop to close dropdown */}
             {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
             <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setShowProfile(!showProfile)}
             >
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-sm font-bold border border-transparent group-hover:border-white transition">
                JD
                </div>
            </div>
            
            {showProfile && (
                <div className="absolute right-0 top-10 w-48 bg-slate-900 border border-slate-800 shadow-xl rounded-md overflow-hidden z-50">
                    <div className="p-3 flex items-center gap-3 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition" onClick={() => { onNavigate('account'); setShowProfile(false); }}>
                         <User size={16} className="text-gray-400" />
                         <span className="text-sm text-gray-200">{t[language].account}</span>
                    </div>
                    <div className="p-3 flex items-center gap-3 hover:bg-slate-800 cursor-pointer transition" onClick={() => { onNavigate('settings'); setShowProfile(false); }}>
                         <Settings size={16} className="text-gray-400" />
                         <span className="text-sm text-gray-200">{t[language].settings}</span>
                    </div>
                    <div className="p-3 flex items-center gap-3 hover:bg-slate-800 cursor-pointer transition" onClick={() => onToastRequest(t[language].help)}>
                         <HelpCircle size={16} className="text-gray-400" />
                         <span className="text-sm text-gray-200">{t[language].help}</span>
                    </div>
                    <div className="border-t border-slate-800 p-3 text-center hover:bg-slate-800 cursor-pointer transition" onClick={() => onToastRequest(t[language].logout)}>
                        <span className="text-xs font-bold text-white">{t[language].logout}</span>
                    </div>
                </div>
            )}
            {/* Invisible backdrop to close dropdown */}
            {showProfile && <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)}></div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;