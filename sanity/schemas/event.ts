const event = {
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Description", type: "array", of: [{ type: "block" }] },
    { name: "date", title: "Date", type: "datetime", validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string" },
    { name: "location", title: "Location", type: "string" }
  ]
};

export default event;
