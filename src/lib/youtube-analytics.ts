import { supabaseAdmin } from '@/lib/supabaseAdmin'

export type YoutubeStreamStatus = 'upcoming' | 'live' | 'completed'

interface LiveBroadcastSnippet {
  title?: string
  description?: string
  scheduledStartTime?: string
  resourceId?: { videoId?: string }
}

interface LiveBroadcastContentDetails {
  actualStartTime?: string
  actualEndTime?: string
}

interface LiveBroadcastStatus {
  lifeCycleStatus?: string
}

interface YouTubeBroadcast {
  id?: string
  snippet?: LiveBroadcastSnippet
  contentDetails?: LiveBroadcastContentDetails
  status?: LiveBroadcastStatus
}

interface YouTubeVideoSnippet {
  title?: string
  description?: string
  thumbnails?: Record<string, { url: string }>
}

interface YouTubeVideoStatistics {
  viewCount?: string
  likeCount?: string
}

interface YouTubeVideoItem {
  id: string
  snippet?: YouTubeVideoSnippet
  statistics?: YouTubeVideoStatistics
}

function mapBroadcastStatus(status?: string): YoutubeStreamStatus {
  switch (status) {
    case 'live':
    case 'active':
      return 'live'
    case 'complete':
    case 'completed':
      return 'completed'
    case 'upcoming':
    default:
      return 'upcoming'
  }
}

function getBestThumbnail(thumbnails?: Record<string, { url: string }>) {
  if (!thumbnails) return null
  const preferred = ['maxres', 'standard', 'high', 'medium', 'default']
  for (const key of preferred) {
    if (thumbnails[key]?.url) {
      return thumbnails[key].url
    }
  }
  const first = Object.values(thumbnails)[0]
  return first?.url ?? null
}

export async function syncCreatorStreams(accessToken: string, creatorId: string) {
  if (!accessToken) {
    throw new Error('YouTube access token is required to sync streams.')
  }

  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  })

  const broadcastsResponse = await fetch(
    'https://www.googleapis.com/youtube/v3/liveBroadcasts?part=id,snippet,contentDetails,status&broadcastStatus=all&broadcastType=all&mine=true&maxResults=50',
    { headers }
  )

  const broadcastsBody = await broadcastsResponse.json()

  if (!broadcastsResponse.ok) {
    const errorMessage = broadcastsBody.error?.message ?? 'Failed to fetch YouTube broadcasts.'
    throw new Error(errorMessage)
  }

  const broadcasts: YouTubeBroadcast[] = broadcastsBody.items ?? []
  if (broadcasts.length === 0) {
    return []
  }

  const upsertPayload: Array<Record<string, any>> = []

  for (const broadcast of broadcasts) {
    const videoId = broadcast.snippet?.resourceId?.videoId || broadcast.id
    if (!videoId) {
      continue
    }

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${encodeURIComponent(videoId)}`,
      { headers }
    )

    const videoBody = await videoResponse.json()
    if (!videoResponse.ok) {
      continue
    }

    const videoItem: YouTubeVideoItem | undefined = videoBody.items?.[0]
    if (!videoItem) {
      continue
    }

    const snippet = videoItem.snippet ?? {}
    const statistics = videoItem.statistics ?? {}
    const thumbnailUrl = getBestThumbnail(snippet.thumbnails) ?? ''

    upsertPayload.push({
      creator_id: creatorId,
      youtube_video_id: videoId,
      title: snippet.title ?? '',
      description: snippet.description ?? '',
      thumbnail_url: thumbnailUrl,
      status: mapBroadcastStatus(broadcast.status?.lifeCycleStatus),
      scheduled_start_time: broadcast.snippet?.scheduledStartTime ?? null,
      actual_start_time: broadcast.contentDetails?.actualStartTime ?? null,
      actual_end_time: broadcast.contentDetails?.actualEndTime ?? null,
      view_count: statistics.viewCount ? parseInt(statistics.viewCount, 10) : 0,
      like_count: statistics.likeCount ? parseInt(statistics.likeCount, 10) : 0,
      last_updated: new Date().toISOString(),
    })
  }

  if (upsertPayload.length === 0) {
    return []
  }

  const { data, error } = await supabaseAdmin
    .from('youtube_streams')
    .upsert(upsertPayload, { onConflict: 'youtube_video_id' })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
