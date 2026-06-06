import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Target, RefreshCw, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Paw Picks",
  description:
    "Paw Picks is an independent directory of curated pet products. We find the best toys, treats, and accessories for dogs, cats, and all furry friends.",
};

const VALUES = [
  {
    icon: Sparkles,
    title: "Curated Excellence",
    desc: "Every product on our platform is hand-picked based on quality, reviews, and real-world use — not sponsorship or paid placement.",
  },
  {
    icon: Target,
    title: "Practical Discovery",
    desc: "We organize pet products by category, pet type, and popularity so you can quickly find the right toys, treats, or accessories for your furry friend.",
  },
  {
    icon: RefreshCw,
    title: "Fresh & Up-to-Date",
    desc: "The pet product landscape evolves constantly. We continuously monitor new releases, trends, and community favorites to keep our catalog current.",
  },
  {
    icon: Globe,
    title: "Community-Driven",
    desc: "Our recommendations are informed by community reviews, pet owner feedback, and real-world testing — not by advertising dollars.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#BE185D] bg-[#4A2030] px-3 py-1.5 rounded-md mb-4">
            About
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#FDF2F8] tracking-tight mb-6">
            Your Guide to{" "}
            <span className="text-gradient">Pet Products</span>
          </h1>
          <p className="text-lg text-[#EC4899] leading-relaxed max-w-2xl mx-auto">
            Paw Picks is an independent directory that helps pet owners
            discover, evaluate, and find the best toys, treats, accessories,
            and supplies for their beloved pets.
          </p>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#FDF2F8] mb-6">What We Do</h2>
          <div className="space-y-4 text-[#EC4899] leading-relaxed">
            <p>
              Paw Picks was created to solve a growing problem: the pet product
              ecosystem is expanding faster than anyone can track. New products
              are released daily, brands spring up overnight, and finding quality
              items has become a challenge of its own.
            </p>
            <p>
              We catalog and organize pet products across dozens of categories —
              including dog toys, cat beds, grooming tools, pet tech, training
              aids, health & wellness, and seasonal essentials. Each product page
              includes a clear description, relevant links, category tags, and
              community context to help you decide what is worth your time and
              money.
            </p>
            <p>
              Our data is compiled from public sources including product reviews,
              official brand websites, retailer listings, and community discussions.
              We do not claim to have tested every product personally — instead, we
              synthesize the best available public information to help you make
              informed choices.
            </p>
          </div>
        </div>

        {/* How We Work */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#FDF2F8] mb-8 text-center">
            How We Curate Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#2A1420] border border-[#4A2030] rounded-xl p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#4A2030] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#BE185D]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDF2F8] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#EC4899] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Update Frequency */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#FDF2F8] mb-6">Update Frequency</h2>
          <div className="space-y-4 text-[#EC4899] leading-relaxed">
            <p>
              We strive to keep Paw Picks as current as the world of pet products
              demands. Our team monitors new releases and reviews on a daily basis.
              Blog articles and new product listings are published multiple times per
              week. Existing product pages are reviewed and refreshed at least
              monthly to ensure links remain active and descriptions stay accurate.
            </p>
            <p>
              If you notice a broken link or outdated information, please let us
              know through our contact page. Community contributions help keep
              this resource reliable for everyone.
            </p>
          </div>
        </div>

        {/* Operation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#FDF2F8] mb-6">How We Operate</h2>
          <div className="space-y-4 text-[#EC4899] leading-relaxed">
            <p>
              Paw Picks is operated independently. We are not owned by or
              affiliated with any pet product manufacturer, retailer, or venture
              capital firm. Our mission is simple: help pet owners find the right
              products without the noise.
            </p>
            <p>
              The site is supported through affiliate partnerships and
              advertising via Google AdSense. These revenue streams allow us to
              keep the platform free for all users. Sponsored content, if any,
              is always clearly labeled. Our curation decisions remain independent
              of commercial relationships.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#2A1420] border border-[#4A2030] rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[#FDF2F8] mb-4">
            Have feedback or a suggestion?
          </h2>
          <p className="text-[#EC4899] mb-6 max-w-lg mx-auto">
            We are always improving. If you know of a great pet product we
            should add, or notice something that needs updating, let us know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#BE185D] hover:bg-[#EC4899] text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:info@pawpicks.com"
              className="px-6 py-3 border border-[#4A2030] hover:border-[#6A2A40] text-[#EC4899] hover:text-[#FDF2F8] font-medium rounded-lg transition-all"
            >
              info@pawpicks.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
