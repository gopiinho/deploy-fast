interface PageBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function PageContent({ children }: PageBaseProps) {
  return <section className="w-full px-4 lg:px-6">{children}</section>
}
