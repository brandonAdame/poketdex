import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { MoreHorizontalIcon } from "lucide-react"

const data = [
  { date: new Date("2025-01-01"), users: 1200, category: "Route Only" },
  { date: new Date("2025-01-02"), users: 1350, category: "Route Only" },
  {
    date: new Date("2025-01-04"),
    users: 300,
    category: "Manual Change with artifact",
  },
  {
    date: new Date("2025-01-06"),
    users: 900,
    category: "Manual Change with artifact",
  },
  { date: new Date("2025-01-07"), users: 1200, category: "Manual Change" },
  {
    date: new Date("2025-01-08"),
    users: 4000,
    category: "Decommission KAD Application",
  },
  {
    date: new Date("2025-01-09"),
    users: 3500,
    category: "Decommission KAD Application",
  },
  { date: new Date("2025-01-10"), users: 800, category: "Route Only" },
]

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-4/5 flex-col">
      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, idx) => (
                <TableRow key={`${item.category}-${idx}`}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{item.users}</TableCell>
                  <TableCell className="text-left">
                    {item.date.toDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          />
                        }
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
