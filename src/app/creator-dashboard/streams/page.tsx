'use client';

import { motion } from 'framer-motion';
import { PlayCircle, IndianRupee, Users, Clock, Calendar, Video, ArrowUpRight, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const mockPastStreams = [
  {
    id: 1,
    title: "VALORANT Ranked Grind | Road to Radiant",
    date: "A few hours ago",
    duration: "4h 12m",
    viewers: "1,240",
    earnings: 12500,
    topDonor: "xX_Slayer_Xx",
    topDonation: 5000,
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Just Chatting + Q&A!",
    date: "Yesterday",
    duration: "2h 30m",
    viewers: "890",
    earnings: 8400,
    topDonor: "Rahul_99",
    topDonation: 2000,
    thumbnail: "https://images.unsplash.com/photo-1516280440502-a2fc982be0a6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Elden Ring with Viewers",
    date: "3 days ago",
    duration: "5h 45m",
    viewers: "2,100",
    earnings: 24500,
    topDonor: "Anonymous",
    topDonation: 10000,
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
  }
];

const mockUpcomingStream = {
  title: "Weekend Tournament Finals",
  date: "Oct 24, 2024 • 8:00 PM IST",
  expectedViewers: "5,000+",
};

export default function StreamsPage() {
  const [copied, setCopied] = useState(false);

  const copyOverlayPath = () => {
    navigator.clipboard.writeText("https://schat.live/obs/secret_token_123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Stream Studio</h1>
        <p className="text-gray-500 mt-1">Manage your broadcasts and view insights on your earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Upcoming & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Stream
            </h2>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 line-clamp-1">{mockUpcomingStream.title}</h3>
              <p className="text-sm font-medium text-blue-700 mt-1">{mockUpcomingStream.date}</p>
              
              <div className="mt-4 flex flex-col gap-3">
                <Link 
                  href="/creator-dashboard/studio"
                  className="block w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow text-center"
                >
                  Go Live Studio
                </Link>
                <div className="text-xs text-center text-gray-500 font-medium">
                  Est. Audience: {mockUpcomingStream.expectedViewers}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Video className="h-5 w-5 text-rose-500" />
              OBS Alert URL
            </h2>
            <p className="text-xs text-gray-500 mb-4">Paste this securely in your OBS Browser Source to receive real-time donation alerts and TTS.</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-stone-50 border border-gray-200 rounded-xl px-3 py-2 flex items-center overflow-hidden relative">
                <span className="text-xs font-mono text-gray-600 truncate blur-[2px] hover:blur-none transition-all cursor-pointer">
                  https://schat.live/obs/secret_token_123
                </span>
              </div>
              <button 
                onClick={copyOverlayPath}
                className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition active:scale-95"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Past Streams Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-gray-400" />
                Past Broadcasts
              </h2>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center">
                View all <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {mockPastStreams.map((stream) => (
                <motion.div 
                  key={stream.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 bg-stone-50 hover:bg-white transition-all cursor-pointer group"
                >
                  {/* Thumbnail Mock */}
                  <div className="w-full sm:w-48 h-28 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
                    <img 
                      src={stream.thumbnail} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                      {stream.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {stream.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mt-1">{stream.date}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm mt-4 sm:mt-0 pt-2 border-t sm:border-t-0 border-gray-200">
                      <div className="flex items-center gap-1.5 font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {stream.earnings.toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                        <Users className="h-3.5 w-3.5" />
                        {stream.viewers} Avg
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs hidden lg:flex">
                        Top: <span className="font-bold text-gray-800">{stream.topDonor} (₹{stream.topDonation})</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
