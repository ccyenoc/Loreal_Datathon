// lib/api.ts - API service for fetching data

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Metric {
  total_keywords: number;
  trending_up: number;
  trending_down: number;
  top_growth_rate: string;
  top_keyword: string;
}

export interface TrendingKeyword {
  keyword: string;
  growth_rate: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

export interface CategoryBreakdown {
  name: string;
  count: number;
  percentage: number;
  growth: string;
  trend: 'up' | 'down';
  icon: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagement_rate: number;
}

export interface GrowthChartData {
  month: string;
  keywords: number;
  engagement: number;
  reach: number;
}

export interface CategoryKeywordData {
  category: string;
  keywords: Array<{
    keyword: string;
    trend: 'up' | 'down' | 'stable';
    growth_rate: number;
  }>;
}

export interface TrendAnalysisData {
  category: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  icon: string;
  rank: number;
  keywords: Array<{
    keyword: string;
    growth: string;
    trend: 'up' | 'down' | 'stable';
    isHot: boolean;
  }>;
  avg_growth: number;
  trending_up_count: number;
  trending_down_count: number;
}

export interface TrendSummary {
  categories_trending_up_percentage: string;
  highest_growth: string;
  hot_keywords_count: number;
  avg_category_growth: string;
}

export interface KeywordCheckerRequest {
  keyword: string;
}

export interface KeywordCheckerResponse {
  user_keyword: string;
  matched_category: string;
  category_similarity: number;
  matched_keyword: string;
  keyword_similarity: number;
  phase: string;
  velocity: number;
  engagement_rate: number;
  velocity_description: string;
  engagement_description: string;
  phase_description: string;
}

class ApiService {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getMetrics(): Promise<Metric> {
    return this.fetchData<Metric>('/metrics');
  }

  async getTrendingKeywords(): Promise<TrendingKeyword[]> {
    return this.fetchData<TrendingKeyword[]>('/trending-keywords');
  }

  async getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
    return this.fetchData<CategoryBreakdown[]>('/category-breakdown');
  }

  async getGrowthChart(): Promise<GrowthChartData[]> {
    return this.fetchData<GrowthChartData[]>('/growth-chart');
  }

  async getCategories(): Promise<any[]> {
    return this.fetchData<any[]>('/categories');
  }

  async getCategoryKeywords(): Promise<CategoryKeywordData[]> {
    return this.fetchData<CategoryKeywordData[]>('/trending-keywords');
  }

  async getKeywordTrendsByCategory(): Promise<CategoryKeywordData[]> {
    return this.fetchData<CategoryKeywordData[]>('/keyword-trends-by-category');
  }

  async getTrendAnalysis(): Promise<TrendAnalysisData[]> {
    return this.fetchData<TrendAnalysisData[]>('/trend-analysis');
  }

  async getTrendSummary(): Promise<TrendSummary> {
    return this.fetchData<TrendSummary>('/trend-summary');
  }

  async checkKeyword(keyword: string): Promise<KeywordCheckerResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/keyword-checker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking keyword:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
