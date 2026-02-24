import React, { useState } from 'react';
import { Check, Volume2, Shield, Monitor, Smartphone } from './Icons';

interface SettingsScreenProps {
  language: 'fr' | 'en';
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ language }) => {
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [autoPlayPreviews, setAutoPlayPreviews] = useState(true);
  const [videoQuality, setVideoQuality] = useState('high');
  
  const t = {
    fr: {
      title: "Paramètres",
      playback: "Lecture",
      autoPlayNext: "Lancer automatiquement le prochain épisode",
      autoPlayPreviews: "Lecture automatique des aperçus pendant la navigation",
      videoQuality: "Qualité vidéo par défaut",
      low: "Basse (Économie de données)",
      medium: "Moyenne (Standard)",
      high: "Haute (HD/4K)",
      parental: "Contrôle Parental",
      pin: "Code PIN du profil",
      devices: "Appareils",
      manageDevices: "Gérer les appareils de téléchargement",
      save: "Enregistrer"
    },
    en: {
      title: "Settings",
      playback: "Playback",
      autoPlayNext: "Autoplay next episode",
      autoPlayPreviews: "Autoplay previews while browsing",
      videoQuality: "Default Video Quality",
      low: "Low (Data Saver)",
      medium: "Medium (Standard)",
      high: "High (HD/4K)",
      parental: "Parental Controls",
      pin: "Profile PIN",
      devices: "Devices",
      manageDevices: "Manage download devices",
      save: "Save"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
          {t[language].title}
        </h1>

        <div className="space-y-8">
          
          {/* Playback Settings */}
          <section className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center gap-3">
              <Volume2 className="text-red-500" /> {t[language].playback}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{t[language].autoPlayNext}</span>
                <button 
                  onClick={() => setAutoPlayNext(!autoPlayNext)}
                  className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${autoPlayNext ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${autoPlayNext ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">{t[language].autoPlayPreviews}</span>
                <button 
                  onClick={() => setAutoPlayPreviews(!autoPlayPreviews)}
                  className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${autoPlayPreviews ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${autoPlayPreviews ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-gray-300 block mb-2">{t[language].videoQuality}</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['low', 'medium', 'high'].map((q) => (
                    <div 
                      key={q}
                      onClick={() => setVideoQuality(q)}
                      className={`cursor-pointer border rounded-lg p-4 flex items-center justify-between transition ${
                        videoQuality === q 
                        ? 'bg-red-600/20 border-red-600' 
                        : 'bg-black/20 border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <span className="text-sm text-white font-medium">
                        {q === 'low' ? t[language].low : q === 'medium' ? t[language].medium : t[language].high}
                      </span>
                      {videoQuality === q && <Check size={16} className="text-red-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Parental Controls */}
          <section className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center gap-3">
              <Shield className="text-indigo-500" /> {t[language].parental}
            </h2>
            <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg cursor-pointer hover:bg-black/40 transition">
               <div className="text-gray-300">{t[language].pin}</div>
               <div className="text-gray-500 flex items-center gap-2">
                 •••• <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Change</span>
               </div>
            </div>
          </section>

          {/* Devices */}
          <section className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center gap-3">
              <Monitor className="text-green-500" /> {t[language].devices}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border-b border-gray-800">
                <Monitor className="text-gray-500" />
                <div className="flex-1">
                  <div className="text-white text-sm font-bold">Smart TV (Samsung)</div>
                  <div className="text-xs text-gray-500">Last used: Today</div>
                </div>
                <button className="text-xs text-red-500 hover:underline">Sign out</button>
              </div>
              
              <div className="flex items-center gap-4 p-3 border-b border-gray-800">
                <Smartphone className="text-gray-500" />
                <div className="flex-1">
                  <div className="text-white text-sm font-bold">iPhone 13 Pro</div>
                  <div className="text-xs text-gray-500">Last used: Yesterday</div>
                </div>
                <button className="text-xs text-red-500 hover:underline">Sign out</button>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4 pb-12">
            <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition shadow-lg">
              {t[language].save}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;