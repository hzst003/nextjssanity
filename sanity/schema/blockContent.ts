import { defineType, defineArrayMember } from 'sanity';

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: '正文', value: 'normal' },
        { title: '标题 1', value: 'h1' },
        { title: '标题 2', value: 'h2' },
        { title: '标题 3', value: 'h3' },
        { title: '引用', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: '粗体', value: 'strong' },
          { title: '斜体', value: 'em' },
        ],
        annotations: [
          {
            title: '链接',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
