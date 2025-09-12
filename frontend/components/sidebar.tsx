"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Tags, TrendingUp, CopySlash as Crystal, Settings, Moon, Sun, Sparkles, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview & metrics",
      badge: "Live",
      badgeVariant: "default" as const,
    },
    {
      href: "/categories",
      label: "Categories",
      icon: Tags,
      description: "Keywords by category",
      badge: "10 Active",
      badgeVariant: "secondary" as const,
    },
    {
      href: "/trending",
      label: "Trending Analysis",
      icon: TrendingUp,
      description: "Category trend analysis",
      badge: "Hot",
      badgeVariant: "default" as const,
    },
    {
      href: "/keyword-checker",
      label: "Keyword Checker",
      icon: Search,
      description: "AI-powered keyword analysis",
      badge: "AI",
      badgeVariant: "secondary" as const,
    },
    {
      href: "/predictions",
      label: "Predictions",
      icon: Crystal,
      description: "6-month forecasts",
      badge: "AI",
      badgeVariant: "secondary" as const,
    },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <aside className="w-72 bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border h-screen sticky top-0 flex flex-col shadow-lg">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg animate-pulseGlow">
              <span className="text-primary-foreground font-bold text-xl">L</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-sidebar animate-pulse" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Beauty Scope
            </h1>
            <p className="text-sidebar-foreground/60 text-xs font-medium">Beauty Intelligence Platform</p>
          </div>
          <Sparkles className="w-5 h-5 text-accent animate-float" />
        </div>

        {/* Status Indicator */}
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">System Active</span>
            </div>
            <Badge variant="outline" className="text-green-700 border-green-500/30 bg-green-500/10">
              99.9%
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <div key={item.href} className="animate-slideInRight" style={{ animationDelay: `${index * 100}ms` }}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-auto p-4 flex-col items-start group relative overflow-hidden transition-all duration-300 ${
                      isActive 
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg scale-[1.02]" 
                        : "hover:bg-sidebar-accent/10 hover:scale-[1.01] hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    )}
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <Badge variant={item.badgeVariant} className="text-xs font-medium">
                        {item.badge}
                      </Badge>
                    </div>
                    <span className="text-xs opacity-80 ml-8 mt-1 relative z-10">{item.description}</span>
                  </Button>
                </Link>
              </div>
            )
          })}
        </nav>

        <Separator className="my-6 bg-sidebar-border" />

        {/* Settings Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
            Preferences
          </h3>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full justify-start p-3 hover:bg-sidebar-accent/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="font-medium">
                {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </span>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start p-3 hover:bg-sidebar-accent/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-6 pt-0 border-t border-sidebar-border">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            <div className="font-medium mb-1">Powered by L'Oréal AI</div>
            <div className="text-sidebar-foreground/40">v2.1.0 • Real-time Analytics</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
