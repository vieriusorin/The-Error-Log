import * as contentful from "contentful";
import type { BlogPostType, PostType } from "../entities/blog/post-list/model";
import {
  getContentfulConfig,
  type ContentfulConfig,
} from "./contentful.config";
import { DateFormatter } from "./date.util";

export const contentfulClient = contentful.createClient(getContentfulConfig());

type GetBlogPostsParams = Readonly<{
  /**
   * @default 1
   * The page number to fetch
   */
  page?: number;
  /**
   * @default 1
   * Number of posts per page
   */
  limit?: number;
  /**
   * Search keyword
   */
  searchQuery?: string;
}>;

export async function getBlogPosts({
  page = 1,
  limit = 1,
  searchQuery = "",
}: GetBlogPostsParams = {}): Promise<{ posts: PostType[]; total: number }> {
  const skip = (page - 1) * limit; // Calculate offset
  console.log(
    `[contentful.ts] Received - page: ${page}, limit: ${limit}, skip: ${skip}, query: '${searchQuery}'`
  ); // Log received params

  const query: contentful.EntryCollection<BlogPostType> =
    await contentfulClient.getEntries<BlogPostType>({
      content_type: "blogPost",
      limit,
      skip,
      order: ["-fields.publishedDate"],
      ...(searchQuery && { "fields.title[match]": searchQuery }),
    });

  console.log(
    `[contentful.ts] Contentful returned - total: ${query.total}, items: ${query.items.length}`
  ); // Log Contentful response info

  const posts = query.items.map((item) => {
    const summary =
      item.fields.excerpt?.content &&
      Array.isArray(item.fields.excerpt.content) &&
      item.fields.excerpt.content[0]?.content &&
      Array.isArray(item.fields.excerpt.content[0].content) &&
      item.fields.excerpt.content[0].content[0]?.nodeType === "text"
        ? item.fields.excerpt.content[0].content[0].value
        : "";

    return {
      id: item.sys.id,
      title: typeof item.fields.title === "string" ? item.fields.title : "",
      slug: typeof item.fields.slug === "string" ? item.fields.slug : "",
      publishedDate: DateFormatter.formatPublishedDate(
        new Date(item.fields.publishedDate as string)
      ),
      summary,
    };
  });

  return {
    posts,
    total: query.total,
  };
}
