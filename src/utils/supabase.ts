import { Database } from '@/types/database'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export default createPagesBrowserClient<Database>()
