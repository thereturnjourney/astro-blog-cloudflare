import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import compress from "astro-compress";
import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles: true
  }), react(), compress()],
  image: {
    domains: ['https://thereturnjourney.imgix.net', 'https://trj-images-bucket.s3.us-east-1.amazonaws.com']
  },
  adapter: netlify({
    edgeMiddleware: true
  })
});