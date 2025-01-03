import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ydgslgenhjpqafhqqwrc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZ3NsZ2VuaGpwcWFmaHFxd3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NTUwMjQsImV4cCI6MjA1MTIzMTAyNH0.wVkAOJfH2EfPOk1f_Dqhz624vCNH4IRnyt94mNZ03v0"

// Create the Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;