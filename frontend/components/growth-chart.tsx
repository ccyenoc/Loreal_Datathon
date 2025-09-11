"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, BarChart3, Download, Maximize2, RefreshCw } from "lucide-react"

const chartData = [
  { 
    category: "Makeup & Cosmetics", 
    avgGrowth: 42.5, 
    color: "hsl(var(--chart-1))",
    trend: "up",
    change: "+8.2%",
    keywordCount: 127
  },
  { 
    category: "Skincare & Anti-Aging", 
    avgGrowth: 18.2, 
    color: "hsl(var(--chart-2))",
    trend: "up",
    change: "+5.1%",
    keywordCount: 89
  },
  { 
    category: "Hair Coloring", 
    avgGrowth: 15.8, 
    color: "hsl(var(--chart-3))",
    trend: "up",
    change: "+3.4%",
    keywordCount: 76
  },
  { 
    category: "Beauty Reviews", 
    avgGrowth: 12.3, 
    color: "hsl(var(--chart-4))",
    trend: "up",
    change: "+2.8%",
    keywordCount: 64
  },
  { 
    category: "Facial Care", 
    avgGrowth: 8.7, 
    color: "hsl(var(--chart-5))",
    trend: "up",
    change: "+1.9%",
    keywordCount: 52
  },
  { 
    category: "Hair Transformations", 
    avgGrowth: 6.2, 
    color: "hsl(var(--chart-1))",
    trend: "stable",
    change: "+0.5%",
    keywordCount: 43
  },
  { 
    category: "Men's Grooming", 
    avgGrowth: 4.1, 
    color: "hsl(var(--chart-2))",
    trend: "down",
    change: "-0.3%",
    keywordCount: 31
  },
  { 
    category: "General Beauty", 
    avgGrowth: 2.8, 
    color: "hsl(var(--chart-3))",
    trend: "down",
    change: "-1.2%",
    keywordCount: 28
  },
]

const chartConfig = {
  avgGrowth: {
    label: "Average Growth Rate (%)",
    color: "hsl(var(--chart-1))",
  },
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-foreground mb-2">{label}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground/70">Growth Rate:</span>
            <span className="font-bold text-primary">{data.avgGrowth}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground/70">Change:</span>
            <Badge variant={data.trend === "up" ? "default" : data.trend === "down" ? "destructive" : "secondary"}>
              {data.change}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground/70">Keywords:</span>
            <span className="font-medium">{data.keywordCount}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function GrowthChart() {
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Category Growth Analytics</CardTitle>
              <p className="text-sm text-foreground/60 mt-1">Average growth rate by beauty category</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
            
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Maximize2 className="w-4 h-4" />
              Expand
            </Button>
            
            <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary/90">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-3 border border-blue-500/20">
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">16.7%</div>
            <div className="text-xs text-blue-600/80 dark:text-blue-400/80">Average Growth</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg p-3 border border-green-500/20">
            <div className="text-lg font-bold text-green-700 dark:text-green-300">42.5%</div>
            <div className="text-xs text-green-600/80 dark:text-green-400/80">Highest Growth</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-3 border border-purple-500/20">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">8</div>
            <div className="text-xs text-purple-600/80 dark:text-purple-400/80">Categories</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-3 border border-orange-500/20">
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">510</div>
            <div className="text-xs text-orange-600/80 dark:text-orange-400/80">Total Keywords</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Chart Container */}
          <ChartContainer config={chartConfig} className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                barCategoryGap="20%"
              >
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  label={{ 
                    value: 'Growth Rate (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' }
                  }}
                />
                <ChartTooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="avgGrowth" 
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="hover:brightness-110 transition-all duration-200"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Gradient Overlay for Visual Enhancement */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-transparent pointer-events-none rounded-lg" />
        </div>
        
        {/* Legend */}
        <div className="mt-6 p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                <span className="text-foreground/70">Growth Trending Up</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                <span className="text-foreground/70">Growth Declining</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full" />
                <span className="text-foreground/70">Stable</span>
              </div>
            </div>
            <div className="text-foreground/60">
              Data updated every 15 minutes
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
