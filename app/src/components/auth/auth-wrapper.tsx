'use client'
import LoginState from './login-state'
import { useSyncUserAndProjects } from '@/hooks/useSyncUserAndProjects'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  useSyncUserAndProjects()
  return (
    <>
      <LoginState>{children}</LoginState>
    </>
  )
}
