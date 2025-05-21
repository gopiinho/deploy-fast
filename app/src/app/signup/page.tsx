import Signup from '@/components/auth/signup'
import { Suspense } from 'react'

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signup />
    </Suspense>
  )
}
