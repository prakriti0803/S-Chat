'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Users, MessageSquare, Calendar, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StreamsPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;
  
  const streams = [
    { id: 1, title: 'Building New PC Setup Part 2', date: 'Jan 15, 2024', duration: '2h 34m', viewers: 1240, chats: 3421, revenue: '₹3,420' },
    { id: 2, title: 'Coding Live Session - React Hooks', date: 'Jan 14, 2024', duration: '1h 45m', viewers: 856, chats: 2104, revenue: '₹2,105' },
    { id: 3, title: 'Community Q&A Round 5', date: 'Jan 12, 2024', duration: '3h 12m', viewers: 2105, chats: 5234, revenue: '₹5,890' },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 flex justify-between items-start"
          >
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Stream Archives</h1>
              <p className="text-gray-500">View past streams, analytics, and recordings.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        {/* Streams List */}
        <div className="space-y-3">
          {streams.map((stream, i) => (
            <motion.div 
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="hidden md:block h-24 w-40 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center shrink-0 relative group-hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center">
                    <Play className="h-5 w-5 text-gray-900 ml-0.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{stream.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {stream.date}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Duration</p>
                        <p className="font-bold text-gray-900">{stream.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Viewers</p>
                        <p className="font-bold text-gray-900">{stream.viewers}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Chats</p>
                        <p className="font-bold text-gray-900">{stream.chats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">💰</span>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Revenue</p>
                        <p className="font-bold text-emerald-600">{stream.revenue}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Share2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}