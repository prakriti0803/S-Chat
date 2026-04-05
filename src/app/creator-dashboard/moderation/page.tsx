'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Shield, Plus, Clock } from 'lucide-react';

export default function ModerationHub() {
  const [bannedWords, setBannedWords] = useState('troll, scam, badword');
  const [bufferEnabled, setBufferEnabled] = useState(true);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Moderation Hub</h1>
            <p className="text-gray-500">Protect your stream from toxicity with automated filters and human oversight.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-700 transition-colors"
          >
            Save Security Settings
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">The 5-Second Buffer</h2>
                <button 
                  onClick={() => setBufferEnabled(!bufferEnabled)}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${bufferEnabled ? 'bg-blue-600' : 'bg-gray-300'} px-1`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${bufferEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-6">Delay all alerts to OBS by 5 seconds to give moderators time to reject inappropriate messages.</p>
              
              {bufferEnabled && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Buffer is Active</h4>
                    <p className="text-sm text-blue-800/80 mt-1">Donations will be held in the moderation queue for 5 seconds before appearing on stream.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Global Blocklist</h2>
              <p className="text-gray-500 text-sm mb-6">Messages containing these words will be automatically rejected and will not trigger TTS or stream alerts.</p>
              
              <textarea 
                rows={4}
                value={bannedWords}
                onChange={(e) => setBannedWords(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 transition-colors font-mono text-sm resize-none"
                placeholder="Separate words with commas..."
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Mod Team</h2>
              </div>
              
              <div className="flex gap-2 mb-6">
                <input 
                  type="email" 
                  placeholder="moderator@email.com"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 text-sm transition-colors"
                />
                <button className="flex items-center justify-center h-10 w-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shrink-0">
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {['alex@gmail.com', 'knight_mod@yahoo.com'].map((email, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-gray-100">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{email}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full flex flex-col items-center p-6 rounded-3xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-center group">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-blue-900">Live Mod View Link</h3>
              <p className="text-xs text-blue-600 mt-1">Open separate mod dashboard</p>
            </button>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
