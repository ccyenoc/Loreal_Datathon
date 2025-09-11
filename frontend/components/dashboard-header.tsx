"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Download, 
  Filter, 
  Calendar, 
  RefreshCw, 
  Share2, 
  Bell,
  Search,
  ChevronDown,
  Clock,
  TrendingUp,
  Eye
} from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Title & Status */}
          <div className="flex items-center space-x-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Beauty Industry Intelligence
                </h2>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Live
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-foreground/70">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: 2 minutes ago</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>+15.3% vs last month</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Real-time analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input
                type="text"
                placeholder="Search insights..."
                className="w-64 pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            {/* Time Range Selector */}
            <Button variant="outline" size="sm" className="gap-2 bg-background/50 hover:bg-background transition-all duration-200">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Last 30 Days</span>
              <ChevronDown className="w-3 h-3" />
            </Button>

            {/* Filter */}
            <Button variant="outline" size="sm" className="gap-2 bg-background/50 hover:bg-background transition-all duration-200">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
              <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                3
              </Badge>
            </Button>

            {/* Separator */}
            <Separator orientation="vertical" className="h-6" />

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative gap-2 bg-background/50 hover:bg-background transition-all duration-200">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[10px] text-primary-foreground font-bold">2</span>
              </div>
            </Button>

            {/* Refresh */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="gap-2 bg-background/50 hover:bg-background transition-all duration-200"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            {/* Share */}
            <Button variant="outline" size="sm" className="gap-2 bg-background/50 hover:bg-background transition-all duration-200">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            {/* Export */}
            <Button 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-3 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">127</div>
            <div className="text-xs text-blue-600/80 dark:text-blue-400/80">Keywords Tracked</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-3 border border-green-500/20">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">89</div>
            <div className="text-xs text-green-600/80 dark:text-green-400/80">Trending Up</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-3 border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">8</div>
            <div className="text-xs text-orange-600/80 dark:text-orange-400/80">Trending Down</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-3 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">128.2%</div>
            <div className="text-xs text-purple-600/80 dark:text-purple-400/80">Top Growth Rate</div>
          </div>
        </div>
      </div>
    </header>
  )
}
