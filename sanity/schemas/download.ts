const download = {
    name: "download",
    title: "Downloads",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
            description: "Name of the document (e.g., 'Admission Form 2026-27')"
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            description: "Brief description of what this document contains"
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    "Admission Forms",
                    "Syllabus",
                    "Time Tables",
                    "Fee Structure",
                    "Circulars",
                    "Results",
                    "Other"
                ]
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "file",
            title: "PDF File",
            type: "file",
            options: { accept: ".pdf" },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "fileSize",
            title: "File Size (optional)",
            type: "string",
            description: "e.g., '2.5 MB' - will be auto-calculated if left empty"
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "featured",
            title: "Featured",
            type: "boolean",
            initialValue: false,
            description: "Show this download prominently"
        }
    ],
    orderings: [
        {
            title: "Published Date, New",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }]
        },
        {
            title: "Category",
            name: "categoryAsc",
            by: [{ field: "category", direction: "asc" }]
        }
    ]
};

export default download;
