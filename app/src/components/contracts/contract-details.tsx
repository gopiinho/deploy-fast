import React from 'react'

interface ContractDetailsProps {
  title: string
  description?: string
  markdown?: string
}

export default function ContractDetails({ title }: ContractDetailsProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-2xl">{title}</span>
      {/* <span>{description}</span> */}
    </div>
  )
}
