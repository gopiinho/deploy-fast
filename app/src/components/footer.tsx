import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-end gap-4 px-4 text-xl sm:h-10 lg:px-6">
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
    </footer>
  )
}
