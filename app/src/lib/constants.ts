import { Address } from 'viem'

const DF_MANAGER: Address = '0xEB49134C3185aC1Ea9C5c170ea425B0De7Df4071'

const ETHERSCAN_API_VERIFY_URL: string = `https://api-sepolia.basescan.org/api`

const plans = [
  {
    link:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
        ? 'https://buy.stripe.com/test_aFabIUaPYfMV7Aj2fl4Vy02'
        : '',
    priceId:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
        ? 'price_1RP5nk2MVb79j7fQT2reL3Qv'
        : '',
    price: 10,
    duration: '/month',
  },
  {
    link:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
        ? 'https://buy.stripe.com/test_aFa3cogaigQZ4o78DJ4Vy03'
        : '',
    priceId:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
        ? 'price_1RP5ok2MVb79j7fQwdk886aF'
        : '',
    price: 80,
    duration: '/year',
  },
]

export { DF_MANAGER, ETHERSCAN_API_VERIFY_URL, plans }
