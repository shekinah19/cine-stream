import React, { useState } from 'react';
import { ChevronRight, Sparkles, Check } from './Icons';

interface AuthScreenProps {
  onLogin: () => void;
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, language, setLanguage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    fr: {
      signIn: "S'identifier",
      signUp: "Créer un compte",
      emailLabel: "Email",
      emailPlaceholder: "exemple@email.com",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "••••••••",
      usernameLabel: "Nom d'utilisateur",
      usernamePlaceholder: "Votre pseudo",
      loginButton: "Se connecter",
      registerButton: "Commencer l'aventure",
      loading: "Connexion...",
      welcomeBack: "Ravi de vous revoir",
      welcomeNew: "Bienvenue sur CineStream AI",
      subtitleLogin: "Prêt à explorer le futur du streaming ?",
      subtitleRegister: "Rejoignez la plateforme la plus intelligente.",
      newHere: "Première visite ?",
      createNow: "Inscrivez-vous maintenant",
      alreadyUser: "Vous avez déjà un compte ?",
      loginNow: "Connectez-vous",
      features: ["Recommandations par IA", "Streaming 4K HDR", "Sans engagement"],
      errorEmail: "Veuillez entrer une adresse email valide.",
      errorPass: "Le mot de passe est trop court.",
      errorName: "Le nom d'utilisateur est requis."
    },
    en: {
      signIn: "Sign In",
      signUp: "Create Account",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      usernameLabel: "Username",
      usernamePlaceholder: "Your handle",
      loginButton: "Sign In",
      registerButton: "Start Your Journey",
      loading: "Signing in...",
      welcomeBack: "Welcome back",
      welcomeNew: "Welcome to CineStream AI",
      subtitleLogin: "Ready to explore the future of streaming?",
      subtitleRegister: "Join the smartest streaming platform.",
      newHere: "New here?",
      createNow: "Sign up now",
      alreadyUser: "Already have an account?",
      loginNow: "Log in",
      features: ["AI Recommendations", "4K HDR Streaming", "Cancel anytime"],
      errorEmail: "Please enter a valid email address.",
      errorPass: "Password is too short.",
      errorName: "Username is required."
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple Validation
    if (!email.includes('@')) {
      setError(t[language].errorEmail);
      setIsLoading(false);
      return;
    }
    if (password.length < 4) {
      setError(t[language].errorPass);
      setIsLoading(false);
      return;
    }
    if (!isLogin && username.length < 2) {
        setError(t[language].errorName);
        setIsLoading(false);
        return;
    }

    // Simulate API call
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] overflow-hidden font-sans text-white selection:bg-red-500 selection:text-white">
      
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2531&auto=format&fit=crop" 
          alt="Cinema Background" 
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]"></div>
        {/* Noise texture overlay for cinematic grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'}}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-sm cursor-pointer">
                CINESTREAM
            </h1>
            <div className="hidden md:flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                <Sparkles size={12} className="text-indigo-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-200">AI POWERED</span>
            </div>
        </div>

        {/* Language Toggle */}
        <div className="flex bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button 
                onClick={() => setLanguage('fr')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${language === 'fr' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                Français
            </button>
            <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${language === 'en' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                English
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-100px)] px-4 pb-10 md:gap-20">
        
        {/* Left Side: Marketing Text (Desktop Only) */}
        <div className="hidden lg:block max-w-lg space-y-8 animate-in slide-in-from-left-10 fade-in duration-700">
            <h2 className="text-5xl font-bold leading-tight">
                {isLogin ? "Le cinéma réinventé par l'IA." : "Une expérience unique vous attend."}
            </h2>
            <p className="text-xl text-gray-300 font-light">
                {t[language].features.map((feature, idx) => (
                    <span key={idx} className="block mb-3 flex items-center gap-3">
                        <div className="bg-red-600/20 p-1 rounded-full">
                            <Check size={16} className="text-red-500" />
                        </div>
                        {feature}
                    </span>
                ))}
            </p>
        </div>

        {/* Right Side: Auth Card */}
        <div className="w-full max-w-[420px] animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden group">
                
                {/* Ambient decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition duration-1000"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition duration-1000"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? t[language].welcomeBack : t[language].welcomeNew}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {isLogin ? t[language].subtitleLogin : t[language].subtitleRegister}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-6 flex items-center gap-2 animate-in shake">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-300 ml-1 uppercase tracking-wide">{t[language].usernameLabel}</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white/10 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-gray-600"
                                    placeholder={t[language].usernamePlaceholder}
                                />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-300 ml-1 uppercase tracking-wide">{t[language].emailLabel}</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white/10 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-gray-600"
                                placeholder={t[language].emailPlaceholder}
                            />
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-300 ml-1 uppercase tracking-wide">{t[language].passwordLabel}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white/10 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-gray-600"
                                placeholder={t[language].passwordPlaceholder}
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl mt-6 shadow-lg shadow-red-900/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {isLogin ? t[language].loginButton : t[language].registerButton}
                                    {!isLogin && <ChevronRight size={18} />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-gray-400 text-sm">
                            {isLogin ? t[language].newHere : t[language].alreadyUser}{" "}
                            <button 
                                onClick={() => {
                                    setIsLogin(!isLogin); 
                                    setError('');
                                }} 
                                className="text-white font-semibold hover:underline hover:text-red-400 transition-colors ml-1"
                            >
                                {isLogin ? t[language].createNow : t[language].loginNow}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Footer Links simplified */}
            <div className="mt-8 text-center text-xs text-gray-500 space-x-4">
                <a href="#" className="hover:text-gray-300 transition">Terms</a>
                <a href="#" className="hover:text-gray-300 transition">Privacy</a>
                <a href="#" className="hover:text-gray-300 transition">Help</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;