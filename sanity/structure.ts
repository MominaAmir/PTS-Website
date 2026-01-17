import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('PTS Design Content')
    .items([
      // Main sections
      S.listItem()
        .title('Projects')
        .icon(() => '🏢')
        .child(
          S.documentList()
            .title('Portfolio Projects')
            .filter('_type == "project"')
            .menuItems(S.documentTypeList('project').getMenuItems())
        ),
      
      S.listItem()
        .title('Services')
        .icon(() => '✨')
        .child(
          S.documentList()
            .title('Our Services')
            .filter('_type == "service"')
        ),
      
      S.divider(),
      
      // Content sections
      S.listItem()
        .title('Blog Articles')
        .icon(() => '📝')
        .child(
          S.documentList()
            .title('Blog Posts')
            .filter('_type == "blog"')
            .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
        ),
      
      S.listItem()
        .title('Team Members')
        .icon(() => '👥')
        .child(
          S.documentList()
            .title('Our Team')
            .filter('_type == "team"')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),
      
      S.listItem()
        .title('Testimonials')
        .icon(() => '⭐')
        .child(
          S.documentList()
            .title('Client Testimonials')
            .filter('_type == "testimonial"')
            .defaultOrdering([{ field: 'featured', direction: 'desc' }])
        ),
      
      S.divider(),
      
      // Settings
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['project', 'service', 'blog', 'team', 'testimonial'].includes(
            listItem.getId() || ''
          )
      ),
    ])