import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/documentation")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center">
      <h1 className="h1-primary">Documentation</h1>
    </div>
  )
}
