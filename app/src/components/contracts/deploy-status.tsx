import Link from 'next/link'
import { GoDotFill } from 'react-icons/go'
import { motion, AnimatePresence } from 'motion/react'

import { Button } from '../ui/button'
import { DeployStatusType } from '@/lib/types'

interface DeployStatusProps {
  address: string | null
  status: DeployStatusType
  close: () => void
}

export default function DeployStatus({
  address,
  status,
  close,
}: DeployStatusProps) {
  const isDeploying = status === DeployStatusType.Deploying
  const isDeployed =
    status === DeployStatusType.Deployed ||
    status === DeployStatusType.Verifying ||
    status === DeployStatusType.Verified
  const isVerifying = status === DeployStatusType.Verifying
  const isVerified = status === DeployStatusType.Verified
  return (
    <AnimatePresence>
      <motion.div
        className="bg-background/90 backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="border-border rounded-lg border p-3 bg-blend-saturation backdrop-blur-md max-sm:w-full sm:min-w-60"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="bg-card border-border min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xl font-semibold">Deploy Status</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-2">
                <motion.div
                  animate={{
                    color: isDeployed ? '#10B981' : '#9CA3AF',
                    scale: isDeploying ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    color: { duration: 0.5 },
                    scale: {
                      repeat: isDeploying ? Infinity : 0,
                      duration: 1.5,
                    },
                  }}
                >
                  {isDeployed ? (
                    <GoDotFill className="text-green-500" size={22} />
                  ) : (
                    <GoDotFill className="shadow" size={22} />
                  )}
                </motion.div>
                <span
                  className={`font-medium ${isDeployed ? 'text-green-500' : ''}`}
                >
                  {isDeploying ? 'Deploying' : 'Deployed'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-2">
                <motion.div
                  animate={{
                    color: isVerified ? '#10B981' : '#9CA3AF',
                    scale: isVerifying ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    color: { duration: 0.5 },
                    scale: {
                      repeat: isVerifying ? Infinity : 0,
                      duration: 1.5,
                    },
                  }}
                >
                  {isVerified ? (
                    <GoDotFill className="text-green-500" size={22} />
                  ) : (
                    <GoDotFill size={22} />
                  )}
                </motion.div>
                <span
                  className={`font-medium ${isVerified ? 'text-green-500' : ''}`}
                >
                  {isVerifying ? 'Verifying' : 'Verified'}
                </span>
              </div>
            </div>
            <div className="mt-4 flex w-full justify-end space-x-2 py-4">
              <Button size={'lg'} variant={'outline'} onClick={close}>
                Close
              </Button>
              {(status === DeployStatusType.Deployed ||
                status === DeployStatusType.Verifying ||
                status === DeployStatusType.Verified) &&
                address && (
                  <Link
                    href={`https://sepolia.basescan.org/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size={'lg'} type="button">
                      Explorer
                    </Button>
                  </Link>
                )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
