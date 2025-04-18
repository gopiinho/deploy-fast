import { ETHERSCAN_API_VERIFY_URL } from '../../constants'
import TOKEN_JSON_CODE from './token.json'

const ERC20_SOURCE_CODE: string = JSON.stringify(TOKEN_JSON_CODE)

const ERC20_COMPILER_VERSION = 'v0.8.28+commit.7893614a'

const ETHERSCAN_CONTRACT_FILENAME = 'src/tokens/ERC20.sol'

const ETHERSCAN_CONTRACT_NAME = `${ETHERSCAN_CONTRACT_FILENAME}:ERC20Contract`

const VERIFICATION_API_ENDPOINT = ETHERSCAN_API_VERIFY_URL

const TARGET_CHAIN_ID = 84532

const CODE_FORMAT = 'solidity-standard-json-input'

const OPTIMIZER_ENABLED = TOKEN_JSON_CODE.settings.optimizer.enabled ? '1' : '0'

const OPTIMIZER_RUNS = TOKEN_JSON_CODE.settings.optimizer.runs.toString()

export {
  ERC20_SOURCE_CODE,
  ERC20_COMPILER_VERSION,
  ETHERSCAN_CONTRACT_NAME,
  VERIFICATION_API_ENDPOINT,
  TARGET_CHAIN_ID,
  CODE_FORMAT,
  OPTIMIZER_ENABLED,
  OPTIMIZER_RUNS,
}
