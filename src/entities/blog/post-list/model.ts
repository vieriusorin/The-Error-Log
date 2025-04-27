import type { EntryFieldTypes } from "contentful";

export type PostType = Readonly<{
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  summary: string;
}>;

export type BlogPostType = Readonly<{
  contentTypeId: "blogPost";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    body: EntryFieldTypes.RichText;
    excerpt: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
    publishedDate: EntryFieldTypes.Date;
  };
}>;
