import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from './Icons';
import { getGeminiRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'fr' | 'en';
}

const Assistant: React.FC<AssistantProps> = ({ isOpen, onClose, language }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset or set initial message when language or open state changes
  useEffect(() => {
    if (messages.length === 0) {
      const initialText = language === 'fr' 
        ? 'Bonjour ! Je suis CineBot. Envie d\'un film spécifique ce soir ? Dites-moi ce que vous aimez !'
        : 'Hello! I am CineBot. Looking for a specific movie tonight? Tell me what you like!';
      
      setMessages([{ id: 'init', role: 'model', text: initialText }]);
    }
  }, [language, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getGeminiRecommendation(input, language);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 z-50 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <Sparkles className="text-white w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-white">CineBot AI</h3>
                    <p className="text-xs text-indigo-400">Powered by Gemini</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-gray-400 hover:text-white transition">
                <X size={20} />
            </button>
        </div>

        {/* Messages Area */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)] bg-slate-950"
        >
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-slate-800 text-gray-200 rounded-bl-none border border-slate-700'
                        }`}
                    >
                        {msg.text.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < msg.text.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-slate-900 border-t border-slate-800">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={language === 'fr' ? "Conseille-moi un film..." : "Recommend me a movie..."}
                    className="w-full bg-slate-800 text-white placeholder-gray-500 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-slate-700 transition"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>

      </div>
    </>
  );
};

export default Assistant;