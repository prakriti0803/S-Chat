'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, Heart, Gift, Crown, CheckCircle2, CreditCard } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const mockCreator = {
  name: "Ninja",
  handle: "@ninja",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  live: true,
  bio: "Just a professional button presser. Sub for daily streams!",
  topDonors: [
    { name: "John Doe", amount: 5000 },
    { name: "Jane Smith", amount: 2500 },
    { name: "Alex Johnson", amount: 1000 },
  ]
};

const AMOUNTS = [50, 100, 500, 1000, 5000];

export default function CreatorPublicProfile({ params }: { params: { handle: string } }) {
  const [amount, setAmount] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDonate = () => {
    if (!amount || Number(amount) < 10) return;
    // Simulate payment
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setAmount('');
    setMessage('');
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      {/* Header Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <div className="absolute -bottom-16 left-0 w-full h-32 bg-stone-50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Creator Profile (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 sticky top-24">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white shadow-xl bg-gray-100">
                <Image src={mockCreator.avatar} alt={mockCreator.name} fill className="object-cover rounded-full" />
                {mockCreator.live && (
                  <div className="absolute -bottom-2 right-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-full border-2 border-white animate-pulse shadow-lg tracking-wider">
                    LIVE
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <h1 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                  {mockCreator.name}
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                </h1>
                <p className="text-gray-500 font-medium mb-4">{mockCreator.handle}</p>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {mockCreator.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-bold text-gray-900 flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" /> Leaderboard
                  </span>
                </div>
                <div className="space-y-3">
                  {mockCreator.topDonors.map((donor, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-stone-50 p-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className={`font-black w-4 text-center ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-700' : 'text-gray-300'}`}>
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-800">{donor.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">₹{donor.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Send Support</h2>
                  <p className="text-gray-500">Your message will appear on stream!</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3 uppercase tracking-wider">How much? (₹)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`py-3 rounded-xl font-black text-lg transition-all border-2 flex items-center justify-center gap-1 ${
                          amount === amt 
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' 
                            : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-stone-50'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white outline-none focus:border-blue-600 font-black text-xl text-gray-900 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-right font-medium">Platform fee is covered by Schat. They receive 100%.</p>
                </div>

                {/* Name */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wider">Your Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Anonymous"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium text-gray-900"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wider flex justify-between">
                    <span>Message</span>
                    <span className={`text-xs ${message.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
                      {message.length}/200
                    </span>
                  </label>
                  <textarea
                    placeholder="Say something nice..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium text-gray-900 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleDonate}
                  disabled={!amount || Number(amount) < 10 || message.length > 200}
                  className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  
                  {showConfetti ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-red-400 fill-red-400" /> Sending Love...
                    </motion.div>
                  ) : (
                    <>
                      Pay ₹{amount || '0'} 
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium pt-2">
                  <CreditCard className="h-4 w-4" /> Secured via Razorpay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Quick minimal arrow component for the button
function ArrowRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
