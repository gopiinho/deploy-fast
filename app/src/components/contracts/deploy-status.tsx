import Link from 'next/link'
import { CiCircleCheck, CiCircleInfo } from 'react-icons/ci'

import { Button } from '../ui/button'
import { DeployStatusType } from '@/lib/types'

interface DeployStatusProps {
  path: string
  status: DeployStatusType
  close: () => void
}

export default function DeployStatus({
  path,
  status,
  close,
}: DeployStatusProps) {
  return (
    <div
      className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="border-border/30 rounded-lg border p-3 bg-blend-saturation backdrop-blur-md max-sm:w-full sm:min-w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background border-border/40 min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
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
      </div>
    </div>
  )
}
