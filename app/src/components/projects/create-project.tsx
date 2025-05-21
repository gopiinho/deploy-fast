// import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { useCreateProjectStore } from '@/state/createProjectStore'
import { useUserStore } from '@/state/userStore'
import { IoMdClose } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MoonLoader } from 'react-spinners'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { extractConvexError } from '@/lib/extractConvexError'

interface CreateProjectProps {
  close?: () => void
}

const formSchema = z.object({
  projectName: z.string().min(3).max(50),
})

export default function CreateProject({ close }: CreateProjectProps) {
  // const [slug, setSlug] = useState<string>('')
  const { privyDid } = useUserStore()
  const { name, setName, loading, setLoading, open } = useCreateProjectStore()

  const createProject = useMutation(api.projects.createProject)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: name,
    },
  })

  async function handleCreateProject(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (privyDid) {
        await createProject({
          privyDid,
          name: values.projectName,
        })
        // setSlug(project.slug)
        setName('')
        form.reset({ projectName: '' })
        toast.success('Project created successfully!')
        if (close) {
          close()
        }
      }
      setLoading(false)
    } catch (error) {
      const errorMessage = extractConvexError(error)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateProject)}>
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
                    <span className="text-2xl font-semibold">
                      Create Project
                    </span>
                    <IoMdClose
                      size={20}
                      onClick={close}
                      className="cursor-pointer duration-150 hover:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-start">
                    <span>Project Name</span>
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setName(e.target.value)
                              }}
                              placeholder="My project"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-end justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      onClick={close}
                      variant={'outline'}
                      size={'lg'}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size={'lg'}>
                      {loading ? <MoonLoader size={20} /> : 'Confirm'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      )}
    </AnimatePresence>
  )
}
