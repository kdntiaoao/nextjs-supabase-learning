'use client'

import { useRouter } from 'next/navigation'
import { PrimaryButton } from './PrimaryButton'

export const RefreshBtn = () => {
  const router = useRouter()

  return <PrimaryButton onClick={() => router.refresh()}>Refresh</PrimaryButton>
}
