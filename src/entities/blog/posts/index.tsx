"use client";

import React, { useEffect, useState } from "react";
import type { PostType } from "../post-list/model";

const PER_PAGE = 1;

const fetchPosts = async (page: number, searchQuery: string) => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  const url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=blogPost&limit=${PER_PAGE}&skip=${(page - 1) * PER_PAGE}&searchQuery=${searchQuery}`;

  try {
    const response = await fetch("");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const ListBlogArticles = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  const getQueryParams = () => {
    if (typeof window === "undefined")
      return { currentPage: 1, searchQuery: "" };

    const queries = new URLSearchParams(window.location.search);
    return {
      currentPage: queries.get("page") ? parseInt(queries.get("page")!) : 1,
      searchQuery: queries.get("search") || "",
    };
  };

  const { currentPage, searchQuery } = getQueryParams();

  useEffect(() => {
    setLoading(true);
    fetchPosts(currentPage, searchQuery).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [currentPage, searchQuery]);

  if (loading) return <p>Loading...</p>;

  console.log(posts);

  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2">Blog</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.sys.id}>
                <a href={`/blog/${post.fields.slug}`}>
                  <h2>{post.fields.title}</h2>
                  <p>{post.fields.summary}</p>
                  <small>
                    {new Date(post.fields.publishedDate).toDateString()}
                  </small>
                </a>
              </li>
            ))
          ) : (
            <p>No blog posts found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};
