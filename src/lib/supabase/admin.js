import { createClient } from '@supabase/supabase-js'

// Use environment variables with fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'hhttps://exuyvavqbohnrrwwradm.supabase.co'
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dXl2YXZxYm9obnJyd3dyYWRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzcwNzI0OCwiZXhwIjoyMDgzMjgzMjQ4fQ.cfEallKt-2EvbEWVXACeSVWyD13ibsr65zQsuLyPynE'

console.log('🔧 Supabase Admin Configuration:')
console.log('Environment:', process.env.NODE_ENV || 'development')
console.log('URL:', supabaseUrl)
console.log('Service Key:', supabaseServiceKey ? '✓ Exists' : '✗ Missing')

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('❌ Missing Supabase credentials')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  db: {
    schema: 'public'
  }
})

console.log('✅ Supabase admin client initialized successfully')