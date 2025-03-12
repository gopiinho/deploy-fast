import ContractDeploy from '@/components/contracts/contract-deploy'
import TokenForm from '@/components/contracts/token-form'

export default async function ContractInfo({
  params,
}: {
  params: Promise<{ contract: string }>
}) {
  const { contract } = await params
  return (
    <ContractDeploy
      title={contract}
      description="Create cryptocurrency compliant with ERC20 standard"
    >
      <TokenForm />
    </ContractDeploy>
  )
}
