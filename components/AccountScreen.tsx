import React from 'react';
import { User, Calendar, Star, CreditCard } from 'lucide-react';

interface AccountScreenProps {
  language: 'fr' | 'en';
}

const AccountScreen: React.FC<AccountScreenProps> = ({ language }) => {
  const t = {
    fr: {
      title: "Compte",
      membership: "Abonnement & Facturation",
      cancel: "Annuler l'abonnement",
      plan: "Détails du forfait",
      currentPlan: "Premium Ultra HD",
      nextBill: "Prochaine facture le 25 Octobre 2024",
      method: "Moyen de paiement",
      update: "Mettre à jour",
      history: "Historique de facturation",
      security: "Sécurité",
      email: "Email",
      password: "Mot de passe",
      phone: "Téléphone"
    },
    en: {
      title: "Account",
      membership: "Membership & Billing",
      cancel: "Cancel Membership",
      plan: "Plan Details",
      currentPlan: "Premium Ultra HD",
      nextBill: "Next billing date: October 25, 2024",
      method: "Payment Method",
      update: "Update",
      history: "Billing History",
      security: "Security",
      email: "Email",
      password: "Password",
      phone: "Phone"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
          {t[language].title}
        </h1>

        <div className="grid gap-6">
          
          {/* Membership Section */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                <CreditCard className="text-gray-400" /> {t[language].membership}
              </h2>
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded text-sm border border-gray-600 transition">
                {t[language].cancel}
              </button>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-gray-400 mb-1">{t[language].email}</div>
                <div className="text-white font-medium mb-4">user@example.com</div>
                
                <div className="text-sm text-gray-400 mb-1">{t[language].password}</div>
                <div className="text-white font-medium mb-4">••••••••</div>
                
                <div className="text-sm text-gray-400 mb-1">{t[language].phone}</div>
                <div className="text-white font-medium">+33 6 12 34 56 78</div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300 flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                        •••• 4242
                    </span>
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">{t[language].update}</button>
                 </div>
                 <div className="text-xs text-gray-500">{t[language].nextBill}</div>
                 <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <button className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                        <Calendar size={14} /> {t[language].history}
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
                <div className="bg-indigo-600/20 p-3 rounded-full">
                    <Star className="text-indigo-400 w-6 h-6" />
                </div>
                <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide font-bold">{t[language].plan}</div>
                    <div className="text-xl font-bold text-white">{t[language].currentPlan}</div>
                </div>
             </div>
             <button className="text-indigo-400 hover:text-indigo-300 font-medium">Change Plan</button>
          </div>

           {/* Security */}
           <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
             <h2 className="text-xl font-semibold text-gray-200 mb-4">{t[language].security}</h2>
             <div className="space-y-4 text-sm text-gray-400">
                <div className="flex justify-between items-center p-3 hover:bg-slate-800 rounded cursor-pointer transition">
                    <span>Sign out of all devices</span>
                    <span className="text-white">Sign out</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-slate-800 rounded cursor-pointer transition">
                    <span>Download your personal information</span>
                    <span className="text-white">Download</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountScreen;