import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  basePath: '/studio',  // This should match your route
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: {
    types: [],
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2023-08-01' }),
  ],
})
