'use client'
import { useState, useCallback } from 'react'
// import { toast } from 'sonner'

interface VerifyParams {
  chainId: string | number
  codeformat: 'solidity-single-file' | 'solidity-standard-json-input'
  sourceCode: string
  contractaddress: string
  contractname: string
  compilerversion: string
  constructorArguements?: string
  optimizationUsed?: '0' | '1'
  runs?: string
}

interface EtherscanResponse {
  status: '1' | '0'
  message: string
  result: string
}

interface UseVerifyContractReturn {
  verifyContract: (apiEndpoint: string, params: VerifyParams) => Promise<void>
  isLoading: boolean
  error: string | null
  result: string | null
  clearState: () => void
}

export function useVerifyContract(): UseVerifyContractReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY

  const verifyContract = useCallback(
    async (apiEndpoint: string, params: VerifyParams) => {
      setIsLoading(true)
      setError(null)
      setResult(null)

      if (!apiKey) {
        setIsLoading(false)
        return
      }

      if (!apiEndpoint) {
        setIsLoading(false)
        return
      }

      const formData = new URLSearchParams()

      formData.append('apikey', apiKey)
      formData.append('module', 'contract')
      formData.append('action', 'verifysourcecode')
      formData.append('codeformat', params.codeformat)
      formData.append('contractaddress', params.contractaddress)
      formData.append('contractname', params.contractname)
      formData.append('compilerversion', params.compilerversion)
      formData.append('sourceCode', params.sourceCode)

      if (params.constructorArguements) {
        formData.append('constructorArguements', params.constructorArguements)
      }
      if (params.optimizationUsed) {
        formData.append('optimizationUsed', params.optimizationUsed)
      }
      if (params.runs) {
        formData.append('runs', params.runs)
      }

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        })

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}: ${response.statusText}`
          )
        }

        const data: EtherscanResponse = await response.json()

        if (data.status === '1') {
          setResult(data.result)
          setError(null)
          // toast.success(result)
        } else {
          setError(`Etherscan Error: ${data.message} - ${data.result}`)
          setResult(data.result)
          // toast.success(error)
        }
      } catch (error) {
        console.error(error)
        setResult(null)
      } finally {
        setIsLoading(false)
      }
    },
    [apiKey]
  )

  const clearState = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setResult(null)
  }, [])

  return { verifyContract, isLoading, error, result, clearState }
}
