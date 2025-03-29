import type { PrivyClientConfig } from '@privy-io/react-auth'

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    showWalletUIs: true,
  },
  loginMethods: ['wallet', 'email', 'sms', 'google', 'apple'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
}
