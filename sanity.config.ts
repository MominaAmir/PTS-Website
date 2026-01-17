import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/my-pts-website-project/schemaTypes'

export default defineConfig({
  name: 'pts-design',
  title: 'PTS Design Studio',
  projectId: 'y3t0y4ex',  // ← Hardcode your project ID here temporarily
  dataset: 'production',   // ← Hardcode dataset
    basePath: '/admin', 
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})