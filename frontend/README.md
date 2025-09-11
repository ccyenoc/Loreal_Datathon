# Frontend - Loreal Datathon

A modern Next.js web application for visualizing beauty trend analysis and predictions.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── categories/         # Category analysis pages
│   ├── predictions/        # Trend prediction pages
│   ├── trending/          # Trending content pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable React components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── public/               # Static assets
├── styles/               # Additional styling files
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features

- **Interactive Dashboard** - Real-time trend visualization
- **Category Analysis** - Beauty content categorization
- **Trend Predictions** - ML-powered forecasting
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Built with Radix UI and Tailwind CSS

## 🔧 Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **State Management:** React hooks
- **Forms:** React Hook Form with Zod validation