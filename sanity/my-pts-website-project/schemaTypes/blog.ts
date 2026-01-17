export default {
  name: 'blog',
  title: 'Blog Articles',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'Catchy title for the blog post',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'team' }],
      description: 'Team member who wrote the article',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for blog listings',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' }, // Regular text blocks
        { type: 'image' }, // Images
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Design Trends', value: 'design-trends' },
          { title: 'Dubai Living', value: 'dubai-living' },
          { title: 'Project Insights', value: 'project-insights' },
          { title: 'Luxury Design', value: 'luxury-design' },
        ],
      },
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false,
    },
  ],
}