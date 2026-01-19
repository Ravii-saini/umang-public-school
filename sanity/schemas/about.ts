const about = {
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    { name: "heading", title: "Heading", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }], validation: (Rule: any) => Rule.required() },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }
  ]
};

export default about;
