'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Play, 
  Settings, 
  ExternalLink,
  Target,
  ArrowUpRight,
  Zap,
  Globe,
  BellRing,
  Link as LinkIcon,
  CheckCircle2,
  Copy,
  Layers,
  Eye,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import IntegrationSetupModal from '@/components/dashboard/IntegrationSetupModal';

export default function DashboardOverview() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  
  const [chartFilter, setChartFilter] = useState('7D');
  const [obsCopied, setObsCopied] = useState(false);
  const [publicCopied, setPublicCopied] = useState(false);
  const [creatorData, setCreatorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    async function fetchCreatorData() {
      // Find the user by either ID or username
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`id.eq.${creatorId},username.eq.${creatorId}`)
        .single();
        
      console.log('Creator Data fetched:', data, error);
      if (data) {
        setCreatorData(data);
        // If they are missing razorpay or youtube info, pop up the integration modal
        const needsSetup = !data.razorpay_key_id || !data.youtube_channel_id;
        console.log('Needs setup:', needsSetup);
        if (needsSetup) {
          setShowSetup(true);
        }
      }
      setLoading(false);
    }
    
    fetchCreatorData();
  }, [creatorId]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-stone-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Dynamic URLs based on creatorId
  const publicProfileUrl = `/${creatorData?.username || creatorId}`;
  const dashboardBase = `/creator/${creatorId}/dashboard`;
  const obsUrl = `https://schat.live/obs/${creatorData?.username || creatorId}`;

  const copyToClipboard = (text: string, type: 'obs' | 'public') => {
    navigator.clipboard.writeText(text);
    if (type === 'obs') {
      setObsCopied(true);
      setTimeout(() => setObsCopied(false), 2000);
    } else {
      setPublicCopied(true);
      setTimeout(() => setPublicCopied(false), 2000);
    }
  };

  const triggerTestAlert = () => {
    alert("Test Alert Triggered! Check your OBS.");
  };

  // Dynamic Variables based on setup state
  const isLinked = creatorData?.razorpay_key_id && creatorData?.youtube_channel_id;

  // Mock Graph Data VS Real Graph Data (Simulated fallback if not linked)
  const graphData7D = isLinked ? [40, 70, 45, 90, 65, 30, 100] : [0, 0, 0, 0, 0, 0, 0];
  const graphData30D = isLinked ? [60, 50, 80, 40, 95, 80, 55, 75, 68, 82, 91, 65, 78, 88] : Array(14).fill(0);
  const activeGraphData = chartFilter === '7D' ? graphData7D : graphData30D;
  const days = chartFilter === '7D' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : Array.from({length: 14}, (_, i) => `Day ${i+1}`);

  const quickStats = isLinked ? [
    { label: "Total Revenue", value: "₹1,45,200", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "This Month", value: "₹45,200", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Avg Donation", value: "₹250", icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Top Supporter", value: "Rahul S.", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
  ] : [
    { label: "Total Revenue", value: "₹0", icon: DollarSign, color: "text-gray-400", bg: "bg-gray-100" },
    { label: "This Month", value: "₹0", icon: TrendingUp, color: "text-gray-400", bg: "bg-gray-100" },
    { label: "Avg Donation", value: "₹0", icon: Activity, color: "text-gray-400", bg: "bg-gray-100" },
    { label: "Top Supporter", value: "-", icon: Users, color: "text-gray-400", bg: "bg-gray-100" },
  ];

  const recentTransactions = isLinked ? [
    { name: "Rahul Sharma", amount: "₹500", message: "Love the new setup! Keep it up.", time: "2 mins ago" },
    { name: "Priya Singh", amount: "₹1,000", message: "Can you play that track again?", time: "15 mins ago" },
    { name: "Anonymous", amount: "₹200", message: "", time: "1 hour ago" },
    { name: "Tech Bro", amount: "₹5,000", message: "Great insights on the tech stack man.", time: "3 hours ago" },
  ] : [];

  const activeGoal = isLinked ? {
    title: "New PC Build",
    subtitle: "Let's upgrade the stream quality together!",
    current: 15000,
    target: 50000,
    percentage: 30
  } : null;

  const activeOverlays = isLinked ? [
    { name: "Chat Box", type: "Active" },
    { name: "Donation Alerts", type: "Active" },
    { name: "Goal Bar", type: "Disabled" },
  ] : [];

  const streamStats = isLinked ? [
    { label: "Duration", value: "3h 45m", icon: Activity },
    { label: "Peak Viewers", value: "1,204", icon: Eye },
    { label: "Avg Viewers", value: "845", icon: Users },
    { label: "Chat Messages", value: "2,341", icon: MessageSquare },
  ] : [
    { label: "Duration", value: "0m", icon: Activity },
    { label: "Peak Viewers", value: "0", icon: Eye },
    { label: "Avg Viewers", value: "0", icon: Users },
    { label: "Chat Messages", value: "0", icon: MessageSquare },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8 flex flex-col">
      {showSetup && (
        <IntegrationSetupModal 
          creatorData={creatorData} 
          onComplete={(updatedData) => {
            setCreatorData(updatedData);
            setShowSetup(false);
          }} 
        />
      )}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col space-y-6 md:space-y-8">
        
        {/* Top Header & Pulse Navigation */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 md:pb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm shadow-red-500/20">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </span>
              
              {/* Gateway Diagnostics */}
              <div 
                onClick={() => setShowSetup(true)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                title="Click to open Integration Settings"
              >
                <span className="flex items-center gap-1.5">
                  {creatorData?.razorpay_key_id ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-red-500 bg-red-100" />
                  )}
                  Razorpay Route
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  {creatorData?.youtube_channel_id ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-red-500 bg-red-100" />
                  )}
                  YouTube Sync
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Welcome back{creatorData?.display_name ? `, ${creatorData.display_name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium">Your central nervous system for audience interaction.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-2 md:gap-3"
          >
            <Link 
              href={publicProfileUrl}
              target="_blank"
              className="group flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-purple-200 hover:bg-purple-50 text-gray-700 font-bold text-sm"
            >
              <Globe className="h-4 w-4 text-purple-500" />
              <span className="hidden sm:inline">View Profile</span>
            </Link>
            <button 
              onClick={triggerTestAlert}
              className="group flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-orange-200 hover:bg-orange-50 text-gray-700 font-bold text-sm"
            >
              <BellRing className="h-4 w-4 text-orange-500" />
              <span className="hidden sm:inline">Test Alert</span>
            </button>
            <button 
              onClick={() => copyToClipboard(publicProfileUrl, 'public')}
              className="group flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-blue-200 hover:bg-blue-50 text-gray-700 font-bold text-sm"
            >
              <LinkIcon className="h-4 w-4 text-blue-500" />
              <span className="hidden sm:inline">{publicCopied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button 
              onClick={() => copyToClipboard(obsUrl, 'obs')}
              className="group flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-black text-white rounded-xl shadow-sm hover:shadow-md hover:bg-gray-800 transition-all font-bold text-sm"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">{obsCopied ? 'Copied!' : 'Copy OBS'}</span>
            </button>
          </motion.div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 flex-1">
          
          {/* Main Column (2/3 width on LG) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* Quick Stats Row (The Big Four) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4"
            >
              {quickStats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {!isLinked && <div className="absolute inset-0 bg-stone-50/50 backdrop-blur-[1px] z-10" />}
                  <div className={`h-10 w-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-3`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-gray-500 text-xs md:text-sm font-bold mb-1">{stat.label}</h3>
                  <p className="text-lg md:text-xl font-black text-gray-900 truncate">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Revenue Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-400" /> Revenue Graph
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Donations mapping over time</p>
                </div>
                <select 
                  className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-colors"
                  value={chartFilter}
                  onChange={(e) => setChartFilter(e.target.value)}
                >
                  <option value="7D">Last 7 Days</option>
                  <option value="30D">Last 30 Days</option>
                </select>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="h-48 md:h-64 flex items-end gap-1 md:gap-2 px-2 min-w-[500px]">
                  {activeGraphData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="w-full relative flex justify-center h-full items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300 ease-out relative shadow-sm" 
                          style={{ height: `${val}%`, minHeight: '8%' }}
                        >
                          {/* Tooltip */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-opacity whitespace-nowrap pointer-events-none z-10 scale-95 group-hover:scale-100">
                            ₹{(val * 120).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-blue-500 transition-colors text-center line-clamp-1">
                        {days[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Real-Time Ledger (Recent Schats Feed) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-stone-50/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-black text-white rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h2 className="text-base md:text-lg font-bold text-gray-900">Recent Schats</h2>
                </div>
                <Link href={`${dashboardBase}/history`} className="text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className={`p-4 md:p-6 space-y-3 overflow-y-auto relative ${!isLinked || recentTransactions.length === 0 ? 'min-h-[250px] flex items-center justify-center' : 'max-h-96'}`}>
                {!isLinked ? (
                  <div className="text-center p-6 bg-stone-50/70 rounded-2xl w-full">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 scale-110">
                      <Zap className="h-6 w-6" />
                    </div>
                    <p className="text-gray-500 font-bold mb-3">Connect Integrations to view Feed</p>
                    <button onClick={() => setShowSetup(true)} className="text-sm shadow-sm text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                      Setup Now
                    </button>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center p-6">
                    <p className="text-gray-500 font-bold">No transactions yet.</p>
                    <p className="text-gray-400 text-sm mt-1">Start streaming to get your first tip!</p>
                  </div>
                ) : (
                  recentTransactions.map((tip, i) => (
                    <div key={i} className="group flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-gray-100 relative w-full">
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-bold uppercase shrink-0">
                          {tip.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-sm">{tip.name}</p>
                          {tip.message && (
                            <p className="text-gray-500 text-xs line-clamp-1 italic">"{tip.message}"</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3 md:gap-4">
                        {/* Quick Moderation Toggle (Appears on Hover) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded hover:bg-red-100">
                            Ban
                          </button>
                        </div>
                        <div className="shrink-0">
                          <p className="font-black text-green-600 text-base md:text-lg">{tip.amount}</p>
                          <p className="text-xs text-gray-400 font-medium">{tip.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

          </div>

          {/* Sidebar Column (1/3 width on LG) */}
          <div className="space-y-6 md:space-y-8">
            
            {/* Enter Live Studio Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link 
                href={`${dashboardBase}/studio`}
                className="w-full group flex items-center justify-between p-4 md:p-6 bg-white border border-gray-200 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md hover:border-red-100 hover:bg-red-50/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Play className="h-6 w-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="block text-base md:text-lg font-black text-gray-900">Enter Live Studio</span>
                    <span className="block text-xs md:text-sm font-medium text-gray-500">Manage stream & chat</span>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              </Link>
            </motion.div>

            {/* Active Stream Goal Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                  <Target className="h-5 w-5" />
                </div>
                <button className="px-3 md:px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-lg border border-gray-200 transition-all shadow-sm">
                  {activeGoal ? 'Edit Goal' : 'Create Goal'}
                </button>
              </div>

              {activeGoal ? (
                <>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{activeGoal.title}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-4 md:mb-6">{activeGoal.subtitle}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs md:text-sm font-black text-gray-900">
                      <span>₹{activeGoal.current.toLocaleString()}</span>
                      <span className="text-gray-400">₹{activeGoal.target.toLocaleString()}</span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="h-3 md:h-4 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeGoal.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      />
                    </div>
                    
                    <div className="text-right">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">{activeGoal.percentage}% Complete</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 bg-stone-50 rounded-2xl border border-gray-100 border-dashed">
                  <Target className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 font-bold mb-1">No Active Goal</p>
                  <p className="text-gray-400 text-xs px-4">Set a financial target to give viewers something to rally towards.</p>
                </div>
              )}
            </motion.div>

            {/* Active Overlays */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Layers className="h-5 w-5 text-gray-400" />
                <h3 className="font-bold text-gray-900 text-base md:text-lg">Active Overlays</h3>
              </div>
              <div className="space-y-2">
                {activeOverlays.length > 0 ? (
                  activeOverlays.map((overlay, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 md:p-3 bg-stone-50 rounded-lg md:rounded-xl border border-gray-100 text-xs md:text-sm shadow-sm transition-transform hover:scale-[1.01]">
                      <div>
                        <p className="font-bold text-gray-900">{overlay.name}</p>
                      </div>
                      <span className={`font-bold px-2.5 py-1 rounded-lg ${overlay.type === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                        {overlay.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-gray-400 py-4">
                    <Layers className="h-6 w-6 mb-2 opacity-50" />
                    <p className="text-sm font-bold">No Overlays Configured</p>
                  </div>
                )}
              </div>
              <Link 
                href={`${dashboardBase}/overlays`}
                className="mt-6 w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold rounded-lg md:rounded-xl border border-gray-200 transition-all text-xs md:text-sm shadow-sm"
              >
                View All Overlays
              </Link>
            </motion.div>

            {/* Stream Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Activity className="h-5 w-5 text-gray-400" />
                <h3 className="font-bold text-gray-900 text-base md:text-lg">Last Stream Stats</h3>
              </div>
              <div className="space-y-3">
                {streamStats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`h-4 w-4 ${isLinked ? 'text-gray-500' : 'text-gray-300'}`} />
                      <span className="text-sm font-bold text-gray-700">{stat.label}</span>
                    </div>
                    <span className={`text-sm font-black ${isLinked ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>{/* End of Dashboard Grid */}

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm w-full mt-auto mb-4"
        >
          <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Financials', icon: DollarSign, href: `${dashboardBase}/financials` },
                { label: 'Moderation', icon: Zap, href: `${dashboardBase}/moderation` },
                { label: 'Studio', icon: Settings, href: `${dashboardBase}/studio` },
                { label: 'Streams', icon: Play, href: `${dashboardBase}/streams` },
                { label: 'Settings', icon: Settings, href: `${dashboardBase}/settings` },
                { label: 'Support', icon: MessageSquare, href: `${dashboardBase}/support` },
              ].map((link, i) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-stone-50 transition group"
                  >
                    <LinkIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition" />
                    <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 text-center">{link.label}</span>
                  </Link>
                );
              })}
            </div>
        </motion.div>

      </div>
    </main>
  );
}