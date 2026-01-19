import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("School Admin Panel")
    .items([
      S.listItem()
        .title("Events")
        .icon(() => "📅")
        .child(S.documentTypeList("event").title("Events")),
      S.listItem()
        .title("Notices")
        .icon(() => "📣")
        .child(S.documentTypeList("notice").title("Notices")),
      S.listItem()
        .title("Announcements (Carousel)")
        .icon(() => "📢")
        .child(S.documentTypeList("announcement").title("Announcements").defaultOrdering([{ field: "priority", direction: "asc" }])),
      S.listItem()
        .title("About")
        .icon(() => "ℹ️")
        .child(S.editor().schemaType("about").documentId("aboutPage")),
      S.listItem()
        .title("Gallery")
        .icon(() => "🖼️")
        .child(S.documentTypeList("gallery").title("Gallery")),
      S.listItem()
        .title("Faculty")
        .icon(() => "👨‍🏫")
        .child(S.documentTypeList("faculty").title("Faculty").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem()
        .title("Contact Submissions")
        .icon(() => "✉️")
        .child(
          S.documentTypeList("contactSubmission")
            .title("Contact Submissions")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Site Settings")
        .icon(() => "🔧")
        .child(S.editor().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Urgent Notices")
        .icon(() => "⚠️")
        .child(
          S.documentList()
            .title("Urgent Notices")
            .filter('_type == "notice" && priority == "Urgent"')
        )
    ]);
