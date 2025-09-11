import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, Target, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"

export function MetricsOverview() {
  const metrics = [
    {
      title: "Total Keywords Tracked",
      value: "127",
      change: "+12%",
      changeValue: "+14 this month",
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
      value: "89",
      change: "+23%",
      changeValue: "+16 since yesterday",
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
      value: "8",
      change: "-15%",
      changeValue: "-3 since yesterday",
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
      value: "128.2%",
      change: "Exfoliation Reveal Best",
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
      {metrics.map((metric, index) => (
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
