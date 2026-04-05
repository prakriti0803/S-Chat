'use client';

import { motion } from 'framer-motion';
import { PlayCircle, Settings, Users, MessageSquare, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { useState } from 'react';

const mockRecentEvents = [
  { id: 1, type: 'donation', user: 'Rahul_99', amount: 500, message: 'Love the stream bro!', time: '2m ago' },
  { id: 2, type: 'donation', user: 'xX_Slayer_Xx', amount: 200, message: 'Nice shot!!', time: '5m ago' },
  { id: 3, type: 'alert', message: 'Stream peak: 1.2k viewers', time: '12m ago' },
];

export default function StudioPage() {
  const [isLive, setIsLive] = useState(true);
  const [testAmount, setTestAmount] = useState('100');

  const handleTestAlert = () => {
    // This is where we'd trigger a firebase push to show up on their OBS
    alert(`Sending test alert of ₹${testAmount} to screen!`);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
      {/* Header / Stream Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`relative flex h-4 w-4`}>
            {isLive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gray-300"></span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Live Studio</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {isLive ? 'Currently broadcasting: Weekend Tournament Finals' : 'You are currently offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg border border-blue-100">
            <Users className="h-4 w-4" /> 1,240 Viewers
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              isLive 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-red-600 text-white hover:bg-red-700 shadow-md'
            }`}
          >
            {isLive ? 'End Stream Analytics' : 'Go Live'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col flex-1 min-h-[400px]">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-500" />
                Live Event Feed
              </h2>
              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-stone-50 rounded-lg transition">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {mockRecentEvents.map((event) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={event.id}
                  className={`p-4 rounded-xl border ${
                    event.type === 'donation' 
                    ? 'border-green-100 bg-green-50/50' 
                    : 'border-blue-100 bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {event.type === 'donation' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{event.user}</span>
                            <span className="text-green-600 font-bold bg-green-100/50 px-2 py-0.5 rounded text-xs">
                              ₹{event.amount}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{event.message}</p>
                        </>
                      ) : (
                        <p className="text-gray-900 font-medium text-sm">{event.message}</p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{event.time}</span>
                  </div>
                </motion.div>
              ))}
              <div className="text-center text-sm font-medium text-gray-400 py-8">
                Waiting for more events...
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Tools & Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Stats Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Session Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-stone-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500">Earnings</p>
                <p className="text-lg font-black text-green-600 mt-1">₹12,450</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500">New Donors</p>
                <p className="text-lg font-black text-gray-900 mt-1">14</p>
              </div>
            </div>
          </div>

          {/* Test Alert Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
              <PlayCircle className="h-4 w-4" /> Trigger Test Alert
            </h3>
            <p className="text-xs text-gray-500 mb-4">Send a fake alert to your OBS overlay to ensure everything is working correctly.</p>
            
            <div className="space-y-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                <input 
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-600 font-bold bg-stone-50 text-sm"
                />
              </div>
              <button 
                onClick={handleTestAlert}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-black transition active:scale-95"
              >
                <Send className="h-4 w-4" />
                Send Test
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>
    </main>
  );
}