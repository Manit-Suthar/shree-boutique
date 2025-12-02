// /sanity/sanity.config.js

import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";

import { structure } from "./structure.js";
import { schemaTypes } from "./schemas/index.js";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  title: "Shree Boutique CMS",
  basePath: "/studio",

  schema: {
    types: schemaTypes,
  },

  plugins: [
    visionTool(),
    structureTool({ structure }),
  ],
});
