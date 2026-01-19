const notice = {
  name: "notice",
  title: "Notices",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["General", "Exam", "Holiday", "Administrative"] }
    },
    {
      name: "priority",
      title: "Priority",
      type: "string",
      options: { list: ["Normal", "Urgent"] },
      initialValue: "Normal"
    },
    { name: "pin", title: "Pin notice", type: "boolean", initialValue: false },
    { name: "pdf", title: "Upload PDF (optional)", type: "file", options: { accept: ".pdf" } },
    { name: "author", title: "Author", type: "string" },
    { name: "publishedAt", title: "Published At", type: "datetime", initialValue: () => new Date().toISOString() }
  ]
};

export default notice;
