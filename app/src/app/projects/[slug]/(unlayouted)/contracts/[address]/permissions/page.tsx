import TokenPermissions from '@/components/contracts/info/token-permissions'

export default function ContractInfoPermissions() {
  return (
    <div className="grid gap-6 pb-10">
      <div className="max-sm:grid-cols- flex justify-between gap-4 max-sm:grid">
        <div className="text-2xl font-semibold">Permissions</div>
      </div>
      <TokenPermissions />
    </div>
  )
}
