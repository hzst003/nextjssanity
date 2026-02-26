import Link from 'next/link';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { postsQuery } from '@/lib/sanity.queries';

export const metadata = {
  title: ' ',
  description: '文章列表',
};

async function getPosts() {
  return client.fetch<Post[]>(postsQuery);
}

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  author: { name: string; image: string | null };
  mainImage: { asset: { _ref: string } } | null;
  publishedAt: string;
  excerpt: string | null;
  categories: string[];
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="border-b bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] text-sm">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold mt-2 text-[var(--color-text-primary)]">博客</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">文章列表</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!posts?.length ? (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-secondary)]">
            <p>暂无文章。请在 Sanity Studio 中创建「作者」和「文章」。</p>
            <p className="mt-2 text-sm">配置好后访问 /studio 管理内容。</p>
          </div>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.mainImage && (
                    <div className="aspect-video bg-[var(--color-muted)]">
                      <img
                        src={urlFor(post.mainImage).width(800).height(450).url()}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories?.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--color-muted)] text-[var(--color-text-secondary)]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mt-2 text-[var(--color-text-secondary)] line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                      {post.author?.name && <span>{post.author.name}</span>}
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                        </time>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
