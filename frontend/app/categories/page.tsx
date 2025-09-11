import { DashboardHeader } from "@/components/dashboard-header"
import { CategoryKeywords } from "@/components/category-keywords"
import { Badge } from "@/components/ui/badge"
import { Tags, TrendingUp, Search } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <Tags className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Keywords by Category
              </h1>
              <p className="text-foreground/60 text-lg">Explore trending keywords organized by beauty categories</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30 animate-pulse">
                <TrendingUp className="w-3 h-3 mr-1" />
                Real-time Updates
              </Badge>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">8</div>
              <div className="text-sm text-blue-600/80 dark:text-blue-400/80">Active Categories</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">510</div>
              <div className="text-sm text-green-600/80 dark:text-green-400/80">Total Keywords</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">89</div>
              <div className="text-sm text-purple-600/80 dark:text-purple-400/80">Trending Up</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">42.5%</div>
              <div className="text-sm text-orange-600/80 dark:text-orange-400/80">Avg Growth</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <CategoryKeywords />
        </div>
      </main>
    </div>
  )
}
