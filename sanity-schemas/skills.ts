import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills & Certifications',
  type: 'document',
  fields: [
    defineField({
      name: 'techCategories',
      title: 'Technology Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'techCategory',
          title: 'Category',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              description: 'e.g. "Programming Languages", "Cloud Platforms", "Tools"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'techItem',
                  title: 'Technology',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      description: 'Technology name (e.g. "Python", "Docker", "AWS")',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'iconSlug',
                      title: 'Icon Slug (Simple Icons)',
                      type: 'string',
                      description:
                        'Optional: override the auto-derived Simple Icons slug. Leave blank to auto-detect from name. Find slugs at simpleicons.org.',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      description: 'Optional link to the technology website',
                    },
                  ],
                  preview: {
                    select: { title: 'name' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certification',
          title: 'Certification',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
              description: 'e.g. "Amazon Web Services", "HashiCorp"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'dateEarned',
              title: 'Date Earned',
              type: 'date',
            },
            {
              name: 'expiryDate',
              title: 'Expiry Date',
              type: 'date',
              description: 'Leave blank if certification does not expire',
            },
            {
              name: 'link',
              title: 'Certificate URL',
              type: 'url',
              description: 'Link to verify or view the certificate online',
            },
            {
              name: 'image',
              title: 'Certificate Image',
              type: 'image',
              description: 'Upload a badge or certificate image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'issuerIconSlug',
              title: 'Issuer Icon Slug (Simple Icons)',
              type: 'string',
              description:
                'Optional: Simple Icons slug for the issuing organization (e.g. "amazonaws", "hashicorp"). Find slugs at simpleicons.org.',
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'issuer' },
          },
        },
      ],
    }),
  ],
})
