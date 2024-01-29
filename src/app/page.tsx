import Link from "next/link";
import { getAllPublishedBlog } from "./lib/notion";
import { Post } from "./types/Notion";

export default async function Home() {
  const posts = await fetchBlogData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[672px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">List Blog</h1>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post: Post, index: number) => (
            <article
              key={index}
              className="bg-white rounded-lg cursor-pointer p-4 mb-4 border-b border-gray-300"
            >
              <div>
                <span className="text-gray-500 mb-2 text-sm">
                  {post.publishedDate.toString()}
                </span>
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p>{post.description}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}

async function fetchBlogData() {
  const res = getAllPublishedBlog();
  return res;
}