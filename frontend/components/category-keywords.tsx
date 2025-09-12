"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService, CategoryKeywordData } from "@/lib/api"

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "up":
      return "text-green-600"
    case "down":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export function CategoryKeywords() {
  const [categoryData, setCategoryData] = useState<CategoryKeywordData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getKeywordTrendsByCategory()
        setCategoryData(data)
      } catch (err) {
        setError('Failed to load category data')
        console.error('Error loading category data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading category data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  if (categoryData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No category data available</p>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {categoryData.map((category, index) => {
        if (index === 0) {
          return (
            <Card key={index} className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                  {category.category}
                  <Badge variant="secondary" className="text-sm">
                    {category.keywords.length} keywords
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto pr-2">
                  <div className="space-y-3">
                    {category.keywords.map((item, keywordIndex) => (
                      <div
                        key={keywordIndex}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {getTrendIcon(item.trend)}
                          <span className="font-medium text-foreground">{item.keyword}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-sm font-semibold ${getTrendColor(item.trend)}`}>
                            {item.trend === "up" ? "+" : item.trend === "down" ? "" : ""}
                            {item.growth_rate.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        }

        // Other categories - return null here, will be rendered in grid below
        return null
      })}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categoryData.slice(1).map((category, index) => (
          <Card key={index + 1} className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
                {category.category}
                <Badge variant="secondary" className="text-xs">
                  {category.keywords.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.keywords.slice(0, 5).map((item, keywordIndex) => (
                  <div
                    key={keywordIndex}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getTrendIcon(item.trend)}
                      <span className="font-medium text-foreground truncate text-sm">{item.keyword}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={`text-xs font-semibold ${getTrendColor(item.trend)}`}>
                        {item.trend === "up" ? "+" : item.trend === "down" ? "" : ""}
                        {item.growth_rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
                {category.keywords.length > 5 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-muted-foreground">+{category.keywords.length - 5} more keywords</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
