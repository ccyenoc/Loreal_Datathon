import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Eye, ArrowRight, Star } from "lucide-react"

const categoryData = [
  { 
    name: "Makeup & Cosmetics", 
    count: 10, 
    percentage: 85, 
    growth: "+12%",
    trend: "up" as const,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    textColor: "text-pink-700 dark:text-pink-300",
    icon: "💄"
  },
  { 
    name: "Skincare & Anti-Aging", 
    count: 10, 
    percentage: 78, 
    growth: "+18%",
    trend: "up" as const,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-700 dark:text-blue-300",
    icon: "🧴"
  },
  { 
    name: "Hair Coloring & Transformation", 
    count: 10, 
    percentage: 65, 
    growth: "+8%",
    trend: "up" as const,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-700 dark:text-purple-300",
    icon: "💇‍♀️"
  },
  { 
    name: "Beauty Reviews & Brands", 
    count: 10, 
    percentage: 58, 
    growth: "+5%",
    trend: "up" as const,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    textColor: "text-green-700 dark:text-green-300",
    icon: "⭐"
  },
  { 
    name: "Facial Care & Exercises", 
    count: 10, 
    percentage: 45, 
    growth: "+3%",
    trend: "up" as const,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    textColor: "text-orange-700 dark:text-orange-300",
    icon: "✨"
  },
  { 
    name: "Hair Transformations & Makeovers", 
    count: 9, 
    percentage: 38, 
    growth: "+2%",
    trend: "up" as const,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    textColor: "text-indigo-700 dark:text-indigo-300",
    icon: "💇"
  },
  { 
    name: "Men's Fashion & Style", 
    count: 10, 
    percentage: 32, 
    growth: "-1%",
    trend: "down" as const,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
    textColor: "text-gray-700 dark:text-gray-300",
    icon: "👔"
  },
  { 
    name: "General Beauty & Buzzwords", 
    count: 5, 
    percentage: 28, 
    growth: "-3%",
    trend: "down" as const,
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
    textColor: "text-slate-700 dark:text-slate-300",
    icon: "🎯"
  },
]

export function CategoryBreakdown() {
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
        {categoryData.map((category, index) => (
          <div 
            key={index} 
            className="group p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 hover:from-primary/5 hover:to-accent/5 border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-3">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${category.bgColor} border ${category.borderColor} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-balance">
                      {category.name}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${category.bgColor} ${category.borderColor} ${category.textColor} border`}>
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
                    className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
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
        ))}

        {/* Summary Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Overall Performance</div>
              <div className="text-xs text-foreground/60 mt-1">Average category engagement: 54.9%</div>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              +7.2% overall
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
