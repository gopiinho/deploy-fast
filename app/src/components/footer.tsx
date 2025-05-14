import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/deployfast.svg'

export default function Footer() {
  return (
    <footer className="border-border bg-card mt-10 grid w-full flex-col gap-4 border-t px-4 pb-20 pt-12 font-semibold lg:flex-row lg:px-8">
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        <div className="flex w-full flex-col gap-2 lg:w-[40%]">
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-foreground rounded-full p-1">
              <Image src={logo.src} alt="logo" width={30} height={30} />
            </div>
            <h5 className="text-2xl">
              Deploy<span className="font-semibold">Fast</span>
            </h5>
          </div>
          <p className="text-sm font-semibold">
            Deploy smart contracts with no code.
          </p>
        </div>
        <div className="flex w-full gap-6 lg:w-[20%]">
          <div className="grid w-full gap-2">
            <h6 className="text-lg font-bold">Product</h6>
            <Link href={'#features'}>
              <span className="opacity-70 duration-150 hover:opacity-100">
                Features
              </span>
            </Link>
            <Link href={'#pricing'}>
              <span className="opacity-70 duration-150 hover:opacity-100">
                Pricing
              </span>
            </Link>
          </div>
        </div>
        <div className="flex w-full lg:w-[20%]">
          <div className="grid w-full gap-2">
            <h6 className="text-lg font-bold">Reach out</h6>
            <Link href={'mailto:support@deployfast.xyz'}>
              <span className="opacity-70 duration-150 hover:opacity-100">
                Email
              </span>
            </Link>
            <Link
              href="https://x.com/gopiinho"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="opacity-70 duration-150 hover:opacity-100">
                Twitter
              </span>
            </Link>
          </div>
        </div>
        <div className="flex w-full gap-6 lg:w-[20%]">
          <div className="grid w-full gap-2">
            <h6 className="text-lg font-bold">External Links</h6>
            <Link
              href="https://x.com/gopiinho"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="opacity-70 duration-150 hover:opacity-100">
                Twitter
              </span>
            </Link>
            <Link
              href="https://github.com/gopiinho/deploy-fast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="opacity-70 duration-150 hover:opacity-100">
                Github
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
