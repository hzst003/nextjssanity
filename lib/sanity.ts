import { createClient, type SanityClient } from 'next-sanity';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

const realClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;

const noopClient = { fetch: async () => null } as unknown as SanityClient;

export const client = realClient ?? noopClient;

const builder = createImageUrlBuilder(
  realClient ?? { projectId: 'placeholder', dataset: 'production' }
);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
