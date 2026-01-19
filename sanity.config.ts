import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskStructure } from "./sanity/deskStructure";
import { schemaTypes } from "./sanity/schemas";

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  name: "school-website",
  title: "School Website Admin",
  schema: {
    types: schemaTypes
  },
  plugins: [
    structureTool({
      structure: deskStructure
    }),
    visionTool({ defaultApiVersion: apiVersion })
  ]
});
