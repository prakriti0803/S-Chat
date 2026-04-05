'use client';

import { motion } from 'framer-motion';
import { Video, Mic, Settings, Palette, Zap, Film, Upload } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudioPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;

  const studioSettings = [
    {
      icon: Video,
      title: 'Stream Settings',
      description: 'Configure resolution, bitrate, and encoder settings',
      color: 'from-blue-500'
    },
    {
      icon: Mic,
      title: 'Audio Settings',
      description: 'Manage microphone, speakers, and audio levels',
      color: 'from-purple-500'
    },
    {
      icon: Palette,
      title: 'Branding',
      description: 'Upload intro videos, overlays, and custom panels',
      color: 'from-pink-500'
    },
    {
      icon: Zap,
      title: 'Alerts & Effects',
      description: 'Configure donation alerts and stream effects',
      color: 'from-amber-500'
    },
    {
      icon: Film,
      title: 'Recording',
      description: 'Set up automatic VOD recording and archiving',
      color: 'from-emerald-500'
    },
    {
      icon: Upload,
      title: 'Assets Library',
      description: 'Manage and organize all your media files',
      color: 'from-rose-500'
    },
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
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Studio Settings</h1>
              <p className="text-gray-500">Configure your stream quality, audio, branding, and effects.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studioSettings.map((setting, i) => {
            const Icon = setting.icon;
            return (
              <motion.button 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all group text-left"
              >
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${setting.color} to-transparent opacity-10 group-hover:opacity-20 transition-all flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 bg-gradient-to-br ${setting.color} to-transparent bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gray-950 transition">{setting.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{setting.description}</p>
                
                <div className="mt-4 flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Configure
                  <Settings className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-3xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 Pro Tips for Better Streams</h2>
          <ul className="space-y-2 text-blue-800 font-medium">
            <li>• Use H.264 codec for wider compatibility across streaming platforms</li>
            <li>• Set your bitrate between 2500-6000 kbps for 1080p @ 60fps streams</li>
            <li>• Always test your audio levels before going live (aim for -20db peak)</li>
            <li>• Upload custom intro/outro videos to create a professional stream presence</li>
          </ul>
        </motion.div>

      </div>
    </main>
  );
}