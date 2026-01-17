export default {
  name: 'team',
  title: 'Team Members',
  type: 'document',
  icon: () => '👥',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Full name of the team member',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'e.g., Senior Interior Designer, Project Manager',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Profile Photo',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Professional background and experience',
    },
    {
      name: 'shortBio',
      title: 'Short Bio (for cards)',
      type: 'text',
      rows: 3,
      description: 'Brief description (max 150 characters)',
      validation: (Rule: any) => Rule.max(150),
    },
    {
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Residential Design',
          'Commercial Design',
          'Hospitality Design',
          'Space Planning',
          '3D Visualization',
          'Project Management',
          'Sustainable Design',
          'Lighting Design',
          'Custom Furniture',
          'Arabian Design',
          'Modern Luxury',
          'Classic Interiors',
          'Minimalist Design',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Total years in interior design',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'yearsAtPTS',
      title: 'Years at PTS Design',
      type: 'number',
      description: 'Years working with PTS Design in Dubai',
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', type: 'string', title: 'Degree' },
            { name: 'institution', type: 'string', title: 'Institution' },
            { name: 'year', type: 'string', title: 'Year' },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., LEED AP, NCIDQ, CID',
    },
    {
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'English',
          'Arabic',
          'Hindi',
          'Urdu',
          'Russian',
          'French',
          'Spanish',
          'Tagalog',
          'Chinese',
        ],
      },
      initialValue: ['English', 'Arabic'],
    },
    {
      name: 'role',
      title: 'Team Role',
      type: 'string',
      options: {
        list: [
          'Leadership',
          'Design Team',
          'Project Management',
          'Technical Team',
          'Consulting',
          'Support',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which team members appear (lower number = first)',
      initialValue: 0,
    },
    {
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show on homepage or leadership page',
      initialValue: false,
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: any) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: 'UAE phone number',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn Profile',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
          description: 'Instagram handle (without @)',
        },
      ],
    },
    {
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Projects this team member has worked on',
    },
    {
      name: 'quote',
      title: 'Personal Quote',
      type: 'text',
      rows: 2,
      description: 'Short inspirational quote from the team member',
    },
    {
      name: 'status',
      title: 'Employment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'On Leave', value: 'leave' },
          { title: 'Former', value: 'former' },
        ],
      },
      initialValue: 'active',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
      role: 'role',
      featured: 'featured',
    },
    prepare(selection: any) {
      const { title, subtitle, media, role, featured } = selection;
      return {
        title: `${title} ${featured ? '🌟' : ''}`,
        subtitle: `${subtitle} • ${role}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
    {
      title: 'Experience (High to Low)',
      name: 'experienceDesc',
      by: [{ field: 'experience', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
};