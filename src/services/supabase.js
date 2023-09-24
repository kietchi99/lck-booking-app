
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://hvicgjhrcsiueocsfjpy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aWNnamhyY3NpdWVvY3NmanB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMDE4OTQsImV4cCI6MjAxMDg3Nzg5NH0.ypqFreRp_kjisUKRpRBiz4Q6nYDkvr4ekPp_c2tFEDY"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase