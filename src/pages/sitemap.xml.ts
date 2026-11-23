// The list of pages for search engines, built from the files in src/pages.
import type { APIRoute } from 'astro';

const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .map((f) => f.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, ''))
  .filter((p) => p !== '/404')
  .map((p) => (p === '' ? '/' : p))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
