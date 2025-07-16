import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Invoice Management</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Welcome back!</span>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}