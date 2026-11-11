import { createFileRoute, Link } from "@tanstack/react-router"
import type { Pokemon } from "@/types/types"
import {
  ArrowLeft,
  ArrowUpRight,
  Dumbbell,
  Footprints,
  Sparkles,
  Zap,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.query({
      queryKey: ["pokemon", params.pokemonId],
      queryFn: async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon")
        }
        return (await response.json()) as Pokemon
      },
    })
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Poketdex | ${formatName(loaderData?.name ?? "Pokemon")}` },
    ],
  }),
})

const typeColors: Record<string, string> = {
  bug: "#92a82c",
  dark: "#66564a",
  dragon: "#7255c6",
  electric: "#c49616",
  fairy: "#c875a2",
  fighting: "#bd5547",
  fire: "#d76a43",
  flying: "#7b84c7",
  ghost: "#706194",
  grass: "#5c9b57",
  ground: "#aa8540",
  ice: "#5b9eaa",
  normal: "#85816e",
  poison: "#9860a4",
  psychic: "#cf5d83",
  rock: "#9b8743",
  steel: "#71879a",
  water: "#4e83bd",
}

function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function RouteComponent() {
  const pokemon = Route.useLoaderData()
  const primaryType = pokemon.types[0]?.type.name ?? "normal"
  const accent = typeColors[primaryType] ?? typeColors.normal
  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default
  const totalStats = pokemon.stats.reduce(
    (total, stat) => total + stat.base_stat,
    0
  )

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height))] bg-muted/30">
      <main className="mx-auto max-w-6xl space-y-7 px-4 py-8 sm:px-6 lg:py-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Pokédex
        </Link>

        <section
          aria-label={`${formatName(pokemon.name)} overview`}
          className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div
            className="relative isolate flex min-h-80 overflow-hidden rounded-[2rem] border bg-card p-6 shadow-sm sm:min-h-96 sm:p-10"
            style={{
              background: `radial-gradient(circle at 75% 30%, ${accent}35, transparent 38%), linear-gradient(135deg, var(--color-background), var(--color-muted))`,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 -bottom-28 -z-10 size-80 rounded-full border-32 border-white/30"
            />
            <div
              aria-hidden="true"
              className="absolute right-16 -bottom-12 -z-10 size-36 rounded-full border-14 border-white/30"
            />
            <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs font-semibold tracking-widest text-foreground/65 backdrop-blur sm:top-8 sm:left-8">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
              NATIONAL DEX
              <span className="font-mono text-foreground">
                #{String(pokemon.id).padStart(4, "0")}
              </span>
            </div>

            {artwork ? (
              <img
                src={artwork}
                alt={`${formatName(pokemon.name)} official artwork`}
                className="relative z-10 m-auto max-h-72 w-full max-w-72 object-contain drop-shadow-[0_24px_20px_rgba(27,39,55,0.2)] sm:max-h-80"
                height={320}
                width={320}
                fetchPriority="high"
              />
            ) : (
              <div className="m-auto text-sm text-muted-foreground">
                Artwork unavailable
              </div>
            )}
            <div className="absolute right-6 bottom-5 text-xs font-medium tracking-[0.2em] text-foreground/40 sm:right-8 sm:bottom-7">
              POKÉMON PROFILE
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border bg-card p-6 shadow-sm sm:p-9">
            <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              The Pokédex entry
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight capitalize sm:text-5xl">
              {formatName(pokemon.name)}
            </h1>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Get to know {formatName(pokemon.name)} — its type, abilities, and
              the stats that make it unique.
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Types">
              {pokemon.types.map(({ type }) => {
                const color = typeColors[type.name] ?? typeColors.normal

                return (
                  <span
                    key={type.name}
                    className="rounded-full px-4 py-1.5 text-sm font-bold tracking-wide text-white capitalize shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {type.name}
                  </span>
                )
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <MetricCard
                icon={<Footprints className="size-4" />}
                label="Height"
                value={`${(pokemon.height / 10).toFixed(1)} m`}
              />
              <MetricCard
                icon={<Dumbbell className="size-4" />}
                label="Weight"
                value={`${(pokemon.weight / 10).toFixed(1)} kg`}
              />
              <MetricCard
                icon={<Sparkles className="size-4" />}
                label="Base experience"
                value={pokemon.base_experience?.toString() ?? "—"}
              />
              <MetricCard
                icon={<Zap className="size-4" />}
                label="Moves"
                value={pokemon.moves.length.toString()}
              />
            </div>

            <div className="mt-7 border-t pt-6">
              <h2 className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Abilities
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <span
                    key={ability.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium capitalize"
                  >
                    {formatName(ability.name)}
                    {is_hidden && (
                      <span className="text-xs font-normal text-muted-foreground">
                        · hidden
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Base stats</CardTitle>
                <CardDescription className="mt-1">
                  A quick look at this Pokémon&apos;s strengths.
                </CardDescription>
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2 text-right">
                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Total
                </p>
                <p className="font-mono text-lg font-bold">{totalStats}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map(({ base_stat, stat }) => {
                const percentage = Math.min((base_stat / 255) * 100, 100)
                const statName =
                  stat.name === "hp" ? "HP" : formatName(stat.name)

                return (
                  <div
                    key={stat.name}
                    className="grid grid-cols-[7rem_2.5rem_1fr] items-center gap-3"
                  >
                    <span className="text-xs font-semibold text-muted-foreground capitalize sm:text-sm">
                      {statName}
                    </span>
                    <span className="text-right font-mono text-sm font-bold tabular-nums">
                      {base_stat}
                    </span>
                    <div
                      role="progressbar"
                      aria-label={statName}
                      aria-valuemin={0}
                      aria-valuemax={255}
                      aria-valuenow={base_stat}
                      className="h-2.5 overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        className="h-full rounded-full transition-[width]"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: accent,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Moves</CardTitle>
                <CardDescription className="mt-1">
                  A few moves from its learnset.
                </CardDescription>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {pokemon.moves.length} total
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {pokemon.moves.slice(0, 8).map(({ move }, index) => (
                  <div
                    key={move.name}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border bg-background px-3 py-3"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-sm font-medium capitalize">
                      {formatName(move.name)}
                    </span>
                  </div>
                ))}
              </div>
              {pokemon.moves.length > 8 && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Showing 8 of {pokemon.moves.length} moves
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {pokemon.forms.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Forms</CardTitle>
                <CardDescription className="mt-1">
                  Known forms for this Pokémon.
                </CardDescription>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {pokemon.forms.map((form) => (
                <span
                  key={form.name}
                  className="rounded-full border bg-background px-4 py-2 text-sm font-medium capitalize"
                >
                  {formatName(form.name)}
                </span>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-lg font-bold tabular-nums">{value}</p>
    </div>
  )
}
