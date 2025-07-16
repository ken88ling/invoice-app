"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Customers", href: "/customers", icon: "👥" },
  { name: "Invoices", href: "/invoices", icon: "📄" },
  { name: "Payments", href: "/payments", icon: "💰" },
  { name: "Reports", href: "/reports", icon: "📈" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}