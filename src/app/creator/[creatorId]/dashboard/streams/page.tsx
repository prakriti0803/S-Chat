'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Eye, Heart, Play } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type StreamStatus = 'upcoming' | 'live' | 'completed';

interface YoutubeStream {
  id: string;
  creator_id: string;
  youtube_video_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  status: StreamStatus;
  scheduled_start_time: string | null;
  actual_start_time: string | null;
  actual_end_time: string | null;
  view_count: number;
  like_count: number;
  last_updated: string;
}

const statusStyles: Record<StreamStatus, string> = {
  upcoming: 'bg-blue-100 text-blue-700',
  live: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-slate-100 text-slate-700',
};

export default function StreamsPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string;
  const [streams, setStreams] = useState<YoutubeStream[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('past');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!creatorId) return;

    const loadStreams = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('youtube_streams')
        .select('*')
        .eq('creator_id', creatorId)
        .order('scheduled_start_time', { ascending: false });

      if (error) {
        setError(error.message);
        setStreams([]);
      } else {
        setStreams((data as YoutubeStream[]) ?? []);
      }

      setLoading(false);
    };

    loadStreams();
  }, [creatorId]);

  const upcomingStreams = useMemo(
    () => streams.filter((stream) => stream.status === 'upcoming'),
    [streams]
  );

  const pastStreams = useMemo(
    () => streams.filter((stream) => stream.status !== 'upcoming'),
    [streams]
  );

  const displayedStreams = filter === 'upcoming' ? upcomingStreams : pastStreams;
  const totalViews = useMemo(
    () => streams.reduce((total, stream) => total + (stream.view_count || 0), 0),
    [streams]
  );
  const totalPastStreams = pastStreams.length;
  const upcomingCount = upcomingStreams.length;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <ArrowLeft className="h-4 w-4" />
              <Link href={`/creator/${creatorId}/dashboard`} className="font-semibold hover:text-gray-900">
                Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Stream History</h1>
            <p className="text-gray-500 max-w-2xl">
              Sync and review YouTube broadcasts, metrics, and upcoming stream schedule for your creator channel.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.16em]">Past Streams</p>
            <p className="mt-4 text-3xl font-black text-gray-900">{totalPastStreams}</p>
            <p className="mt-2 text-sm text-gray-500">Completed + live streams</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.16em]">Total Views</p>
            <p className="mt-4 text-3xl font-black text-gray-900">{totalViews.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-500">All-time views across synced streams</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.16em]">Upcoming Streams</p>
            <p className="mt-4 text-3xl font-black text-gray-900">{upcomingCount}</p>
            <p className="mt-2 text-sm text-gray-500">Streams scheduled to start soon</p>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="sm:flex sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your streams</h2>
              <p className="text-sm text-gray-500 mt-1">Toggle between upcoming schedule and completed/archive streams.</p>
            </div>

            <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
              {(['upcoming', 'past'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === value
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {value === 'upcoming' ? 'Upcoming' : 'Past'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Stream</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Scheduled</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Views</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Likes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-500">
                      Loading stream history...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : displayedStreams.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-500">
                      No streams found for this view.
                    </td>
                  </tr>
                ) : (
                  displayedStreams.map((stream) => (
                    <tr key={stream.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center gap-3">
                          <img
                            src={stream.thumbnail_url}
                            alt={stream.title}
                            className="h-16 w-28 rounded-2xl object-cover bg-slate-100"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 line-clamp-2">{stream.title}</p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{stream.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[stream.status]}`}>
                          {stream.status === 'live' ? 'Live' : stream.status === 'completed' ? 'Completed' : 'Scheduled'}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-gray-600">
                        {stream.scheduled_start_time
                          ? new Date(stream.scheduled_start_time).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-gray-900 font-semibold flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        {stream.view_count.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-gray-900 font-semibold flex items-center gap-2">
                        <Heart className="h-4 w-4 text-gray-400" />
                        {stream.like_count.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
