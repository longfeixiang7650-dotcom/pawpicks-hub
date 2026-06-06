import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Paw Picks",
  description:
    "Paw Picks' affiliate disclosure policy. Learn how we may earn commissions through partner links on our site.",
};

export default function DisclosurePage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#BE185D] bg-[#4A2030] px-3 py-1.5 rounded-md mb-4">Legal</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#FDF2F8] tracking-tight mb-3">Affiliate Disclosure</h1>
          <p className="text-[#EC4899] text-sm">Last updated: May 21, 2026</p>
        </div>
        <div className="space-y-6 text-[#EC4899] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#FDF2F8] mb-3">Transparency First</h2>
            <p>Paw Picks is committed to transparency. This Affiliate Disclosure explains how we may earn compensation through links on our website.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#FDF2F8] mb-3">Affiliate Links</h2>
            <p>Some of the links on this website are affiliate links. If you click on a link and purchase a product or sign up for a service, we may receive a commission at no additional cost to you.</p>
            <p className="mt-3">These commissions help us maintain and improve our platform, including the curation and organization of pet product recommendations.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#FDF2F8] mb-3">No Impact on Listings</h2>
            <p>Our product listings and recommendations are never influenced by affiliate relationships. We curate products based on quality, reviews, and relevance — not sponsorship dollars.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#FDF2F8] mb-3">Questions</h2>
            <p>If you have any questions, please contact us at info@pawpicks.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
