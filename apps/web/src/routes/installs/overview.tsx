import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/installs/overview")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="h1-primary">Install Overview</h1>
    </div>
  )
}
