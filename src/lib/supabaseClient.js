import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://kqlqdupoaewkxthdfeup.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxbHFkdXBvYWV3a3h0aGRmZXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NzU2MTEsImV4cCI6MjAxMjQ1MTYxMX0.b2aI58fhIg-aD2JH3-pJfo-cy5VlNgR4hBSBNr8nmcs')