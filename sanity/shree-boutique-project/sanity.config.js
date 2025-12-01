import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

// Import all schema types from /schemas/index.js
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "shree-boutique-project",

  projectId: "45z7h7fe",        // <-- your new project ID
  dataset: "production",        // <-- your dataset

  basePath: "/",                // optional but recommended

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
