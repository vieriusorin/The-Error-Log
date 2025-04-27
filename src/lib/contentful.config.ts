import "dotenv/config";

export type ContentfulConfig = Readonly<{
  space: string;
  accessToken: string;
  host: string;
}>;

export const getContentfulConfig = (): ContentfulConfig => ({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
