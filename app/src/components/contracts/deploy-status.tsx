// import Link from 'next/link'
import { CiCircleCheck, CiCircleInfo } from 'react-icons/ci'
import { motion, AnimatePresence } from 'motion/react'

import { Button } from '../ui/button'
import { DeployStatusType } from '@/lib/types'

interface DeployStatusProps {
  // path: string
  status: DeployStatusType
  close: () => void
}

export default function DeployStatus({
  // path,
  status,
  close,
}: DeployStatusProps) {
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
            <div className="flex items-center gap-3 p-2 font-semibold">
              {status === DeployStatusType.Deployed ? (
                <CiCircleCheck className="text-green-400" size={25} />
              ) : (
                <CiCircleInfo className="text-yellow-400" size={25} />
              )}
              <div>
                <span>
                  {status === DeployStatusType.Deploying
                    ? 'Deployment in progress...'
                    : 'Successfully deployed!'}
                </span>
              </div>
            </div>
            <div className="mt-4 flex w-full justify-end space-x-2 py-4">
              <Button size={'lg'} variant={'outline'} onClick={close}>
                Close
              </Button>
              {/* {status === DeployStatusType.Deployed && (
              <Link href={path}>
                <Button size={'lg'}>View Contract</Button>
              </Link>
            )} */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
