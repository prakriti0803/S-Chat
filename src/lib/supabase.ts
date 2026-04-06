import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isPlaceholderValue = (value: string | undefined, placeholder: string) =>
  !value || value.includes(placeholder)

if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  isPlaceholderValue(supabaseUrl, 'your-project.supabase.co') ||
  isPlaceholderValue(supabaseAnonKey, 'your-anon-key')
) {
  throw new Error(
    'Invalid Supabase environment variables. Replace the placeholder values in .env.local with your real NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
