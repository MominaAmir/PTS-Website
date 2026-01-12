import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Powerpoint Technical Services | Premium Dubai Interior Design & Fit-Out',
  description: '13+ years experience in luxury interior design and fit-out services in Dubai. Commercial & residential projects. Free consultation available.',
  keywords: 'Dubai interior design, fit-out services, commercial interior, villa design, office design',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://immersioninterior.ae',
    siteName: 'PowerPoint Technical Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}