interface ContractInfoLayoutProps {
  children: React.ReactNode
}

export default function ContractInfoLayout({
  children,
}: ContractInfoLayoutProps) {
  return <div className="grid min-h-[calc(100vh-80px)] w-full">{children}</div>
}
