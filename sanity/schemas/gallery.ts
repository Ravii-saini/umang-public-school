const gallery = {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string" }
  ]
};

export default gallery;
