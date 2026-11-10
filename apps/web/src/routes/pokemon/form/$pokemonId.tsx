import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon/form/$pokemonId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pokemon/form/$pokemonId"!</div>
}
