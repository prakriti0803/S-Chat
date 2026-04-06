import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export default async function CreatorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ creatorId: string }>;
}) {
  const resolvedParams = await params;
  const creatorId = resolvedParams.creatorId;

  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    redirect('/auth?isLogin=true');
  }

  // Verify if the currently logged-in user matches the creatorId in the URL OR their unique username
  const { data: userRecord } = await supabase
    .from('users')
    .select('id, username')
    .eq('id', session.user.id)
    .single();
    
  if (!userRecord || (creatorId !== session.user.id && creatorId !== userRecord.username)) {
    // If they aren't this creator, kick them out of the setup area
    redirect('/');
  }

  return <>{children}</>;
}
