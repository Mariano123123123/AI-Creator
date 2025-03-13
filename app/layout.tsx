import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HelpButton } from "@/components/help-button"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { SchemaOrg } from "@/components/schema-org"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "AI Creator Platform | Generate Images, Characters & Chat with AI",
    template: "%s | AI Creator Platform",
  },
  description:
    "Create stunning AI-generated images, design unique characters, and chat with advanced AI models. Try our powerful creative tools today.",
  keywords: [
    "AI",
    "artificial intelligence",
    "image generation",
    "character creation",
    "AI chat",
    "creative tools",
    "AI platform",
  ],
  authors: [{ name: "AI Creator Team" }],
  creator: "AI Creator Platform",
  publisher: "AI Creator Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aicreator-platform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicreator-platform.com",
    title: "AI Creator Platform | Generate Images, Characters & Chat with AI",
    description:
      "Create stunning AI-generated images, design unique characters, and chat with advanced AI models. Try our powerful creative tools today.",
    siteName: "AI Creator Platform",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Creator Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Creator Platform | Generate Images, Characters & Chat with AI",
    description:
      "Create stunning AI-generated images, design unique characters, and chat with advanced AI models. Try our powerful creative tools today.",
    images: ["/twitter-image.jpg"],
    creator: "@aicreator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-primary-foreground focus:z-50"
              >
                Skip to main content
              </a>
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <HelpButton />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <SchemaOrg />
      </body>
    </html>
  )
}



import './globals.css'