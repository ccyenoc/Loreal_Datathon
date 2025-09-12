"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, TrendingUp, TrendingDown, Activity, AlertCircle, Sparkles, Clock, Eye, Brain, Lightbulb, Target } from "lucide-react"
import { apiService, type KeywordCheckerResponse } from "@/lib/api"

export default function KeywordCheckerPage() {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState<KeywordCheckerResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await apiService.checkKeyword(keyword.trim())
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while checking the keyword")
    } finally {
      setLoading(false)
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'emerging':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'growing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'peaking':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'decaying':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'stable':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'emerging':
      case 'growing':
        return <TrendingUp className="w-4 h-4" />
      case 'decaying':
        return <TrendingDown className="w-4 h-4" />
      case 'peaking':
        return <Sparkles className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const formatVelocity = (velocity: number) => {
    if (velocity > 0) {
      return `+${velocity.toFixed(1)}`
    }
    return velocity.toFixed(1)
  }

  const getVelocityColor = (velocity: number) => {
    if (velocity > 10) return 'text-green-600'
    if (velocity > 0) return 'text-blue-600'
    if (velocity > -10) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.35_0.12_15_/_0.03),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Custom Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Search className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Keyword Checker
                    </h2>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/30">
                      AI Powered
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-foreground/70">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Real-time analysis</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>10+ categories available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-4xl mx-auto">
          {/* Search Form */}
          <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Keyword Analysis
              </CardTitle>
              <CardDescription>
                Enter a keyword to analyze its trend phase, category match, and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword</Label>
                  <div className="flex gap-2">
                    <Input
                      id="keyword"
                      type="text"
                      placeholder="e.g., hair beauty, makeup tutorial, skincare routine..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="flex-1"
                      disabled={loading}
                    />
                    <Button type="submit" disabled={loading || !keyword.trim()}>
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                      {loading ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="shadow-lg border-red-200 bg-red-50/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error:</span>
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Overview Card */}
              <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Analysis Results for "{result.user_keyword}"
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Match */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">Best Category Match</h4>
                      <Badge variant="outline" className="text-xs">
                        {(result.category_similarity * 100).toFixed(1)}% similarity
                      </Badge>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {result.matched_category.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phase Card */}
                <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Trend Phase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {getPhaseIcon(result.phase)}
                        <Badge className={`${getPhaseColor(result.phase)} font-medium`}>
                          {result.phase}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.phase_description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Velocity Card */}
                <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`text-2xl font-bold ${getVelocityColor(result.velocity)}`}>
                        {formatVelocity(result.velocity)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.velocity_description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Card */}
                <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-primary">
                        {(result.engagement_rate * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.engagement_description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Analysis Section */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI-Powered Trend Analysis
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Gemini AI
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Advanced insights based on current metrics and beauty industry patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Future Trend Prediction */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-muted-foreground">Future Trend Prediction</h4>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg border">
                      <p className="text-sm text-foreground leading-relaxed">
                        {result.future_trend}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Insights */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <h4 className="text-sm font-semibold text-muted-foreground">Key Insights</h4>
                      </div>
                      <div className="space-y-2">
                        {result.insights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-background/50 rounded-lg border">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-foreground">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-500" />
                        <h4 className="text-sm font-semibold text-muted-foreground">Strategic Recommendations</h4>
                      </div>
                      <div className="space-y-2">
                        {result.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-background/50 rounded-lg border">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-foreground">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
