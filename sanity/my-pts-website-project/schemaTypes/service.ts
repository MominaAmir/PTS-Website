export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '✨',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'details',
      title: 'Service Details',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'string',
      options: {
        list: [
          '🏠', '🏢', '🛋️', '💡', '🎨', '📐', '🛠️', '👥', '📊', '🌟'
        ],
      },
    },
    {
      name: 'startingPrice',
      title: 'Starting Price (AED)',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Typical Duration',
      type: 'string',
    },
    {
      name: 'includes',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'process',
      title: 'Our Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', type: 'string', title: 'Step Number' },
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: false,
    },
  ],
};