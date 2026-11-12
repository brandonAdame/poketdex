import { createFileRoute } from "@tanstack/react-router"
import { movesClient } from "@/pokedex"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { useMemo, type ReactNode } from "react"
import type { NamedAPIResource, Pokemon } from "pokenode-ts"
import { Gauge, HeartPulse, ShieldCheck, Sparkles, Swords } from "lucide-react"
import { useTable, type ColumnDef } from "@tanstack/react-table"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@workspace/ui/components/reui/data-grid/data-grid"
import { DataGridScrollArea } from "@workspace/ui/components/reui/data-grid/data-grid-scroll-area"
import { DataGridTable } from "@workspace/ui/components/reui/data-grid/data-grid-table"

const MoveSchema = z.object({
  moveId: z.coerce.number(),
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

function displayValue(value: number | null | undefined, suffix = "") {
  return value === null || value === undefined ? "—" : `${value}${suffix}`
}

function formatRange(
  minimum: number | null | undefined,
  maximum: number | null | undefined
) {
  if (minimum === null || minimum === undefined) return "—"
  if (maximum === null || maximum === undefined || minimum === maximum) {
    return String(minimum)
  }
  return `${minimum}–${maximum}`
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border bg-background/70 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold tracking-wide uppercase">
          {label}
        </span>
      </div>
      <p className="mt-1 truncate text-sm font-bold capitalize">{value}</p>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border/60 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate text-right font-semibold capitalize">
        {value ? formatName(value) : "—"}
      </span>
    </div>
  )
}

export const Route = createFileRoute("/pokemon/move/$moveId")({
  params: {
    parse: (rawParams) => MoveSchema.parse(rawParams),
    stringify: (params) => ({ moveId: String(params.moveId) }),
  },
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { moveId } = params
    // Fetch the moves for the given Pokémon ID
    const resp = await context.queryClient.query({
      queryKey: ["pokemon", moveId, "move"],
      queryFn: () => movesClient.getMoveById(moveId),
    })
    return resp
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const accent = typeColors[data.type.name] ?? typeColors.normal
  const effect =
    data.effect_entries.find((entry) => entry.language.name === "en")?.effect ??
    "No effect description available."
  const meta = data.meta

  const columns = useMemo<
    ColumnDef<DataGridFeatures, NamedAPIResource<Pokemon>>[]
  >(
    () => [
      {
        accessorKey: "name",
        header: () => <span className="text-lg font-bold">Learned By</span>,
      },
    ],
    [data.learned_by_pokemon]
  )

  const tableData = useMemo(
    () => data.learned_by_pokemon,
    [data.learned_by_pokemon]
  )

  const table = useTable({
    data: tableData,
    columns,
    features: dataGridFeatures,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: tableData.length || 1,
      },
    },
  })

  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] w-full overflow-hidden p-4">
      <div className="w-1/2 overflow-y-auto pr-4">
        <div className="p-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge style={{ backgroundColor: accent, color: "white" }}>
              {formatName(data.type.name)}
            </Badge>
            <Badge variant="secondary">
              {formatName(data.generation.name)}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight capitalize">
            {formatName(data.name)}
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
            {effect}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <MetricCard
              icon={<Swords className="size-4" />}
              label="Damage class"
              value={formatName(data.damage_class?.name ?? "—")}
            />
            <MetricCard
              icon={<ShieldCheck className="size-4" />}
              label="Target"
              value={formatName(data.target.name)}
            />
            <MetricCard
              icon={<Gauge className="size-4" />}
              label="Power"
              value={displayValue(data.power)}
            />
            <MetricCard
              icon={<Sparkles className="size-4" />}
              label="Accuracy"
              value={displayValue(data.accuracy, "%")}
            />
            <MetricCard
              icon={<HeartPulse className="size-4" />}
              label="PP"
              value={displayValue(data.pp)}
            />
            <MetricCard
              icon={<Gauge className="size-4" />}
              label="Priority"
              value={displayValue(data.priority)}
            />
          </div>

          <Card className="mt-5 border-0 bg-background/70 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Move metadata</CardTitle>
              <CardDescription>
                Additional battle effects and move behavior.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <MetaRow label="Category" value={meta?.category.name} />
              <MetaRow label="Ailment" value={meta?.ailment.name} />
              <MetaRow
                label="Hits"
                value={formatRange(meta?.min_hits, meta?.max_hits)}
              />
              <MetaRow
                label="Turns"
                value={formatRange(meta?.min_turns, meta?.max_turns)}
              />
              <MetaRow label="Drain" value={displayValue(meta?.drain, "%")} />
              <MetaRow
                label="Healing"
                value={displayValue(meta?.healing, "%")}
              />
              <MetaRow
                label="Ailment chance"
                value={displayValue(meta?.ailment_chance, "%")}
              />
              <MetaRow
                label="Flinch chance"
                value={displayValue(meta?.flinch_chance, "%")}
              />
              <MetaRow
                label="Stat chance"
                value={displayValue(meta?.stat_chance, "%")}
              />
              <MetaRow
                label="Effect chance"
                value={displayValue(data.effect_chance, "%")}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Split page in half */}
      <Separator orientation="vertical" />

      {/* Display table of pokemon who can learn this move */}
      <div className="min-h-0 w-1/2 min-w-0 overflow-y-auto">
        <DataGrid
          table={table}
          recordCount={tableData.length ?? 0}
          tableLayout={{ dense: true }}
        >
          <div className="w-full space-y-2.5">
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </div>
        </DataGrid>
      </div>
    </div>
  )
}
