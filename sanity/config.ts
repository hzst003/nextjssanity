import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';

import { projectId, dataset } from './env';

export default defineConfig({
  name: 'blog',
  title: '博客 CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
