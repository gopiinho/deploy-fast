'use client'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'

export default function Navigator() {
  const { ready, authenticated, login, logout } = usePrivy()
  const disableLogin = !ready || (ready && authenticated)
  const disableLogout = !ready || (ready && !authenticated)

  return (
    <section className="my-auto flex h-16 items-center justify-between px-10 text-sm">
      <h1>DeployFast</h1>
      <div className="flex gap-2">
        {ready && authenticated ? (
          <Button
            disabled={disableLogout}
            onClick={logout}
            className="bg-foreground/10 text-foreground border-accent cursor-pointer rounded-3xl px-6 py-2 font-medium"
          >
            Log out
          </Button>
        ) : (
          <Button
            disabled={disableLogin}
            onClick={login}
            className="bg-foreground text-background border-accent cursor-pointer rounded-3xl px-6 py-2 font-medium"
          >
            Login
          </Button>
        )}
      </div>
    </section>
  )
}
