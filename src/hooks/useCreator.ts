import { useParams } from 'next/navigation';

/**
 * Hook to access current creator data from URL parameters
 * When auth is implemented, this can be extended to fetch from session/auth context
 * 
 * Usage:
 * const { creatorId, creatorHandle } = useCreator();
 * 
 * URL Structure: /creator/[creatorId]/dashboard
 * The creatorId can be either the creator's database ID or handle
 */
export function useCreator() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';

  // This will be replaced with actual auth data when implemented
  // For now, we use the creatorId from the URL
  const creatorHandle = creatorId; // In production, map creatorId to handle from DB

  return {
    creatorId,
    creatorHandle,
    // Public profile URL (dynamic)
    publicProfileUrl: `/${creatorHandle}`,
    // Dashboard base URL (dynamic)
    dashboardBaseUrl: `/creator/${creatorId}/dashboard`,
    // Constructed OBS URL (will use actual auth token in production)
    obsUrl: `https://schat.live/obs/${creatorId}`,
  };
}
