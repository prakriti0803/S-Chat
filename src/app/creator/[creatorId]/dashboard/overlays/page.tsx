'use client';

import { motion } from 'framer-motion';
import { Layers, Copy, Eye, Settings, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function OverlaysPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;
  const [overlays] = useState([
    { id: 1, name: 'Chat Box', active: true, url: `https://schat.live/widget/chat/${creatorId}`, size: '500x800' },
    { id: 2, name: 'Donation Alerts', active: true, url: `https://schat.live/widget/alerts/${creatorId}`, size: '1920x1080' },
    { id: 3, name: 'Goal Progress', active: false, url: `https://schat.live/widget/goal/${creatorId}`, size: '400x100' },
  ]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

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
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Overlays Gallery</h1>
              <p className="text-gray-500">Manage OBS browser sources and widget URLs for your stream.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        {/* Add New Overlay */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full p-6 rounded-3xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition group cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-900 font-bold transition">
            <Plus className="h-5 w-5" />
            Create Custom Widget
          </div>
        </motion.button>

        {/* Overlays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overlays.map((overlay, i) => (
            <motion.div 
              key={overlay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Preview Area */}
              <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative overflow-hidden">
                {overlay.active && (
                  <div className="absolute -right-8 -top-8 h-16 w-16 bg-emerald-500 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                )}
                <div className="flex flex-col items-center gap-2">
                  <Layers className="h-8 w-8 text-gray-400" />
                  <p className="text-xs text-gray-500 font-medium">{overlay.size}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{overlay.name}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      overlay.active 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {overlay.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 break-all">{overlay.url}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button 
                    onClick={() => copyUrl(overlay.url)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition flex items-center justify-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-100 transition">
                    <Settings className="h-4 w-4" />
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