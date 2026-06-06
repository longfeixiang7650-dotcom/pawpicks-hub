import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, Tags } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Paw Picks",
  description:
    "In-depth pet product reviews, comparisons, and guides. Expert picks for dog toys, cat accessories, pet grooming, and more.",
};

export default function BlogListPage() {
  // Sort by date descending
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Collect unique categories
  const allCategories = [...new Set(sortedPosts.map((p) => p.category))];

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FDF2F8] tracking-tight mb-4">
            Pet Product Blog
          </h1>
          <p className="text-lg text-[#EC4899] max-w-2xl mx-auto">
            In-depth reviews, comparisons, and guides for the best pet products.
            Expert picks to help you make smarter choices for your furry friends.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#2A1420] border border-[#4A2030] rounded-xl p-6 card-hover flex flex-col group transition-all hover:border-[#BE185D]/50"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#BE185D]/20 text-[#BE185D]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#BE185D]">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#FDF2F8] mb-3 group-hover:text-[#BE185D] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#EC4899] mb-4 leading-relaxed flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#BE185D] bg-[#4A2030] px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#4A2030]">
                <span className="flex items-center gap-1 text-xs text-[#BE185D]">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#BE185D] font-medium">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
