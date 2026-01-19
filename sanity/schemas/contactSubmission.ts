const contactSubmission = {
  name: "contactSubmission",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: "phone",
      title: "Phone",
      type: "string"
    },
    {
      name: "message",
      title: "Message",
      type: "text"
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["new", "read", "replied"]
      },
      initialValue: "new"
    }
  ]
};

export default contactSubmission;
