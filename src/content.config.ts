import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const timeline = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/timeline" }),
  schema: z.object({
    order: z.coerce.number().int().nonnegative(),
    date: z.string(),
    title: z.string(),
    images: z.array(z.string().url()).min(1),
    alt: z.string().default(""),
    side: z.enum(["left", "right"]),
    tilt: z.enum(["tilt-left", "tilt-left-soft", "tilt-right", "tilt-right-soft"]),
  }),
});

export const collections = { timeline };
