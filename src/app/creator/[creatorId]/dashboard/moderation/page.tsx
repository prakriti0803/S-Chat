'use client';

import { motion } from 'framer-motion';
import { Shield, Ban, AlertCircle, Clock, User, Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ModerationPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;
  const [bannedUsers] = useState([
    { id: 1, username: 'SpamUser123', reason: 'Excessive spam', date: '2024-01-15', duration: 'Permanent' },
    { id: 2, username: 'ToxicUser99', reason: 'Harassment', date: '2024-01-10', duration: '7 days' },
    { id: 3, username: 'AdBot456', reason: 'Advertising', date: '2024-01-08', duration: 'Permanent' },
  ]);

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
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Moderation Panel</h1>
              <p className="text-gray-500">Manage bans, view reports, and configure automod rules.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600 text-sm">BANNED USERS</h3>
              <div className="h-10 w-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Ban className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900">{bannedUsers.length}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600 text-sm">PENDING REPORTS</h3>
              <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900">2</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600 text-sm">AUTOMOD ACTIVE</h3>
              <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900">3</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">rules active</p>
          </motion.div>
        </div>

        {/* Banned Users Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <Ban className="h-6 w-6" />
              Banned Users
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-600 text-sm">Username</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600 text-sm">Reason</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600 text-sm">Date</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600 text-sm">Duration</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600 text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bannedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                        <span className="font-bold text-gray-900">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{user.reason}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium text-sm">{user.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        user.duration === 'Permanent' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {user.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </main>
  );
}