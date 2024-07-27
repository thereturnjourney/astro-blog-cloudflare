import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import compress from "astro-compress";



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), compress()],
  image: {
    domains:['https://thereturnjourney.imgix.net', 'https://trj-images-bucket.s3.us-east-1.amazonaws.com']
  }
});