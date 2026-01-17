import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'MY PTS website Project',

  projectId: 'y3t0y4ex',
  dataset: 'production',
  basePath: '/admin', 
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
