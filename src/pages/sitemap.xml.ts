import { fetchAllBlogs } from "@/middleware/fetchBlogs";

export async function get({ request }) {
  const posts = await fetchAllBlogs();
  const baseUrl = 'https://blogs.thereturnjourney.com';

  const urls = posts.map(({ id, blogTitle}) => `
    <url>
      <loc>${baseUrl}/details/${id}/${blogTitle}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${baseUrl}/</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1.0</priority>
                </url>
                ${urls}
                </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
