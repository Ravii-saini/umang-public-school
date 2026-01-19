const faculty = {
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "designation",
      title: "Designation",
      type: "string",
      description: "e.g., Principal, Teacher, Head of Department",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "mobileNumber",
      title: "Mobile Number",
      type: "string",
      description: "Contact number (optional)"
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Email address (optional)"
    },
    {
      name: "subject",
      title: "Subject/Department",
      type: "string",
      description: "Subject taught or department (optional)"
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      initialValue: 0
    },
    {
      name: "featured",
      title: "Featured on Home Page",
      type: "boolean",
      description: "Show this faculty on the home page",
      initialValue: false
    }
  ],
  orderings: [
    {
      title: "Order (Low to High)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "photo"
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle,
        media
      };
    }
  }
};

export default faculty;
