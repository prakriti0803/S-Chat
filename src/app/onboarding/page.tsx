'use client';

import { motion } from 'framer-motion';
import { User, Link as LinkIcon, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useMemo, useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');

  const paramRole = searchParams.get('role');
  const role = paramRole === 'creator' || paramRole === 'donor' ? paramRole : 'creator';
  const uid = searchParams.get('uid');
  
  // Use the uniquely generated username as the destination instead of the raw database ID
  const destination = role === 'creator' && username ? `/creator/${username}/dashboard` : '/';

  // Load existing data if available
  useEffect(() => {
    const loadUser = async () => {
      if (!uid) return;
      const { data } = await supabase.from('users').select('display_name, email').eq('id', uid).single();
      if (data) {
        if (data.display_name) setDisplayName(data.display_name);
        // By default username could be derived from email or display name
        if (!username && data.display_name) {
          setUsername(data.display_name.toLowerCase().replace(/[^a-z0-9]/g, ''));
        }
      }
    };
    loadUser();
  }, [uid]);

  const handleComplete = async () => {
    if (!uid) return;
    setLoading(true);
    setError(null);

    try {
      // 1. First format username to be URL safe
      const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');

      // 2. Save user data
      const { error: updateError } = await supabase
        .from('users')
        .update({
          username: cleanUsername,
          display_name: displayName,
          bio,
          social_links: {
            youtube,
            twitter
          }
        })
        .eq('id', uid);

      if (updateError) {
        if (updateError.code === '23505') {
           throw new Error('This username is already taken. Please choose another one.');
        }
        throw updateError;
      }
      
      // 3. Instead of pushing to the UUID, push to their newly created username clean route
      router.push(`/creator/${cleanUsername}/dashboard`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong saving your profile.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-blue-600 rounded-r-full"
          />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <User className="h-10 w-10" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-gray-900">Set up your Profile</h2>
              <p className="text-gray-500 max-w-sm mx-auto mt-2">Choose your creator handle and tell your audience a bit about yourself.</p>
            </div>
            
            <div className="space-y-4 mt-8">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="creatorname" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-semibold transition-colors" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your stream name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-semibold transition-colors" 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Bio</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Welcome to my stream..." 
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-medium transition-colors resize-none" 
                />
              </div>
            </div>

            <button 
              onClick={() => {
                if (username && displayName) setStep(2);
                else setError('Username and Display Name are required');
              }}
              disabled={!username || !displayName}
              className="w-full mt-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            {error && step === 1 && <p className="text-red-500 text-sm text-center font-medium mt-2">{error}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <LinkIcon className="h-10 w-10" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-gray-900">Connect Socials</h2>
              <p className="text-gray-500 max-w-sm mx-auto mt-2">Add your primary social links so your donors can follow your content.</p>
            </div>
            
            <div className="space-y-4 mt-8">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">YouTube Channel URL</label>
                <input 
                  type="text" 
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="https://youtube.com/@..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-indigo-600 font-medium transition-colors" 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Twitter / X URL</label>
                <input 
                  type="text" 
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://twitter.com/..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-indigo-600 font-medium transition-colors" 
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button 
                onClick={() => setStep(1)}
                className="w-1/3 py-4 rounded-full bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="w-2/3 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="mx-auto h-24 w-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="h-12 w-12" />
            </motion.div>
            <h2 className="text-3xl font-black text-gray-900">You're Ready to Go!</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Your profile is set up. Let's head to your command center to start managing your streams and donations.</p>
            
            {error && <p className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-xl">{error}</p>}

            <div className="flex space-x-3 mt-8">
              <button 
                onClick={() => setStep(2)}
                disabled={loading}
                className="w-1/3 py-4 rounded-full bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button 
                onClick={handleComplete}
                disabled={loading}
                className="w-2/3 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors shadow-md flex items-center justify-center disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </main>
  );
}

export default function Onboarding() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
