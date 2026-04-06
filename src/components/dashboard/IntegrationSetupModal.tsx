import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditCard, Video, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface IntegrationSetupModalProps {
  creatorData: any;
  onComplete: (updatedData: any) => void;
}

export default function IntegrationSetupModal({ creatorData, onComplete }: IntegrationSetupModalProps) {
  const [step, setStep] = useState(1);
  const [razorpayKeyId, setRazorpayKeyId] = useState(creatorData?.razorpay_key_id || '');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState(creatorData?.razorpay_key_secret || '');
  const [youtubeChannelId, setYoutubeChannelId] = useState(creatorData?.youtube_channel_id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!creatorData?.id) {
      setError('Profile mapping error. Please refresh the page.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          razorpay_key_id: razorpayKeyId || null,
          razorpay_key_secret: razorpayKeySecret || null,
          youtube_channel_id: youtubeChannelId || null,
        })
        .eq('id', creatorData.id)
        .select()
        .single();

      if (error) throw error;
      onComplete(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save integrations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh] flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 z-10">
          <motion.div 
            animate={{ width: `${(step / 2) * 100}%` }}
            className="h-full bg-blue-600"
          />
        </div>

        {step === 1 && (
          <div className="space-y-5 md:space-y-6 pt-2">
            <div className="mx-auto h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900">Link Razorpay</h2>
              <p className="text-gray-500 mt-2">To receive 100% of your donations directly, please add your Razorpay API keys securely.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Razorpay Key ID</label>
                <input 
                  type="text" 
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                  placeholder="rzp_live_..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-mono text-sm" 
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Razorpay Key Secret</label>
                <input 
                  type="password" 
                  value={razorpayKeySecret}
                  onChange={(e) => setRazorpayKeySecret(e.target.value)}
                  placeholder="••••••••••••••••" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-mono text-sm" 
                />
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!razorpayKeyId || !razorpayKeySecret}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center transition-colors"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <p className="text-xs text-center text-gray-400">Keys are securely stored using Supabase RLS encryption standards.</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Video className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900">Link YouTube Channel</h2>
              <p className="text-gray-500 mt-2">Paste your YouTube Channel ID so we can track live metrics and subscriber growth automatically.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">YouTube Channel ID</label>
                <input 
                  type="text" 
                  value={youtubeChannelId}
                  onChange={(e) => setYoutubeChannelId(e.target.value)}
                  placeholder="UCxxxxxxxxxxxxxxxxx" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-red-600 font-mono text-sm" 
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded-lg">{error}</p>}

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="w-1/3 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
              >
                Back
              </button>
              <button 
                onClick={handleSave}
                disabled={loading || !youtubeChannelId}
                className="w-2/3 py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center transition-colors"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Complete Setup'}
              </button>
            </div>
            <div className="text-center">
               <button onClick={() => onComplete(creatorData)} className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">Skip for now</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
