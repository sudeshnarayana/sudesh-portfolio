import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rofgxbkuoyfhdnobigrb.supabase.co'
const supabaseAnonKey = 'sb_publishable_KL4v-2rP_7p71gp26hkfXQ_pCxmN4VL'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)