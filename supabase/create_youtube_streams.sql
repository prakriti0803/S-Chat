-- Create the YouTube stream history table used by the Stream Manager
CREATE TABLE IF NOT EXISTS youtube_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  youtube_video_id text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  status text NOT NULL CHECK (status IN ('upcoming', 'live', 'completed')),
  scheduled_start_time timestamp with time zone,
  actual_start_time timestamp with time zone,
  actual_end_time timestamp with time zone,
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  last_updated timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_youtube_streams_creator_id ON youtube_streams(creator_id);
CREATE INDEX IF NOT EXISTS idx_youtube_streams_status ON youtube_streams(status);
CREATE INDEX IF NOT EXISTS idx_youtube_streams_scheduled_start_time ON youtube_streams(scheduled_start_time);
