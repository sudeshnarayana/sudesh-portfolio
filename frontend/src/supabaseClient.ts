import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rofgxbkuoyfhdnobigrb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZmd4Ymt1b3lmaGRub2JpZ3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNzAzOTcsImV4cCI6MjA5ODY0NjM5N30.JzCbAgM6lEiMCYtpipF2OLK9vbdWRnGEx9IDUTXIbFw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)