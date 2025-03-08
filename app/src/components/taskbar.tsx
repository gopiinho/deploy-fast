function Items({ title }: { title: string }) {
  return <span className="">{title}</span>
}

function TaskbarItems() {
  return (
    <div className="text-primary flex gap-4 py-2 opacity-50 sm:px-10">
      <Items title="Your Contracts" />
      <Items title="Settings" />
    </div>
  )
}

export default function Taskbar() {
  return (
    <div className="bg-background border-muted my-auto h-full w-full items-center justify-center border-b">
      <TaskbarItems />
    </div>
  )
}
