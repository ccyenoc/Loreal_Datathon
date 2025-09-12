"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, Target, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { apiService, type Metric } from "@/lib/api"

export function MetricsOverview() {
  const [metrics, setMetrics] = useState<Metric | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getMetrics()
        setMetrics(data)
      } catch (err) {
        setError('Failed to load metrics')
        console.error('Error fetching metrics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error || 'Failed to load metrics'}</p>
      </div>
    )
  }

  const metricCards = [
    {
      title: "Total Keywords Tracked",
      value: metrics.total_keywords.toString(),
      change: "+12%",
      changeValue: "Active tracking",
      trend: "up" as const,
      icon: Target,
      color: "blue",
      gradient: "from-blue-500/20 to-blue-600/20",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-700 dark:text-blue-300",
      subTextColor: "text-blue-600/80 dark:text-blue-400/80",
    },
    {
      title: "Trending Up",
      value: metrics.trending_up.toString(),
      change: "+23%",
      changeValue: "Growing keywords",
      trend: "up" as const,
      icon: TrendingUp,
      color: "green",
      gradient: "from-green-500/20 to-green-600/20",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-700 dark:text-green-300",
      subTextColor: "text-green-600/80 dark:text-green-400/80",
    },
    {
      title: "Trending Down",
      value: metrics.trending_down.toString(),
      change: "-15%",
      changeValue: "Declining keywords",
      trend: "down" as const,
      icon: TrendingDown,
      color: "orange",
      gradient: "from-orange-500/20 to-orange-600/20",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-700 dark:text-orange-300",
      subTextColor: "text-orange-600/80 dark:text-orange-400/80",
    },
    {
      title: "Top Growth Rate",
      value: metrics.top_growth_rate,
      change: metrics.top_keyword.length > 20 ? metrics.top_keyword.substring(0, 20) + "..." : metrics.top_keyword,
      changeValue: "Leading keyword",
      trend: "up" as const,
      icon: Eye,
      color: "purple",
      gradient: "from-purple-500/20 to-purple-600/20",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-700 dark:text-purple-300",
      subTextColor: "text-purple-600/80 dark:text-purple-400/80",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metricCards.map((metric, index) => (
        <Card 
          key={index} 
          className={`
            relative overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
            bg-gradient-to-br ${metric.gradient} backdrop-blur-sm
            ${metric.borderColor} group cursor-pointer
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor} border ${metric.borderColor} group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className={`h-4 w-4 ${metric.textColor}`} />
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {/* Main Value */}
              <div className="flex items-end space-x-2">
                <div className={`text-3xl font-bold ${metric.textColor} group-hover:scale-105 transition-transform duration-300`}>
                  {metric.value}
                </div>
                {metric.trend === "up" ? (
                  <Sparkles className="h-4 w-4 text-yellow-500 animate-float" />
                ) : null}
              </div>

              {/* Change Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-sm font-semibold ${
                    metric.trend === "up" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {metric.change}
                  </span>
                </div>
                
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${metric.bgColor} ${metric.borderColor} ${metric.subTextColor} border`}
                >
                  {metric.trend === "up" ? "↗" : "↘"} Live
                </Badge>
              </div>

              {/* Additional Info */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-foreground/60 font-medium">
                  {metric.changeValue}
                </p>
              </div>
            </div>
          </CardContent>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
      ))}
    </div>
  )
}
