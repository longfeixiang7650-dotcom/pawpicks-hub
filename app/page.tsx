"use client";

import { useState, useMemo } from "react";
import {
  Search, ArrowRight, Star, TrendingUp, BarChart3, BookOpen,
  CheckCircle2, HelpCircle, ChevronRight, Award, Users, Layers,
  Zap, Sparkles, Calendar, Quote, ThumbsUp, ArrowUpRight,
  MessageSquare, Clock, Eye, Filter
} from "lucide-react";
import Link from "next/link";

// ============================================================
// 模板B：杂志对比式首页
// 适用于：宠物用品评测站 pawpicks.net
// 布局：杂志风格大卡片 + VS对比 + 评测文章 + 购买指南
// ============================================================

const SITE_NAME = "Paw Picks";
const ACCENT_COLOR = "#BE185D";
const ACCENT_HOVER = "#9D174D";

import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";

interface HomePageProps {
  tools?: any[];
  posts?: any[];
}

export default function HomePage(props?: HomePageProps) {
  const tools = props?.tools || ALL_TOOLS;
  const posts = props?.posts || BLOG_POSTS;
  const [searchQuery, setSearchQuery] = useState("");

  // VS对比配对：每个热门分类选评分最高的两个做对比
  const vsComparisons = useMemo(() => {
    const cats = [...new Set(tools.map((t: any) => t.category))]
      .filter((_, i) => i < 3); // 取前3个分类
    return cats.map((cat: string) => {
      const toolsInCat = tools
        .filter((t: any) => t.category === cat)
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 2);
      return { category: cat, toolA: toolsInCat[0], toolB: toolsInCat[1] };
    });
  }, [tools]);

  // 分类浏览（带描述）
  const categoryCards = useMemo(() => {
    const descs: Record<string, string> = {
      "Dog Food": "Find the best nutrition for your furry friend",
      "Cat Food": "Healthy meals your cat will love",
      "Pet Toys": "Keep your pets entertained for hours",
      "Grooming": "Premium grooming supplies for every breed",
      "Health & Wellness": "Supplements and care products for pets",
      "Pet Beds": "Cozy sleeping solutions for your companions",
      "Accessories": "Collars, leashes, and travel gear",
    };
    const stats = new Map<string, { count: number; avgRating: number }>();
    for (const t of tools) {
      if (!stats.has(t.category)) stats.set(t.category, { count: 0, avgRating: 0 });
      const s = stats.get(t.category)!;
      s.count++;
      s.avgRating += t.rating;
    }
    return [...stats.entries()]
      .map(([name, data]) => ({
        name,
        count: data.count,
        avgRating: Math.round((data.avgRating / data.count) * 10) / 10,
        description: descs[name] || `Explore top ${name.toLowerCase()} products`,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [tools]);

  // 最新评测文章
  const latestReviews = useMemo(
    () => [...posts]
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4),
    [posts]
  );

  // 购买指南（模拟）
  const buyingGuides = useMemo(() => {
    const cats = categoryCards.slice(0, 3);
    return cats.map(c => ({
      title: `How to Choose ${c.name} for Your Pet in 2026`,
      excerpt: `A practical guide to selecting the best ${c.name.toLowerCase()} products for your pet's needs and budget.`,
      readTime: "8 min read",
      icon: c.name === "Dog Food" ? TrendingUp : c.name === "Cat Food" ? Zap : Layers,
    }));
  }, [categoryCards]);

  // 统计数据
  const stats = useMemo(() => ({
    totalTools: tools.length,
    totalCategories: new Set(tools.map((t: any) => t.category)).size,
    totalReviews: tools.reduce((sum: number, t: any) => sum + (t.reviewCount || 0), 0),
    avgRating: (tools.reduce((sum: number, t: any) => sum + t.rating, 0) / tools.length).toFixed(1),
  }), [tools]);

  // 搜索建议
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return tools
      .filter((t: any) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, tools]);

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* ======== HERO 区 ======== */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-[#0F1525] to-[#0A0E1A]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: `radial-gradient(circle, ${ACCENT_COLOR}, transparent)` }} />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[#1A1F35] border border-[#2A2F45] mb-6">
            <Sparkles className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
            <span className="text-gray-300">Expert reviews &amp; data-driven comparisons</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Find the Perfect{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, #F97316)` }}>
              Products for Your Pet
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            In-depth comparisons, unbiased reviews, and buying guides — we help you make
            confident pet product decisions backed by real data.
          </p>
          {/* 搜索 */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-[#1A1F35] border border-[#2A2F45] rounded-xl px-5 py-3.5">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder={`Search ${stats.totalTools}+ products across ${stats.totalCategories} categories...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-500 outline-none flex-1 text-base"
              />
            </div>
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-[#1A1F35] border border-[#2A2F45] rounded-xl z-50 overflow-hidden">
                {searchSuggestions.map((tool: any) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-[#252A45] transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#252A45] flex items-center justify-center">
                      <Layers className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{tool.name}</p>
                      <p className="text-gray-500 text-xs">{tool.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-300 text-sm">{tool.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======== 数据面板区 ======== */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BarChart3, label: "Products Reviewed", value: stats.totalTools },
              { icon: Layers, label: "Categories", value: stats.totalCategories },
              { icon: Users, label: "User Reviews", value: stats.totalReviews > 10000 ? `${(stats.totalReviews / 1000).toFixed(0)}K+` : stats.totalReviews },
              { icon: Award, label: "Avg Rating", value: `★ ${stats.avgRating}` },
            ].map((item, i) => (
              <div key={i} className="bg-[#111627] border border-[#1E233B] rounded-xl p-5 text-center">
                <item.icon className="w-5 h-5 mx-auto mb-2" style={{ color: ACCENT_COLOR }} />
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== VS对比区 ======== */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Head-to-Head Comparisons</h2>
              <p className="text-gray-500 text-sm mt-1">We pit the top pet products against each other so you don&apos;t have to</p>
            </div>
            <Link href="/comparisons" className="text-sm flex items-center gap-1 hover:underline"
              style={{ color: ACCENT_COLOR }}>
              View all comparisons <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {vsComparisons.map((pair, i) => (
              pair.toolA && pair.toolB ? (
                <div key={i} className="bg-[#111627] border border-[#1E233B] rounded-xl p-5 hover:border-[#2A2F55] transition-all">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{pair.category}</p>
                  {/* Tool A */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1A1F35] flex items-center justify-center text-lg">
                      {pair.toolA.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{pair.toolA.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-300 text-xs">{pair.toolA.rating}</span>
                      </div>
                    </div>
                    <Link href={`/tools/${pair.toolA.id}`}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
                      style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}>
                      Review
                    </Link>
                  </div>
                  {/* VS */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-px bg-[#2A2F45]" />
                    <span className="text-xs font-bold text-gray-500">VS</span>
                    <div className="flex-1 h-px bg-[#2A2F45]" />
                  </div>
                  {/* Tool B */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1A1F35] flex items-center justify-center text-lg">
                      {pair.toolB.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{pair.toolB.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-300 text-xs">{pair.toolB.rating}</span>
                      </div>
                    </div>
                    <Link href={`/tools/${pair.toolB.id}`}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
                      style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}>
                      Review
                    </Link>
                  </div>
                  <Link
                    href={`/comparison/${pair.toolA.id}-vs-${pair.toolB.id}`}
                    className="mt-4 w-full text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                    style={{ backgroundColor: `${ACCENT_COLOR}15`, color: ACCENT_COLOR }}>
                    Which is right for your pet? <HelpCircle className="w-3 h-3" />
                  </Link>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* ======== 分类浏览区 ======== */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Browse by Category</h2>
          <p className="text-gray-500 text-sm mb-8">Explore products organized for your pet&apos;s needs</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryCards.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="group bg-[#111627] border border-[#1E233B] rounded-xl p-5 hover:border-[#2A2F55] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT_COLOR}15` }}>
                    <Layers className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A1F35] text-gray-400">
                    {cat.count} products
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-400 text-xs">{cat.avgRating} avg rating</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 最新评测文章 ======== */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Latest Reviews &amp; Analysis</h2>
              <p className="text-gray-500 text-sm mt-1">In-depth, unbiased, and up-to-date</p>
            </div>
            <Link href="/blog" className="text-sm flex items-center gap-1 hover:underline"
              style={{ color: ACCENT_COLOR }}>
              View all articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 大卡片 - 第一篇 */}
            {latestReviews[0] && (
              <Link
                href={`/blog/${latestReviews[0].slug}`}
                className="md:col-span-1 bg-[#111627] border border-[#1E233B] rounded-xl p-6 hover:border-[#2A2F55] transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${ACCENT_COLOR}15`, color: ACCENT_COLOR }}>
                    {latestReviews[0].category || "Featured"}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {latestReviews[0].readTime || "5 min read"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:underline">
                  {latestReviews[0].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {latestReviews[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#1A1F35] flex items-center justify-center text-xs text-gray-300">
                      {latestReviews[0].author?.charAt(0) || "A"}
                    </div>
                    <span className="text-xs text-gray-500">{latestReviews[0].author || "Editor"} · {latestReviews[0].date}</span>
                  </div>
                  <span className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: ACCENT_COLOR }}>
                    Read more <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            )}
            {/* 小卡片 */}
            <div className="flex flex-col gap-4">
              {latestReviews.slice(1, 4).map((post: any, i: number) => (
                <Link
                  key={post.slug || i}
                  href={`/blog/${post.slug}`}
                  className="flex gap-4 bg-[#111627] border border-[#1E233B] rounded-xl p-4 hover:border-[#2A2F55] transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1F35] text-gray-400">
                        {post.category || "Article"}
                      </span>
                      <span className="text-[10px] text-gray-600">{post.readTime || "5 min"}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:underline line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 self-center flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== 购买指南区 ======== */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Pet Product Buying Guides</h2>
          <p className="text-gray-500 text-sm mb-8">Step-by-step guides to choosing the right products for your pet</p>
          <div className="grid md:grid-cols-3 gap-6">
            {buyingGuides.map((guide, i) => (
              <div key={i} className="bg-[#111627] border border-[#1E233B] rounded-xl p-6 hover:border-[#2A2F55] transition-all group cursor-pointer">
                <guide.icon className="w-8 h-8 mb-4" style={{ color: ACCENT_COLOR }} />
                <h3 className="text-white font-semibold mb-2 group-hover:underline">{guide.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{guide.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{guide.readTime}</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: ACCENT_COLOR }}>
                    Read guide <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 推荐工具（CTA底部） ======== */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#111627] to-[#1A1F35] border border-[#2A2F45] rounded-2xl p-10 md:p-14">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-4" style={{ color: ACCENT_COLOR }} />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to find the best for your pet?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Browse our curated collection of {stats.totalTools}+ products across {stats.totalCategories} categories.
              All reviews are data-driven and unbiased.
            </p>
            <Link
              href="/all-tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              Browse All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
