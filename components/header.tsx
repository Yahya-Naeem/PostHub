"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PostHub
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/" && "bg-gradient-to-r from-indigo-600 to-purple-600")}
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button
              variant={pathname === "/admin" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/admin" && "bg-gradient-to-r from-indigo-600 to-purple-600")}
            >
              <Link href="/admin">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
