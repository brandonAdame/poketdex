import type { PokemonForm } from "@/types/types"
import { useMemo } from "react"
import { useTable, type ColumnDef } from "@tanstack/react-table"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@workspace/ui/components/reui/data-grid/data-grid"
import { DataGridScrollArea } from "@workspace/ui/components/reui/data-grid/data-grid-scroll-area"
import { DataGridTable } from "@workspace/ui/components/reui/data-grid/data-grid-table"

export function PokemonFormTable({ data }: { data: PokemonForm[] }) {
  const columns = useMemo<ColumnDef<DataGridFeatures, PokemonForm>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue() as string,
      },
    ],
    []
  )

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data,
  })

  return (
    <DataGrid
      table={table}
      recordCount={data.length ?? 0}
      tableLayout={{
        width: "auto",
      }}
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
