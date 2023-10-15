import { createClient } from '@supabase/supabase-js'
import {  PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY  } from '$env/static/public';
console.log("hello",PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL)
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)