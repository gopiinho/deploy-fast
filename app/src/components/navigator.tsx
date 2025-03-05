'use client'
import { usePrivy } from '@privy-io/react-auth'

export default function Navigator() {
  const { ready, authenticated, login, logout } = usePrivy()
  const disable = !ready || (ready && authenticated)

  return (
    <section className="my-auto flex h-16 items-center justify-between px-10 text-sm">
      <h1>DeployFast</h1>
      <div className="flex gap-2">
        {ready && authenticated ? (
          <button
            disabled={disable}
            onClick={logout}
            className="bg-foreground/10 text-foreground border-accent cursor-pointer rounded-3xl px-6 py-2 font-medium"
          >
            Log out
          </button>
        ) : (
          <button
            disabled={disable}
            onClick={login}
            className="bg-foreground text-background border-accent cursor-pointer rounded-3xl px-6 py-2 font-medium"
          >
            Login
          </button>
        )}
      </div>
    </section>
  )
}
