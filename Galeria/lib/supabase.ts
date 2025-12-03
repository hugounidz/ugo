import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jmonxwhxoccnunfhdasf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptb254d2h4b2NjbnVuZmhkYXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTk2NDAsImV4cCI6MjA3ODM3NTY0MH0.pzNitiVLpKURcUWBFq0Y26Jk5wLhAknt9Uy5H6YUmus"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})  