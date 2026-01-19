const announcement = {
  name: "announcement",
  title: "Announcements (Carousel)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional short description or additional info"
    },
    {
      name: "icon",
      title: "Icon Emoji",
      type: "string",
      description: "Optional emoji icon (e.g., 🎓, 📢, 🏊)",
      placeholder: "🎓"
    },
    {
      name: "link",
      title: "Link (Optional)",
      type: "url",
      description: "Optional link when user clicks on the announcement"
    },
    {
      name: "priority",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      initialValue: 1
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Only active announcements will show in the carousel",
      initialValue: true
    }
  ],
  orderings: [
    {
      title: "Priority (Low to High)",
      name: "priorityAsc",
      by: [{ field: "priority", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      icon: "icon",
      active: "active"
    },
    prepare({ title, subtitle, icon, active }: any) {
      return {
        title: `${icon ? `${icon} ` : ""}${title}`,
        subtitle: active ? "Active" : "Inactive",
        media: () => null
      };
    }
  }
};

export default announcement;
