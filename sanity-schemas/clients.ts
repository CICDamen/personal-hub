import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clients',
  title: 'Client Logos',
  type: 'document',
  fields: [
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'client',
          title: 'Client',
          fields: [
            {
              name: 'name',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the logo for accessibility (defaults to client name)',
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Website URL',
              type: 'url',
              description: 'Optional link to the client website',
            },
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
  ],
})
