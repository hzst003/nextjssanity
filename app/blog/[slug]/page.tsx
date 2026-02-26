import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
  return slugs?.map(({ slug }) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<{ title: string; excerpt: string | null }>(
    `*[_type == "post" && slug.current == $slug][0]{ title, excerpt }`,
    { slug }
  );
  if (!post) return { title: '文章' };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(postBySlugQuery, { slug });
}

type PortableTextBlock = { _type: string; [key: string]: unknown };

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[] | null;
  author: { name: string; image: string | null };
  mainImage: { asset: { _ref: string } } | null;
  publishedAt: string;
  excerpt: string | null;
  categories: string[];
};

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-[var(--color-text-primary)]">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-[var(--color-text-primary)]">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-[var(--color-text-primary)]">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="my-2 text-[var(--color-text-primary)] leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 my-4 text-[var(--color-text-secondary)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[var(--color-text-primary)]">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[var(--color-text-primary)]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-accent)] underline hover:no-underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { _ref: string } } }) =>
      value?.asset ? (
        <img
          src={urlFor(value).width(800).url()}
          alt=""
          className="rounded-lg my-4 w-full"
        />
      ) : null,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug) as Post | null;

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="border-b bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/blog" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] text-sm">
            ← 返回博客
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories?.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded-full bg-[var(--color-muted)] text-[var(--color-text-secondary)]"
            >
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-[var(--color-text-muted)]">
          {post.author?.name && <span>{post.author.name}</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
            </time>
          )}
        </div>

        {post.mainImage && (
          <div className="mt-6 rounded-lg overflow-hidden">
            <img
              src={urlFor(post.mainImage).width(900).url()}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {Array.isArray(post.body) && post.body.length > 0 && (
          <div className="mt-8 prose prose-slate max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </article>
    </div>
  );
}
