'use client'

import { useStore } from '@/stores'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import supabase from '@/utils/supabase'

export const SupabaseListener = ({ accessToken }: { accessToken: string | undefined }) => {
  const router = useRouter()
  const updateLoginUser = useStore((state) => state.updateLoginUser)

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        console.log('data.session', data.session)
        updateLoginUser({ id: data.session.user.id, email: data.session.user.email })
      }
    }
    getUserInfo()

    supabase.auth.onAuthStateChange((event, session) => {
      console.log('session', session)
      updateLoginUser({ id: session?.user.id, email: session?.user.email })
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken, router, updateLoginUser])

  return null
}
