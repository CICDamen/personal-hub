import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas from the parent directory
import homepage from '../sanity-schemas/homepage'
import post from '../sanity-schemas/post'
import project from '../sanity-schemas/project'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['homepage'])

export default defineConfig({
  name: 'default',
  title: 'Personal Hub',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton homepage document
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            // Divider
            S.divider(),
            // Regular document types
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [homepage, post, project],
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
