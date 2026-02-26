import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: '分类',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL 别名',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
    }),
  ],
});
