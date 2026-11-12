import { Link } from "@tanstack/react-router"
import { useTable, type ColumnDef } from "@tanstack/react-table"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@workspace/ui/components/reui/data-grid/data-grid"
import { DataGridScrollArea } from "@workspace/ui/components/reui/data-grid/data-grid-scroll-area"
import { DataGridTable } from "@workspace/ui/components/reui/data-grid/data-grid-table"
import type { PokemonMove } from "pokenode-ts"
import { useMemo } from "react"

export function MovesTable({ moves }: { moves: PokemonMove[] }) {
  const extractMoveId = (url: string) => Number(url.split("/").at(-2))
  const columns = useMemo<ColumnDef<DataGridFeatures, PokemonMove>[]>(
    () => [
      {
        accessorKey: "move.name",
        header: "Move",
        cell: ({ row }) => (
          <Link
            to={`/pokemon/move/$moveId`}
            params={{ moveId: extractMoveId(row.original.move.url) }}
          >
            {row.original.move.name}
          </Link>
        ),
      },
    ],
    []
  )

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: moves,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: moves.length || 1,
      },
    },
  })

  return (
    <DataGrid
      table={table}
      recordCount={moves.length ?? 0}
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
  )
}
