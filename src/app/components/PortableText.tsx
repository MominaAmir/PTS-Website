'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

interface PortableTextProps {
  value: PortableTextBlock[] | any
}

// Optional: Add custom components for rich text
const components = {
  marks: {
    link: ({ value, children }: any) => {
      return (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
  }
}

export default function PortableText({ value }: PortableTextProps) {
  if (!value) return null
  
  return <PortableTextComponent value={value} components={components} />
}