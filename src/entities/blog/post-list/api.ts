import { getBlogPosts } from "../../../lib/contentful";

const posts = await getBlogPosts();

export const getPosts = async () => {
  return posts.posts.sort(
    (a, b): number =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
};
