interface TokenDetailsProps {
  totalTokens: string
  userTokens: string
}

export default function TokenDetails({
  totalTokens,
  userTokens,
}: TokenDetailsProps) {
  return (
    <div className="bg-card grid w-full rounded-sm border">
      <div className="border-border border-b px-4 py-5 text-2xl font-semibold">
        Token Details
      </div>
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
    </div>
  )
}
