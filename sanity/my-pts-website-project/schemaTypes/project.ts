export default {
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  icon: () => '🏢',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'e.g., Luxury Penthouse at Burj Khalifa',
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
      name: 'location',
      title: 'Dubai Location',
      type: 'string',
      description: 'e.g., Palm Jumeirah, Downtown Dubai, Business Bay',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Client or company name',
    },
    {
      name: 'budget',
      title: 'Project Budget (AED)',
      type: 'string',
      description: 'e.g., AED 2.5M, AED 500K - 1M',
    },
    {
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g., 4 months, 6-8 weeks',
    },
    {
      name: 'category',
      title: 'Project Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Retail', value: 'retail' },
          { title: 'Office', value: 'office' },
          { title: 'Villa', value: 'villa' },
          { title: 'Apartment', value: 'apartment' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Interior Design', value: 'interior-design' },
          { title: 'Space Planning', value: 'space-planning' },
          { title: 'Custom Furniture', value: 'custom-furniture' },
          { title: 'Lighting Design', value: 'lighting-design' },
          { title: 'Project Management', value: 'project-management' },
          { title: '3D Visualization', value: '3d-visualization' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'fullDescription',
      title: 'Full Case Study',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'beforeAfter',
      title: 'Before & After Images',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before Image',
          type: 'image',
        },
        {
          name: 'after',
          title: 'After Image',
          type: 'image',
        },
        {
          name: 'description',
          title: 'Transformation Description',
          type: 'text',
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text',
      rows: 3,
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    },
    {
      name: 'squareFeet',
      title: 'Area (Sq. Ft.)',
      type: 'number',
    },
    {
      name: 'designStyle',
      title: 'Design Style',
      type: 'string',
      options: {
        list: [
          'Modern Luxury',
          'Contemporary',
          'Classic',
          'Arabian',
          'Minimalist',
          'Industrial',
          'Scandinavian',
          'Transitional',
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, location, media, category } = selection;
      return {
        title,
        subtitle: `${location} • ${category?.[0] || 'Project'}`,
        media,
      };
    },
  },
};