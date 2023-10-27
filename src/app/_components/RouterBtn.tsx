'use client'

import { useRouter } from 'next/navigation'
import { PrimaryButton } from './PrimaryButton'

type Props = {
  destination?: string
}

export const RouterBtn = ({ destination = '' }: Props) => {
  const router = useRouter()

  return (
    <PrimaryButton onClick={() => router.push(`/${destination}`)}>
      Nav to {destination ? destination : 'home'}
    </PrimaryButton>
  )
}
