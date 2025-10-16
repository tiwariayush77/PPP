import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font with optimization
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Improves font loading performance
});

// Separate viewport export (Next.js App Router best practice)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allows zooming for accessibility
  userScalable: true, // Better accessibility
  viewportFit: 'cover', // Enable safe-area-inset support on mobile
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.ayushtiwari.tech'),
  title: {
    default: "Ayush Tiwari - Product Manager | 3+ YOE in 0-to-1 Development",
    template: "%s | Ayush Tiwari Portfolio"
  },
  description: "Product Management Fellow with 3+ years experience in FinTech, EdTech, and entrepreneurship. Founded BrightBunny | GTM & User Research | Fintech - EdTech - SaaS",
  keywords: [
    // Core Identity
    "Ayush Tiwari",
    "Product Manager", 
    "Product Management Fellow",
    
    // Experience & Skills
    "0-to-1 Product Development",
    "Product Strategy",
    "User Research",
    "GTM Strategy",
    "Product-Market Fit",
    "A/B Testing",
    "Data Analytics",
    "Cross-functional Leadership",
    "Agile Scrum",
    
    // Industries & Companies
    "FinTech",
    "EdTech", 
    "B2B SaaS",
    "Product Space",
    "Vance Inc",
    "BrightBunny",
    "Exampeer",
    "Truecaller",
    
    // Achievements & Recognition
    "Founder",
    "Entrepreneur",
    "Product Management Jobs",
    "PM Fellowship",
    
    // Location & Availability
    "Bengaluru",
    "Mumbai",
    "Delhi NCR",
    "India",
    "Remote Work"
  ],
  authors: [
    {
      name: "Ayush Tiwari",
      url: "https://portfolio.ayushtiwari.tech/",
    },
  ],
  creator: "Ayush Tiwari",
  publisher: "Ayush Tiwari",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Ayush Tiwari - Product Manager | 3+ YOE in 0-to-1 Development",
    description: "Product Management Fellow with 3+ years experience in FinTech, EdTech, and entrepreneurship. Founded BrightBunny | GTM & User Research",
    siteName: "Ayush Tiwari Portfolio",
    images: [
      {
        url: "/portfolio.png", // Will be resolved with metadataBase
        width: 1200,
        height: 630,
        alt: "Ayush Tiwari - Professional Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Tiwari - Product Manager | 3+ YOE in 0-to-1 Development",
    description: "Product Management Fellow with 3+ years experience in FinTech, EdTech, and entrepreneurship. Founded BrightBunny | GTM & User Research",
    creator: "@tiwariayush77",
    site: "@tiwariayush77",
    images: [
      {
        url: "/portfolio.png",
        alt: "Ayush Tiwari Professional Portfolio"
      }
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512x512.png", 
        sizes: "512x512",
        type: "image/png",
      }
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  category: "portfolio",
  classification: "Professional Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code-here", // TODO: Update with actual verification code
  },
};

// Structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://portfolio.ayushtiwari.tech/#person",
      "name": "Ayush Tiwari",
      "givenName": "Ayush",
      "familyName": "Tiwari",
      "jobTitle": "Product Manager",
      "url": "https://portfolio.ayushtiwari.tech/",
      "image": {
        "@type": "ImageObject",
        "url": "https://portfolio.ayushtiwari.tech/profile.jpeg",
        "width": 400,
        "height": 400
      },
      "sameAs": [
        "https://github.com/tiwariayush77",
        "https://linkedin.com/in/tiwariayush77",
        "https://x.com/tiwariayush77"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Product Space",
        "url": "https://productspace.com"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "UIT-RGPV",
        "alternateName": "University Institute of Technology, RGPV"
      },
      "knowsAbout": [
        "Product Management",
        "0-to-1 Product Development", 
        "Product Strategy",
        "User Research",
        "GTM Strategy",
        "Product-Market Fit",
        "A/B Testing",
        "Data Analytics",
        "Cross-functional Leadership",
        "Agile Methodology",
        "FinTech Products",
        "EdTech Solutions",
        "B2B SaaS",
        "Entrepreneurship"
      ],
      "description": "Product Management Fellow with 3+ years experience in FinTech, EdTech, and entrepreneurship. Founded BrightBunny.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "India"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://portfolio.ayushtiwari.tech/#website",
      "url": "https://portfolio.ayushtiwari.tech/",
      "name": "Ayush Tiwari Portfolio",
      "description": "Professional portfolio showcasing product management expertise",
      "publisher": {
        "@id": "https://portfolio.ayushtiwari.tech/#person"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://portfolio.ayushtiwari.tech/#webpage",
      "url": "https://portfolio.ayushtiwari.tech/",
      "name": "Ayush Tiwari - Product Manager Portfolio",
      "isPartOf": {
        "@id": "https://portfolio.ayushtiwari.tech/#website"
      },
      "about": {
        "@id": "https://portfolio.ayushtiwari.tech/#person"
      },
      "description": "Professional portfolio of Ayush Tiwari, Product Manager with expertise in 0-to-1 development",
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {/* Preload critical resources */}
        <link rel="preload" href="/profile.jpeg" as="image" />
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster 
            position="top-right"
            expand={false}
            richColors
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}