import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

// Beauty industry keyword data organized by categories
const categoryData = [
  {
    category: "General Beauty & Buzzwords",
    keywords: [
      { keyword: "makeup", trend: "up", growth_rate: 2.86 },
      { keyword: "beauty", trend: "up", growth_rate: 2.6 },
      { keyword: "haircare", trend: "up", growth_rate: 0.25 },
      { keyword: "skincare", trend: "up", growth_rate: 0.11 },
      { keyword: "review", trend: "down", growth_rate: -0.29 },
    ],
  },
  {
    category: "Makeup & Cosmetics",
    keywords: [
      { keyword: "spots", trend: "up", growth_rate: 85.39 },
      { keyword: "best skin", trend: "up", growth_rate: 59.09 },
      { keyword: "makeup skincare", trend: "up", growth_rate: 42.14 },
      { keyword: "makeup skincare routine", trend: "up", growth_rate: 42.14 },
      { keyword: "quick", trend: "up", growth_rate: 16.48 },
      { keyword: "makeup products month", trend: "up", growth_rate: 14.64 },
      { keyword: "month", trend: "up", growth_rate: 14.64 },
      { keyword: "makeupartist makeuptutorial", trend: "up", growth_rate: 10.79 },
      { keyword: "natural blush", trend: "up", growth_rate: 6.0 },
      { keyword: "headwear", trend: "up", growth_rate: 5.91 },
    ],
  },
  {
    category: "Beauty Reviews & Brands",
    keywords: [
      { keyword: "naturalmakeup luxurybeauty", trend: "up", growth_rate: 16.75 },
      { keyword: "hair beauty", trend: "up", growth_rate: 7.97 },
      { keyword: "mask beauty amp", trend: "up", growth_rate: 5.54 },
      { keyword: "hudabeauty", trend: "up", growth_rate: 5.16 },
      { keyword: "vogue", trend: "up", growth_rate: 4.47 },
      { keyword: "victoria secret", trend: "up", growth_rate: 3.69 },
      { keyword: "sephora", trend: "up", growth_rate: 3.41 },
      { keyword: "hair accessories", trend: "up", growth_rate: 3.39 },
      { keyword: "healthyhair", trend: "up", growth_rate: 3.35 },
      { keyword: "beauty amp", trend: "up", growth_rate: 2.93 },
    ],
  },
  {
    category: "Skincare & Anti-Aging",
    keywords: [
      { keyword: "anti aging", trend: "up", growth_rate: 3.96 },
      { keyword: "unachilenaenuk woman skincare", trend: "up", growth_rate: 2.79 },
      { keyword: "woman skincare", trend: "up", growth_rate: 2.79 },
      { keyword: "skincaretips", trend: "up", growth_rate: 2.12 },
      { keyword: "skin care", trend: "up", growth_rate: 1.24 },
      { keyword: "naturalmakeup skintint oliveskintone", trend: "up", growth_rate: 1.15 },
      { keyword: "skin care routine", trend: "up", growth_rate: 1.13 },
      { keyword: "skincare routine", trend: "up", growth_rate: 0.77 },
      { keyword: "skincareroutine description", trend: "up", growth_rate: 0.48 },
      { keyword: "skincareroutine", trend: "up", growth_rate: 0.11 },
    ],
  },
  {
    category: "Hair Coloring & Transformation",
    keywords: [
      { keyword: "haircare description", trend: "up", growth_rate: 12.33 },
      { keyword: "drastic hair", trend: "up", growth_rate: 6.93 },
      { keyword: "coloring", trend: "up", growth_rate: 5.94 },
      { keyword: "color hair", trend: "up", growth_rate: 5.46 },
      { keyword: "hair color transformations", trend: "up", growth_rate: 5.01 },
      { keyword: "hairstyles hair", trend: "up", growth_rate: 4.87 },
      { keyword: "hair balayage", trend: "up", growth_rate: 4.65 },
      { keyword: "hairdye", trend: "up", growth_rate: 4.35 },
      { keyword: "professional hair colour", trend: "up", growth_rate: 3.73 },
      { keyword: "bleaching", trend: "up", growth_rate: 3.67 },
    ],
  },
  {
    category: "Men's Fashion & Style",
    keywords: [
      { keyword: "beard styles", trend: "up", growth_rate: 4.48 },
      { keyword: "mensgrooming", trend: "up", growth_rate: 1.51 },
      { keyword: "men description", trend: "up", growth_rate: 1.08 },
      { keyword: "shorts hairstyle", trend: "up", growth_rate: 0.81 },
      { keyword: "styles", trend: "up", growth_rate: 0.78 },
      { keyword: "shorts fashion", trend: "up", growth_rate: 0.61 },
      { keyword: "fashion short", trend: "up", growth_rate: 0.6 },
      { keyword: "riddhi siddhi fashion", trend: "up", growth_rate: 0.6 },
      { keyword: "siddhi fashion short", trend: "up", growth_rate: 0.6 },
      { keyword: "fashion", trend: "up", growth_rate: 0.59 },
    ],
  },
]

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
