'use client';

import { motion } from 'framer-motion';
import { User, Camera, ExternalLink, Save, Tv, CreditCard, Link as LinkIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;

  const [handle, setHandle] = useState(creatorId);
  const [displayName, setDisplayName] = useState('Ninja');
  const [bio, setBio] = useState('Just a professional button presser. Sub for daily streams!');

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your public profile, connections, and platform preferences.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Link
              href={`/${handle}`}
              target="_blank"
              className="group flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-blue-200 hover:bg-blue-50 text-gray-700 font-bold text-sm"
            >
              <ExternalLink className="h-4 w-4 text-blue-500" />
              View Public Profile
            </Link>
            <Link
              href={dashboardBase}
              className="group flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-300 text-gray-700 font-bold text-sm"
            >
              Back to Dashboard
            </Link>
          </motion.div>
        </header>

        <div className="space-y-8">
          
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Public Profile
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <img 
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                      alt="Avatar" 
                      className="h-32 w-32 rounded-full object-cover border-4 border-gray-50 group-hover:border-blue-100 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Change Avatar</button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Schat URL Handle</label>
                      <div className="flex items-center relative">
                        <span className="absolute left-4 text-gray-400 font-medium">schat.live/</span>
                        <input 
                          type="text" 
                          value={handle}
                          onChange={(e) => setHandle(e.target.value)}
                          className="w-full pl-[95px] pr-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 flex justify-between">
                      <span>Bio</span>
                      <span className="text-gray-400 text-xs font-normal">{bio.length}/150</span>
                    </label>
                    <textarea 
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium text-gray-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-stone-50 px-6 py-4 flex justify-end border-t border-gray-100">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl font-bold text-sm tracking-wide hover:bg-gray-800 transition shadow hover:shadow-md active:scale-95">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </motion.div>

          {/* Connected Accounts Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-gray-600" />
              Connected Accounts
            </h2>

            <div className="space-y-4">
              {/* YouTube Connection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-50 border border-gray-100">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Tv className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">YouTube Tracking</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">Auto-updates live status & viewers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pl-16 sm:pl-0">
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-green-500" /> Connected
                  </span>
                  <button className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Disconnect</button>
                </div>
              </div>

              {/* Razorpay Connection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-50 border border-gray-100">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Razorpay Route</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">Enables zero-holding direct payouts</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                  <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 transition active:scale-95">
                    Update API Keys
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}