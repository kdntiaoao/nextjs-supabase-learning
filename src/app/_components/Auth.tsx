'use client'

import { useStore } from '@/stores'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PrimaryButton } from './PrimaryButton'

export const Auth = () => {
  const loginUser = useStore((state) => state.loginUser)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login mode!')
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        console.log('Login success!!', { loginUser })
        router.push('/todos')
      }
    } else {
      console.log('Register mode!')
      const { error } = await supabase.auth.signUp({ email, password })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
      console.log('Registered!!', { loginUser })
    }
  }

  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <div className="flex flex-col items-center space-y-10">
      <p>{loginUser.email ? loginUser.email : 'Not logged in'}</p>

      {loginUser.email && <PrimaryButton onClick={signOut}>Sign Out</PrimaryButton>}

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex w-64 flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

        <div className="flex w-64 flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-100"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid">
          <PrimaryButton attrType="submit">{isLogin ? 'Login' : 'Register'}</PrimaryButton>
        </div>
      </form>

      <div>
        <PrimaryButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create new account' : 'Back to login'}
        </PrimaryButton>
      </div>
    </div>
  )
}
