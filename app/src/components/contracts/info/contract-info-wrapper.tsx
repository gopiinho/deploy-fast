interface ContractInfoWrapperProps {
  children: React.ReactNode
}

export default function ContractInfoWrapper({
  children,
}: ContractInfoWrapperProps) {
  return <div className="w-full px-4 py-4">{children}</div>
}
