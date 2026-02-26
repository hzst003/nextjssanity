import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: '作者',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL 别名',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'image',
      title: '头像',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: '简介',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
});
