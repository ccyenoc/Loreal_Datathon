"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Eye, ArrowRight, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { apiService, type CategoryBreakdown } from "@/lib/api"

export function CategoryBreakdown() {
  const [categoryData, setCategoryData] = useState<CategoryBreakdown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await apiService.getCategoryBreakdown()
        setCategoryData(data)
      } catch (err) {
        setError('Failed to load category data')
        console.error('Error fetching category data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [])

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 rounded-xl bg-gray-100">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error || !categoryData.length) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 shadow-lg">
        <CardContent className="text-center p-8">
          <p className="text-red-500">{error || 'No category data available'}</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate overall performance
  const avgPerformance = categoryData.reduce((sum, cat) => sum + cat.percentage, 0) / categoryData.length
  const avgGrowth = categoryData.reduce((sum, cat) => {
    const growthValue = parseFloat(cat.growth.replace('%', '').replace('+', ''))
    return sum + growthValue
  }, 0) / categoryData.length
  // Helper function to get styling based on category name
  const getCategoryStyles = (name: string) => {
    const styles = {
      "Makeup & Cosmetics": {
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-500/10",
        borderColor: "border-pink-500/20",
        textColor: "text-pink-700 dark:text-pink-300",
      },
      "Skincare & Anti-Aging": {
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        textColor: "text-blue-700 dark:text-blue-300",
      },
      "Hair Coloring & Transformation": {
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        textColor: "text-purple-700 dark:text-purple-300",
      },
      "Beauty Reviews & Brands": {
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        textColor: "text-green-700 dark:text-green-300",
      },
      "Facial Care & Exercises": {
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20",
        textColor: "text-orange-700 dark:text-orange-300",
      },
      "Hair Transformations & Makeovers": {
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-500/10",
        borderColor: "border-indigo-500/20",
        textColor: "text-indigo-700 dark:text-indigo-300",
      },
      "Men's Fashion & Style": {
        color: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-500/20",
        textColor: "text-gray-700 dark:text-gray-300",
      },
      "General Beauty & Buzzwords": {
        color: "from-slate-500 to-slate-600",
        bgColor: "bg-slate-500/10",
        borderColor: "border-slate-500/20",
        textColor: "text-slate-700 dark:text-slate-300",
      },
      "Hair Styling & Men's Grooming": {
        color: "from-cyan-500 to-cyan-600",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",
        textColor: "text-cyan-700 dark:text-cyan-300",
      },
      "Vlogs & Lifestyle": {
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        textColor: "text-emerald-700 dark:text-emerald-300",
      },
    }
    return styles[name as keyof typeof styles] || styles["General Beauty & Buzzwords"]
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Category Performance</CardTitle>
              <p className="text-sm text-foreground/60 mt-1">Trending analysis by category</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {categoryData.map((category, index) => {
          const styles = getCategoryStyles(category.name)
          
          return (
            <div 
              key={index} 
              className="group p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 hover:from-primary/5 hover:to-accent/5 border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${styles.bgColor} border ${styles.borderColor} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-balance">
                        {category.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${styles.bgColor} ${styles.borderColor} ${styles.textColor} border`}>
                          {category.count} keywords
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            category.trend === "up" 
                              ? "bg-green-500/10 text-green-700 border-green-500/30" 
                              : "bg-red-500/10 text-red-700 border-red-500/30"
                          } border`}
                        >
                          {category.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {category.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                      {category.percentage}%
                    </div>
                    <div className="text-xs text-foreground/60">engagement</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <span>Performance Score</span>
                    <span>{category.percentage}/100</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={category.percentage} 
                      className="h-3 bg-secondary/50"
                    />
                    {/* Custom gradient overlay for progress */}
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${styles.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-foreground/60">Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-foreground/60">High Interest</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          )
        })}

        {/* Summary Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Overall Performance</div>
              <div className="text-xs text-foreground/60 mt-1">Average category engagement: {avgPerformance.toFixed(1)}%</div>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              {avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)}% overall
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
