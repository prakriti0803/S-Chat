'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function OverlayStudio() {
  const [style, setStyle] = useState('prism');
  const [color, setColor] = useState('#3B82F6');
  const [minAmount, setMinAmount] = useState('20');
  const [ttsEnabled, setTtsEnabled] = useState(true);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Overlay Studio</h1>
            <p className="text-gray-500">Configure the 3D aesthetic and behavior of your stream alerts.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">3D Visual Style</h2>
              <div className="space-y-3">
                {[
                  { id: 'prism', name: 'Crystal Prism' },
                  { id: 'shield', name: 'Neon Shield' },
                  { id: 'card', name: 'Glass Card' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                      style === s.id ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className={`font-semibold ${style === s.id ? 'text-blue-900' : 'text-gray-700'}`}>{s.name}</span>
                    {style === s.id && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-bold text-gray-900 mt-6 mb-4">Brand Color</h2>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className="text-sm font-mono text-gray-500 uppercase">{color}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Audio & TTS</h2>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700">Enable Text-to-Speech</span>
                <button 
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${ttsEnabled ? 'bg-blue-600' : 'bg-gray-300'} px-1`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${ttsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 font-medium block mb-1">Min. Amount for TTS (₹)</label>
                  <input 
                    type="number" 
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium block mb-1">Alert Sound</label>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-stone-50 hover:bg-stone-100 transition-colors text-sm text-gray-700 font-medium">
                    Upload MP3...
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900 rounded-3xl shadow-lg border border-gray-800 overflow-hidden relative min-h-[500px] flex items-center justify-center p-8"
          >
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-600 text-sm font-mono opacity-50">
              OBS Preview Container
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-sm p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl animate-pulse text-center">
              <h2 className="text-4xl font-black tracking-tight mb-2" style={{ color: color }}>₹500</h2>
              <p className="text-white/90 font-bold text-xl">Donor Name left a tip!</p>
              <p className="text-white/60 text-sm mt-3">This is a simulated preview of how your {style} 3D alert will look on stream.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
