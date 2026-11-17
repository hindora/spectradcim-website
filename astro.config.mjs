import { defineConfig } from 'astro/config';

export default defineConfig({
  // Public address of the site. Set SITE_URL when building for deployment (see deploy/deploy.sh).
  site: process.env.SITE_URL || 'http://localhost:4321',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
