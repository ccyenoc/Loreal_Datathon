import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CopySlash as Crystal, TrendingUp, Sparkles, Target, Brain, Zap, ArrowRight, Star, Download } from "lucide-react"

// Sample prediction data for 6 months ahead
const predictions = [
  {
    category: "General Beauty & Buzzwords",
    confidence: 92,
    icon: "🎯",
    rank: 4,
    predictedKeywords: [
      { keyword: "AI beauty advisor", probability: 89, growth: "+156%", impact: "high" },
      { keyword: "personalized skincare", probability: 85, growth: "+134%", impact: "high" },
      { keyword: "sustainable packaging", probability: 82, growth: "+98%", impact: "medium" },
      { keyword: "microbiome skincare", probability: 78, growth: "+87%", impact: "medium" },
      { keyword: "beauty tech", probability: 75, growth: "+76%", impact: "high" },
    ],
  },
  {
    category: "Makeup & Cosmetics",
    confidence: 88,
    icon: "💄",
    rank: 1,
    predictedKeywords: [
      { keyword: "virtual makeup try-on", probability: 91, growth: "+145%", impact: "high" },
      { keyword: "color-changing makeup", probability: 83, growth: "+112%", impact: "high" },
      { keyword: "long-wear formulas", probability: 79, growth: "+89%", impact: "medium" },
      { keyword: "inclusive shade range", probability: 76, growth: "+67%", impact: "medium" },
      { keyword: "makeup for sensitive skin", probability: 72, growth: "+54%", impact: "low" },
    ],
  },
  {
    category: "Skincare & Anti-Aging",
    confidence: 95,
    icon: "🧴",
    rank: 2,
    predictedKeywords: [
      { keyword: "peptide skincare", probability: 94, growth: "+178%", impact: "high" },
      { keyword: "bakuchiol serum", probability: 89, growth: "+156%", impact: "high" },
      { keyword: "skin barrier repair", probability: 86, growth: "+134%", impact: "high" },
      { keyword: "probiotic skincare", probability: 81, growth: "+98%", impact: "medium" },
      { keyword: "blue light protection", probability: 77, growth: "+76%", impact: "medium" },
    ],
  },
  {
    category: "Hair Care & Styling",
    confidence: 85,
    icon: "💇‍♀️",
    rank: 3,
    predictedKeywords: [
      { keyword: "scalp microbiome", probability: 87, growth: "+123%", impact: "high" },
      { keyword: "bond building treatment", probability: 84, growth: "+109%", impact: "high" },
      { keyword: "heat-free styling", probability: 80, growth: "+87%", impact: "medium" },
      { keyword: "hair wellness", probability: 76, growth: "+65%", impact: "medium" },
      { keyword: "customized hair care", probability: 73, growth: "+54%", impact: "low" },
    ],
  },
]

function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return "bg-green-500/10 text-green-700 border-green-500/30"
  if (confidence >= 80) return "bg-blue-500/10 text-blue-700 border-blue-500/30"
  if (confidence >= 70) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
  return "bg-red-500/10 text-red-700 border-red-500/30"
}

function getImpactColor(impact: string) {
  switch (impact) {
    case "high":
      return "bg-red-500/10 text-red-700 border-red-500/30"
    case "medium":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
    case "low":
      return "bg-green-500/10 text-green-700 border-green-500/30"
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-500/30"
  }
}

function getCategoryGradient(rank: number) {
  const gradients = [
    "from-pink-500/20 to-pink-600/20", // Makeup
    "from-blue-500/20 to-blue-600/20", // Skincare
    "from-purple-500/20 to-purple-600/20", // Hair
    "from-green-500/20 to-green-600/20", // General
  ]
  return gradients[rank - 1] || gradients[3]
}

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <Crystal className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                AI-Powered Predictions
              </h1>
              <p className="text-foreground/60 text-lg">6-month keyword trend forecasting powered by machine learning</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/30 animate-pulse">
                <Brain className="w-3 h-3 mr-1" />
                AI Predictions
              </Badge>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Target className="w-6 h-6 text-green-700 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80 font-medium">Avg Confidence</p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">90%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">Predicted Growth</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">+98%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Sparkles className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600/80 dark:text-purple-400/80 font-medium">New Keywords</p>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">20</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-700 dark:text-orange-300" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600/80 dark:text-orange-400/80 font-medium">High Impact</p>
                    <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid gap-6">
          {predictions.map((category, index) => (
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
                    {/* Confidence Badge */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    
                    {/* Category Info */}
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.category}
                      </CardTitle>
                      <CardDescription className="mt-1 text-foreground/60">
                        6-month AI trend predictions • {category.predictedKeywords.length} keywords forecasted
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Confidence Indicator */}
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <Badge 
                      variant="outline"
                      className={`${getConfidenceColor(category.confidence)} border font-semibold group-hover:scale-105 transition-transform duration-300`}
                    >
                      {category.confidence}% Confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {category.predictedKeywords.map((keyword, keywordIndex) => (
                    <div 
                      key={keywordIndex} 
                      className="p-4 bg-background/60 hover:bg-background/80 rounded-xl border border-border/30 hover:border-primary/20 transition-all duration-300 group/item"
                    >
                      <div className="space-y-3">
                        {/* Keyword Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Crystal className="w-4 h-4 text-primary group-hover/item:scale-110 transition-transform duration-300" />
                            <span className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
                              {keyword.keyword}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getImpactColor(keyword.impact)} border`}
                            >
                              {keyword.impact} impact
                            </Badge>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-500/10 text-green-700 border-green-500/30 font-semibold group-hover/item:scale-105 transition-transform duration-300"
                          >
                            {keyword.growth}
                          </Badge>
                        </div>
                        
                        {/* Probability Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-foreground/60">
                            <span>Prediction Probability</span>
                            <span className="font-medium">{keyword.probability}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={keyword.probability} className="h-2 bg-secondary/50" />
                            <div 
                              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                              style={{ width: `${keyword.probability}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Category Footer */}
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                  <div className="text-sm text-foreground/60">
                    {category.predictedKeywords.filter(k => k.impact === "high").length} high-impact predictions
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

        {/* AI Insights Footer */}
        <div className="mt-8 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Powered by Advanced ML Models</h3>
                </div>
                <p className="text-foreground/60 mb-6 max-w-2xl mx-auto">
                  Our AI analyzes millions of data points from social media, search trends, and beauty industry patterns 
                  to provide accurate 6-month forecasts with confidence intervals.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90">
                    <Download className="w-4 h-4" />
                    Download Forecast Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Crystal className="w-4 h-4" />
                    Model Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
