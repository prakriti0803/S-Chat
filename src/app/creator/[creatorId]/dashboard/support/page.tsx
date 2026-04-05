'use client';

import { motion } from 'framer-motion';
import { LifeBuoy, MessageSquare, BookOpen, ExternalLink, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SupportPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 flex justify-between items-start"
          >
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Support Center</h1>
              <p className="text-gray-500">Need help setting up widgets or encountering issues? We've got you covered.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Documentation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-48 h-48" />
            </div>
            
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
            <p className="text-gray-500 font-medium mb-6 leading-relaxed">
              Browse detailed guides on setting up OBS overlays, integrating Razorpay, and customizing your profile.
            </p>
            
            <div className="flex items-center text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
              Read Docs <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Discord Community Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="w-48 h-48" />
            </div>
            
            <div className="h-12 w-12 rounded-2xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Creator Hub Discord</h2>
            <p className="text-gray-500 font-medium mb-6 leading-relaxed">
              Join our active community of creators. Ask questions, share tips, and get real-time help from our team.
            </p>
            
            <div className="flex items-center text-[#5865F2] font-bold group-hover:text-[#4752C4] transition-colors">
              Join Discord <ExternalLink className="h-4 w-4 ml-1.5" />
            </div>
          </motion.div>

        </div>

        {/* Quick FAQs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="h-5 w-5 text-gray-500" />
            <h2 className="text-xl font-bold text-gray-900">Common Questions</h2>
          </div>

          <div className="space-y-4">
            
            {[
              {
                q: "How do I add the transparent chat overlay to OBS?",
                a: "Go to the Overlay gallery in your dashboard, copy the unique widget URL. In OBS, add a new 'Browser Source', paste the URL, and set width to 500 and height to 800."
              },
              {
                q: "Why aren't my test alerts showing up?",
                a: "Ensure that your OBS Browser source is active, hardware acceleration is enabled in OBS settings, and that the widget hasn't been cached. Right-click the source in OBS and select 'Refresh cache of current page'."
              },
              {
                q: "How fast do Razorpay payouts happen?",
                a: "Schat uses the Razorpay Route API, which means funds are transferred instantly to your connected bank account during the transaction. We do not hold any creator funds."
              }
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-stone-50 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">Q.</span> {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium pl-6">{faq.a}</p>
              </div>
            ))}
            
          </div>
        </motion.div>

        {/* System Status Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 text-green-800">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <div>
              <p className="font-bold text-lg">All Systems Operational</p>
              <p className="text-sm font-medium text-green-700/80">API, Webhooks, and Websockets are healthy</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white border border-green-200 text-green-700 font-bold rounded-xl shadow-sm hover:bg-green-100 transition whitespace-nowrap">
            View Status Page
          </button>
        </motion.div>

      </div>
    </main>
  );
}