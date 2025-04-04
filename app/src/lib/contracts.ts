import TokenForm from '@/components/contracts/token-form'

export interface ContractDetailsProps {
  title: string
  description: string
  formDescription: string
  path: string
  formComponent: React.FC
}

export const contracts: ContractDetailsProps[] = [
  {
    title: 'Token',
    description: 'Implementation of standard ERC20 token.',
    formDescription: 'Create cryptocurrency compliant with ERC20 standard.',
    path: '/contracts/Token',
    formComponent: TokenForm,
  },
  // {
  //   title: 'Nft',
  //   description: 'Deploy an ERC721 NFT smart contract.',
  //   formDescription: 'Release collection of unique NFTs for a set price',
  //   path: '/contracts/Nft',
  //   formComponent: TokenForm,
  // },
]
