export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  "author": author->{ name, "image": image.asset->url },
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->title
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  "author": author->{ name, "image": image.asset->url },
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->title
}`;

export const postSlugsQuery = `*[_type == "post"]{ "slug": slug.current }`;
