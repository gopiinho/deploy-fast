import ItemCardList from '@/components/contracts/contracts-list'
import PageBase from '@/components/ui/page-base'

export default function Contracts() {
  return (
    <PageBase
      title="Smart Contracts"
      description="Tokens? NFT's? Governance? — all deployable with one click."
    >
      <ItemCardList />
    </PageBase>
  )
}
