export default {
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  icon: () => '⭐',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Full name of the client',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'clientTitle',
      title: 'Client Title/Company',
      type: 'string',
      description: 'e.g., CEO of ABC Group, Villa Owner in Palm Jumeirah',
    },
    {
      name: 'clientImage',
      title: 'Client Photo',
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
      name: 'project',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Link to the project this testimonial is about',
    },
    {
      name: 'location',
      title: 'Location in Dubai',
      type: 'string',
      description: 'e.g., Dubai Marina, Business Bay, Palm Jumeirah',
      options: {
        list: [
          'Palm Jumeirah',
          'Downtown Dubai',
          'Dubai Marina',
          'Business Bay',
          'Jumeirah',
          'Al Barsha',
          'Dubai Hills',
          'Emirates Hills',
          'Mirdif',
          'Arabian Ranches',
          'Dubai Silicon Oasis',
          'Dubai Sports City',
          'Dubai Healthcare City',
          'DIFC',
          'All Areas of Dubai',
        ],
      },
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 stars',
      validation: (Rule: any) => Rule.min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    },
    {
      name: 'testimonial',
      title: 'Testimonial Text',
      type: 'text',
      rows: 4,
      description: 'Client quote or review',
      validation: (Rule: any) => Rule.required().max(500),
    },
    {
      name: 'fullReview',
      title: 'Full Review',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed review if available',
    },
    {
      name: 'verification',
      title: 'Verification',
      type: 'object',
      fields: [
        {
          name: 'verified',
          title: 'Verified Review',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'verificationDate',
          title: 'Verification Date',
          type: 'date',
        },
        {
          name: 'platform',
          title: 'Source Platform',
          type: 'string',
          options: {
            list: [
              'Google Review',
              'Facebook',
              'LinkedIn',
              'Direct Client',
              'Phone Call',
              'Email',
              'WhatsApp',
              'Other',
            ],
          },
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show on homepage or testimonials page',
      initialValue: false,
    },
    {
      name: 'date',
      title: 'Date of Testimonial',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
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
      description: 'e.g., "responsive", "professional", "on-time", "quality"',
    },
    {
      name: 'permission',
      title: 'Permission to Display',
      type: 'boolean',
      description: 'Client has given permission to display this testimonial',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'clientTitle',
      rating: 'rating',
      media: 'clientImage',
      featured: 'featured',
    },
    prepare(selection: any) {
      const { title, subtitle, rating, media, featured } = selection;
      return {
        title: `${title} ${featured ? '🌟' : ''}`,
        subtitle: `${subtitle} • ${'⭐'.repeat(rating || 5)}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Most Recent',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
};