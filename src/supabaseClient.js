import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eileueqxgwekxpbcwine.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbGV1ZXF4Z3dla3hwYmN3aW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTI4NzEsImV4cCI6MjA2NTA2ODg3MX0.sB07vj6eRWD2vSlJOgJBiB9kjPh71bBz1sCoN7vRoN4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    // Optional: you can customize options here, usually defaults are fine
  },
})
