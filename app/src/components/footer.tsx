import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="border-primary-foreground flex w-full items-center justify-between gap-4 border-t px-4 py-2 text-xl sm:h-10 lg:px-6">
      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <p>© 2025 deployfast</p>
      </div>
      <div className="flex gap-4">
        <Link
          href="https://github.com/gopiinho/deploy-fast"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-150 hover:opacity-60"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://x.com/gopiinho"
          target="_blank"
          rel="noopener noreferrer"
          className="duration-150 hover:opacity-60"
        >
          <FaXTwitter />
        </Link>
      </div>
    </footer>
  )
}
