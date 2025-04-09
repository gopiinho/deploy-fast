import { ConvexError } from 'convex/values'

export function extractConvexError(error: unknown): string {
  const errorString = String(error)
  const specificPattern = /Uncaught Error:\s+([\s\S]*?)(?:\s+at handler|$)/
  const match = errorString.match(specificPattern)

  if (match && match[1]) {
    return match[1].trim()
  }

  if (error instanceof ConvexError && typeof error.data === 'string') {
    return error.data
  }

  if (
    error instanceof ConvexError &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  ) {
    return error.data.message
  }

  const fallbackMatch = errorString.match(/:\s*([\s\S]*)/)
  if (fallbackMatch && fallbackMatch[1]) {
    const potentialMessage = fallbackMatch[1].trim()
    if (
      !potentialMessage.includes('at handler') &&
      !potentialMessage.includes('[CONVEX')
    ) {
      return potentialMessage
    }
  }

  if (
    error instanceof Error &&
    typeof error.message === 'string' &&
    error.message.length < errorString.length
  ) {
    const messageMatch = error.message.match(specificPattern)
    if (messageMatch && messageMatch[1]) {
      return messageMatch[1].trim()
    }
    return error.message
  }

  return errorString
}
