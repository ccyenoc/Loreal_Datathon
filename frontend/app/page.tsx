"use client"

"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { TrendingKeywords } from "@/components/trending-keywords"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { GrowthChart } from "@/components/growth-chart"
import { useState, useEffect } from "react"
import { apiService, type CategoryBreakdown as CategoryData } from "@/lib/api"

export default function Dashboard() {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await apiService.getCategoryBreakdown()
        setCategoryData(data)
      } catch (err) {
        console.error('Error fetching insights:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  // Get dynamic insights from real data
  const getTopGrowingCategory = () => {
    if (!categoryData.length) return { name: "Loading...", growth: "+0%" }
    
    const sorted = categoryData
      .filter(cat => cat.trend === 'up')
      .sort((a, b) => {
        const aGrowth = parseFloat(a.growth.replace('%', '').replace('+', ''))
        const bGrowth = parseFloat(b.growth.replace('%', '').replace('+', ''))
        return bGrowth - aGrowth
      })
    
    return sorted[0] || { name: "No growth", growth: "0%" }
  }

  const getTopEngagementCategory = () => {
    if (!categoryData.length) return { name: "Loading...", percentage: 0 }
    
    const sorted = [...categoryData].sort((a, b) => b.percentage - a.percentage)
    return sorted[0]
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Metrics Section */}
        <div className="animate-fadeInUp">
          <MetricsOverview />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Trending Keywords */}
          <div className="xl:col-span-1 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <TrendingKeywords />
          </div>

          {/* Right Column - Category Breakdown */}
          <div className="xl:col-span-2 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <CategoryBreakdown />
          </div>
        </div>

        {/* Full Width Growth Chart */}
        <div className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <GrowthChart />
        </div>

        {/* Additional Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
          {/* Quick Insights Card */}
          <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Insights</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                <span className="text-sm text-foreground">Most Growing Category</span>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {loading ? "Loading..." : `${getTopGrowingCategory().name.substring(0, 20)}${getTopGrowingCategory().name.length > 20 ? "..." : ""} (${getTopGrowingCategory().growth})`}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <span className="text-sm text-foreground">Top Engagement Category</span>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {loading ? "Loading..." : `${getTopEngagementCategory()?.name?.substring(0, 20)}${(getTopEngagementCategory()?.name?.length || 0) > 20 ? "..." : ""} (${getTopEngagementCategory()?.percentage}%)`}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
                <span className="text-sm text-foreground">Active Categories</span>
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {loading ? "Loading..." : `${categoryData.filter(cat => cat.trend === 'up').length} of ${categoryData.length} Growing`}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">System Performance</h3>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Data Processing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-green-600">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">API Response</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-blue-600">98%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Data Accuracy</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-purple-600">99%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
