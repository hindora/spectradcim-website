import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://spectradcim.example',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
