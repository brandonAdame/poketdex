import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Input } from "@workspace/ui/components/input"

export default function Navbar() {
  const navigate = useNavigate({ from: "/" })
  const search = useSearch({ strict: false })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    navigate({
      search: (prev) => ({
        ...prev,
        q: value || undefined,
      }),
      replace: true,
    })
  }
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-(--navbar-height) w-full items-center border-b bg-background backdrop-blur-md">
      {/* Navbar content */}
      <div className="flex w-full items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold">
          Poketdex
        </Link>

        <Input
          type="text"
          className="w-full max-w-xs"
          placeholder="Search Pokémon..."
          value={search.q ?? ""}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}
