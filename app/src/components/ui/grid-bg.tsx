import { cn } from '@/lib/utils'

export default function GridBackground() {
  return (
    <>
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:70px_70px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
        )}
      />
      <div className="bg-background pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,background)]"></div>
    </>
  )
}
