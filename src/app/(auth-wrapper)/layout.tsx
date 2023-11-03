import { cookies } from 'next/headers'
import { Database } from '@/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseListener } from '../_components/SupabaseListener'

type Props = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: Props) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
