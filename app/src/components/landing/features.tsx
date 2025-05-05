import { IconType } from 'react-icons/lib'
import dashboardImg from '../../../public/dashboard.png'
import { IoMdSpeedometer } from 'react-icons/io'
import { IoIosLock } from 'react-icons/io'
import { MdManageAccounts } from 'react-icons/md'
import { IoMdCheckmark } from 'react-icons/io'

export default function Features() {
  return (
    <div
      id="features"
      className="bg-card mx-auto flex flex-col items-center gap-12 rounded-xl px-4 py-16 text-center lg:max-w-[97%]"
    >
      <div className="grid gap-2 lg:w-[55%]">
        <h3 className="text-3xl font-semibold sm:text-5xl">
          Explore the features
        </h3>
        <p className="text-muted-foreground">
          Deploy your own smart contracts on Ethereum and other EVM-compatible
          chains in just a few clicks. No coding skills required — perfect for
          startups, creators, and communities looking to get onchain.
        </p>
      </div>
      <div className="grid gap-10 py-10 lg:grid-cols-2">
        <FeaturesItems
          icon={IoMdSpeedometer}
          title="Rapid Deployment"
          description="Launch your smart contracts in minutes with our streamlined interface - no complex setup or technical hurdles required."
        />
        <FeaturesItems
          icon={MdManageAccounts}
          title="Contracts Management"
          description="Effortlessly monitor, update and maintain all your deployed contracts through our comprehensive management dashboard."
        />
        <FeaturesItems
          icon={IoMdCheckmark}
          title="Instant Verification"
          description="All smart contracts are automatically verified on blockchain explorers immediately after deployment for complete transparency."
        />
        <FeaturesItems
          icon={IoIosLock}
          title="Security"
          description="Every contract is open source, thoroughly tested, and developed with security-first principles to protect your assets and data."
        />
      </div>
    </div>
  )
}

function FeaturesItems({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: IconType
}) {
  return (
    <div className="mx-auto flex flex-col gap-2 p-4 lg:max-w-[70%]">
      <div className="flex items-center justify-center gap-2">
        <div className="bg-accent rounded-xl p-2">
          <Icon className="text-2xl" />
        </div>
        <h5 className="text-2xl font-semibold">{title}</h5>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
