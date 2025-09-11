import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "L'Oréal Analytics Dashboard | Beauty Industry Intelligence",
  description: "Advanced beauty industry trends and analytics dashboard powered by L'Oréal. Real-time insights, predictive analytics, and comprehensive market intelligence for beauty professionals.",
  keywords: ["L'Oréal", "beauty analytics", "trends", "cosmetics", "market intelligence", "beauty industry"],
  authors: [{ name: "L'Oréal Analytics Team" }],
  creator: "L'Oréal",
  publisher: "L'Oréal",
  openGraph: {
    title: "L'Oréal Analytics Dashboard",
    description: "Beauty industry trends and analytics dashboard",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Oréal Analytics Dashboard",
    description: "Beauty industry trends and analytics dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.35_0.12_15_/_0.03),transparent_50%)] pointer-events-none" />
            
            <Suspense fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulseGlow">
                    <span className="text-primary-foreground font-bold text-xl">L</span>
                  </div>
                  <div className="text-foreground font-medium">Loading L'Oréal Analytics...</div>
                  <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-primary to-accent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            }>
              <div className="flex relative z-10">
                <Sidebar />
                <main className="flex-1 overflow-hidden">
                  <div className="h-screen overflow-y-auto scroll-smooth">
                    {children}
                  </div>
                </main>
              </div>
            </Suspense>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
