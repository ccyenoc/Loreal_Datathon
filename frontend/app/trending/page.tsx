"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, BarChart3, ArrowRight, Star, Crown, Flame, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService, TrendAnalysisData, TrendSummary } from "@/lib/api"

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-green-500" />
    case "down":
      return <TrendingDown className="w-4 h-4 text-red-500" />
    default:
      return <Minus className="w-4 h-4 text-yellow-500" />
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "up":
      return "bg-green-500/10 text-green-700 border-green-500/30"
    case "down":
      return "bg-red-500/10 text-red-700 border-red-500/30"
    default:
      return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
  }
}

function getCategoryGradient(rank: number) {
  const gradients = [
    "from-pink-500/20 to-pink-600/20", // Top 1
    "from-blue-500/20 to-blue-600/20", // Top 2
    "from-purple-500/20 to-purple-600/20", // Top 3
    "from-green-500/20 to-green-600/20", // Others
  ]
  return gradients[Math.min(rank - 1, 3)] || gradients[3]
}

export default function TrendingPage() {
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysisData[]>([])
  const [trendSummary, setTrendSummary] = useState<TrendSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrendData = async () => {
      try {
        setLoading(true)
        const [analysisData, summaryData] = await Promise.all([
          apiService.getTrendAnalysis(),
          apiService.getTrendSummary()
        ])
        setTrendAnalysis(analysisData)
        setTrendSummary(summaryData)
      } catch (err) {
        setError('Failed to load trend analysis data')
        console.error('Error loading trend data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTrendData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <DashboardHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading trend analysis...</span>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <DashboardHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Trending Analysis
              </h1>
              <p className="text-foreground/60 text-lg">Keyword trending patterns across beauty categories</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30 animate-pulse">
                <Flame className="w-3 h-3 mr-1" />
                Live Trends
              </Badge>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                ↗ {trendSummary?.categories_trending_up_percentage || "0%"}
              </div>
              <div className="text-sm text-green-600/80 dark:text-green-400/80">Categories Trending Up</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {trendSummary?.highest_growth || "+0.0%"}
              </div>
              <div className="text-sm text-blue-600/80 dark:text-blue-400/80">Highest Growth</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {trendSummary?.hot_keywords_count || 0}
              </div>
              <div className="text-sm text-purple-600/80 dark:text-purple-400/80">Hot Keywords</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {trendSummary?.avg_category_growth || "+0.0%"}
              </div>
              <div className="text-sm text-orange-600/80 dark:text-orange-400/80">Avg Category Growth</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6">
          {trendAnalysis.map((category, index) => (
            <Card 
              key={index} 
              className={`
                border-border/50 bg-gradient-to-br ${getCategoryGradient(category.rank)} 
                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 
                hover:scale-[1.01] group animate-fadeInUp
              `}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank Badge */}
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300
                      ${category.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-lg animate-pulseGlow' :
                        category.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                        category.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-800 shadow-md' :
                        'bg-primary/10 text-primary border border-primary/20'}
                    `}>
                      {category.rank === 1 ? <Crown className="w-6 h-6" /> : category.rank}
                    </div>
                    
                    {/* Category Info */}
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {category.category}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-1 text-foreground/60">
                        Category performance overview • {category.keywords.length} keywords tracked
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Trend Indicator */}
                  <div className="flex items-center gap-3">
                    {getTrendIcon(category.trend)}
                    <Badge 
                      variant="outline"
                      className={`${getTrendColor(category.trend)} border font-semibold group-hover:scale-105 transition-transform duration-300`}
                    >
                      {category.change}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {category.keywords.map((keyword, keywordIndex) => (
                    <div 
                      key={keywordIndex} 
                      className="flex items-center justify-between p-4 bg-background/60 hover:bg-background/80 rounded-xl border border-border/30 hover:border-primary/20 transition-all duration-300 group/item cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {getTrendIcon(keyword.trend)}
                        <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
                          {keyword.keyword}
                        </span>
                        {keyword.isHot && (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-700 border-red-500/30 text-xs animate-pulse">
                            <Flame className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`
                            font-semibold transition-all duration-300 group-hover/item:scale-105
                            ${keyword.trend === "up" 
                              ? "bg-green-500/10 text-green-700 border-green-500/30"
                              : keyword.trend === "down"
                                ? "bg-red-500/10 text-red-700 border-red-500/30"
                                : "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
                            }
                          `}
                        >
                          {keyword.growth}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-foreground/40 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Category Actions */}
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                  <div className="text-sm text-foreground/60">
                    {category.keywords.filter((k) => k.trend === "up").length} keywords trending up
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-background/50 hover:bg-background transition-all duration-200">
                    <Star className="w-4 h-4" />
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '800ms' }}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Want deeper insights?</h3>
              <p className="text-foreground/60 mb-6">
                Explore our advanced analytics and predictive models for comprehensive beauty trend analysis.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
                  <BarChart3 className="w-4 h-4" />
                  Advanced Analytics
                </Button>
                <Button variant="outline" className="gap-2">
                  <Star className="w-4 h-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
