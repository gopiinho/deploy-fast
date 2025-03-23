import ContractDeploy from '@/components/contracts/contract-deploy'
import { contracts } from '@/lib/contracts'

export default async function ContractInfo({
  params,
}: {
  params: Promise<{ contract: string }>
}) {
  const { contract } = await params

  const contractDetails = contracts.find(
    (c) => c.title.toLowerCase() === contract.toLowerCase()
  )

  if (!contractDetails) {
    return <div>Contract not found</div>
  }

  const FormComponent = contractDetails.formComponent

  return (
    <ContractDeploy
      title={contractDetails.title}
      description={contractDetails.formDescription}
    >
      <FormComponent />
    </ContractDeploy>
  )
}
