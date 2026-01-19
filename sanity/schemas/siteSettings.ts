const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "schoolName", title: "School Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "heroDescription", title: "Hero Description", type: "text" },
    { name: "contactEmail", title: "Contact Email", type: "string" },
    { name: "contactPhone", title: "Contact Phone", type: "string" },
    { name: "address", title: "Address", type: "string" }
  ]
};

export default siteSettings;
