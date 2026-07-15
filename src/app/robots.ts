import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'PerplexityBot',
          'Anthropic-ai',
          'Claude-Web',
          'ClaudeBot'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://rajeevdev.vercel.app/sitemap.xml',
  };
}
