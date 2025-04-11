import Footer from '@/components/footer'

export default function ContractLayput({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
