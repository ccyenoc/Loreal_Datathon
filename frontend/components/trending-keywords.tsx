import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, ArrowRight, Sparkles, Crown } from "lucide-react"

const trendingData = [
  { 
    keyword: "exfoliation reveal best", 
    growth: 128.21, 
    trend: "up" as const,
    category: "Skincare",
    rank: 1,
    isHot: true
  },
  { 
    keyword: "reveal", 
    growth: 128.21, 
    trend: "up" as const,
    category: "Beauty",
    rank: 2,
    isHot: true
  },
  { 
    keyword: "key", 
    growth: 88.1, 
    trend: "up" as const,
    category: "General",
    rank: 3,
    isHot: false
  },
  { 
    keyword: "fade dark spots", 
    growth: 85.39, 
    trend: "up" as const,
    category: "Skincare",
    rank: 4,
    isHot: true
  },
  { 
    keyword: "hyperpigmentation", 
    growth: 85.39, 
    trend: "up" as const,
    category: "Skincare",
    rank: 5,
    isHot: false
  },
  { 
    keyword: "power facial toners", 
    growth: 77.22, 
    trend: "up" as const,
    category: "Skincare",
    rank: 6,
    isHot: false
  },
  { 
    keyword: "best skin", 
    growth: 59.09, 
    trend: "up" as const,
    category: "Beauty",
    rank: 7,
    isHot: false
  },
  { 
    keyword: "makeup skincare routine", 
    growth: 42.14, 
    trend: "up" as const,
    category: "Routine",
    rank: 8,
    isHot: false
  },
]

const getCategoryColor = (category: string) => {
  const colors = {
    "Skincare": "bg-blue-500/10 text-blue-700 border-blue-500/30",
    "Beauty": "bg-purple-500/10 text-purple-700 border-purple-500/30",
    "General": "bg-gray-500/10 text-gray-700 border-gray-500/30",
    "Routine": "bg-green-500/10 text-green-700 border-green-500/30",
  }
  return colors[category as keyof typeof colors] || colors.General
}

export function TrendingKeywords() {
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Top Trending Keywords</CardTitle>
              <p className="text-sm text-foreground/60 mt-1">Real-time growth analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {trendingData.map((item, index) => (
          <div 
            key={index} 
            className="group relative p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 hover:from-primary/5 hover:to-accent/5 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Rank indicator with special styling for top 3 */}
            <div className="flex items-center space-x-4">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300
                ${item.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-lg animate-pulseGlow' :
                  item.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                  item.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-800 shadow-md' :
                  'bg-primary/10 text-primary border border-primary/20'}
              `}>
                {item.rank === 1 ? <Crown className="w-4 h-4" /> : item.rank}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-foreground text-balance group-hover:text-primary transition-colors duration-300">
                    {item.keyword}
                  </span>
                  {item.isHot && (
                    <Badge variant="secondary" className="bg-red-500/10 text-red-700 border-red-500/30 text-xs animate-pulse">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getCategoryColor(item.category)} border`}
                  >
                    {item.category}
                  </Badge>
                  
                  <div className="flex items-center space-x-1">
                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(item.growth, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground/60">
                      {item.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border border-green-500/30 group-hover:scale-105 transition-transform duration-300"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{item.growth.toFixed(1)}%
                </Badge>
                
                <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
          </div>
        ))}

        {/* View More Button */}
        <div className="pt-4 border-t border-border/50">
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 border-primary/20 hover:border-primary/30 transition-all duration-300"
          >
            <Star className="w-4 h-4 mr-2" />
            View All Trending Keywords
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
