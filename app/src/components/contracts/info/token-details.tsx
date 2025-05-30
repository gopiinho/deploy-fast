import HeaderCard from '@/components/ui/header-card'

interface TokenDetailsProps {
  totalTokens: string | undefined
  userTokens: string | undefined
}

export default function TokenDetails({
  totalTokens,
  userTokens,
}: TokenDetailsProps) {
  return (
    <HeaderCard title="Token Details">
      <div className="grid grid-cols-3 justify-between gap-3 p-4 max-sm:grid-cols-1">
        <div className="grid">
          <span className="text-muted-foreground">Total Tokens</span>
          <span className="text-lg font-semibold">{totalTokens}</span>
        </div>
        <div className="grid">
          <span className="text-muted-foreground">Your Tokens</span>
          <span className="text-lg font-semibold">{userTokens}</span>
        </div>
        <div className="grid">
          <span className="text-muted-foreground">Decimals</span>
          <span className="text-lg font-semibold">18</span>
        </div>
      </div>
    </HeaderCard>
  )
}
