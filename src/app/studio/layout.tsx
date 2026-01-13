import { metadata as studioMetadata } from 'next-sanity/studio'
import type { Metadata } from 'next'

// Set the right viewport for Sanity Studio
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// Import the studio metadata and extend it
export const metadata: Metadata = {
  ...studioMetadata,
  title: 'PTS Interior Design - CMS',
  description: 'Content management system for PTS Interior Design',
}

// ADD THIS: Export a default React component
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
