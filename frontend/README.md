# 🌐 Beauty Scope Frontend - Beauty Trend Dashboard

The frontend component of Beauty Scope, a modern Next.js web application that provides an intuitive interface for exploring beauty trends, analyzing categories, and discovering emerging opportunities in the beauty industry.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (recommended: latest LTS version)
- **npm**, **yarn**, or **pnpm** package manager
- Backend API running on `http://localhost:5000`

### Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm (recommended)
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Architecture

```
frontend/
├── 🏠 app/                     # Next.js App Router (Primary routing)
│   ├── 📊 categories/          # Category analysis & breakdown
│   ├── 🔮 predictions/         # Trend predictions & forecasting
│   ├── 📈 trending/            # Real-time trending analysis
│   ├── 🔍 keyword-checker/     # Smart keyword analysis tool
│   ├── 🎨 globals.css          # Global styling & CSS variables
│   ├── 📱 layout.tsx           # Root application layout
│   └── 🏡 page.tsx            # Homepage dashboard
│
├── 🧩 components/              # Reusable UI Components
│   ├── 📊 category-breakdown.tsx    # Category performance widgets
│   ├── 🔍 category-keywords.tsx     # Keyword analysis components
│   ├── 📱 dashboard-header.tsx      # Navigation & header
│   ├── 📈 trend-charts.tsx          # Data visualization charts
│   └── 🎯 ui/                       # Base UI primitives (Radix UI)
│
├── 🎣 hooks/                   # Custom React Hooks
│   ├── 🔄 useApi.ts                 # API data fetching
│   ├── 📊 useCategories.ts          # Category state management
│   └── 📈 useTrends.ts              # Trend data handling
│
├── 🛠️ lib/                     # Utility Libraries
│   ├── 📡 api.ts                    # API client configuration
│   ├── 🎨 utils.ts                  # Common utility functions
│   └── 🔍 cn.ts                     # Tailwind class merging
│
├── 🌍 public/                  # Static Assets
│   ├── 🖼️ images/                   # Application images
│   ├── 📊 icons/                    # SVG icons & graphics
│   └── 📄 favicon.ico               # Browser favicon
│
├── 🎨 styles/                  # Additional Styling
│   └── 📱 components.css            # Component-specific styles
│
├── ⚙️ Configuration Files
│   ├── 📦 package.json              # Dependencies & scripts
│   ├── 🎯 tsconfig.json             # TypeScript configuration
│   ├── 🌪️ tailwind.config.js       # Tailwind CSS settings
│   ├── ⚡ next.config.mjs           # Next.js configuration
│   └── 🎨 postcss.config.mjs       # PostCSS configuration
│
└── 📖 README.md                # This documentation
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

## 🎨 Key Features & Pages

### 🏡 Dashboard Overview (`/`)
- **Metrics Summary**: Key performance indicators
- **Category Breakdown**: Visual representation of beauty categories
- **Trending Keywords**: Real-time trend indicators
- **Quick Navigation**: Access to all analysis tools

### 📊 Category Analysis (`/categories`)
- **10 Beauty Categories**: Detailed breakdown by engagement
- **Performance Metrics**: Views, likes, comments, growth rates
- **Trend Indicators**: Up/down arrows with percentage changes
- **Interactive Charts**: Visual data representation

### 📈 Trending Analysis (`/trending`)
- **Trend Rankings**: Categories ranked by growth performance
- **Growth Charts**: Time-series data visualization
- **Hot Keywords**: Emerging and declining trend identification
- **Market Intelligence**: Strategic insights and opportunities

### 🔮 Predictions (`/predictions`)
- **Trend Forecasting**: ML-powered trend predictions
- **Phase Classification**: Emerging → Growing → Peaking → Decaying
- **Market Timing**: Optimal content creation windows
- **Risk Assessment**: Trend saturation analysis

### 🔍 Keyword Checker (`/keyword-checker`)
- **Smart Search**: Semantic similarity matching
- **Category Classification**: Automatic beauty category detection
- **Trend Analysis**: Keyword-specific trend insights
- **AI Recommendations**: Gemini-powered strategic advice

## 🎯 Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Modern React with concurrent features

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icons
- **CSS Variables** - Dynamic theming support

### Data & State Management
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Custom Hooks** - Centralized state management
- **Fetch API** - Native browser data fetching

### Charts & Visualization
- **Recharts** - Composable charting library
- **Responsive Design** - Mobile-first chart adaptations
- **Interactive Elements** - Hover states and animations

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformation and optimization
- **pnpm** - Fast, disk space efficient package manager

## 🔗 API Integration

The frontend communicates with the Flask backend through RESTful endpoints:

### Core Endpoints
```typescript
// Category data
GET /api/categories
GET /api/category-breakdown

// Trending analysis
GET /api/trending-keywords
GET /api/trend-analysis
GET /api/trend-summary

// Keyword intelligence
POST /api/keyword-checker

// Dashboard metrics
GET /api/metrics
GET /api/growth-chart
```

### Data Flow
```
User Input → Frontend Validation → API Request → 
Backend Processing → ML Analysis → 
Formatted Response → UI Update
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Manual Deployment
```bash
npm run build
npm start
```

---

**Built with 💄 for the beauty industry's future** ✨