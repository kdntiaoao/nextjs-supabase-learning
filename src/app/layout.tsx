import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from './_components/NavBar'

export const metadata: Metadata = {
  title: 'nextjs-supabase-learning',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  )
}
