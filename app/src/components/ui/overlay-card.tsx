import { motion, AnimatePresence } from 'motion/react'
import { IoMdClose } from 'react-icons/io'

interface OverlayCardProps {
  children: React.ReactNode
  title: string
  open: boolean
  close: () => void
}

export default function OverlayCard({
  children,
  title,
  open,
  close,
}: OverlayCardProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="border-border rounded-lg border p-3 bg-blend-saturation shadow-xl backdrop-blur-md max-sm:w-full sm:min-w-60"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="bg-card border-border min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
              <div className="flex items-center justify-between pb-2">
                <span className="text-2xl font-semibold">{title}</span>
                <IoMdClose
                  size={20}
                  onClick={close}
                  className="cursor-pointer duration-150 hover:opacity-50"
                />
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
