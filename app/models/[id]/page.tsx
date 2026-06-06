"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Star, CheckCircle, XCircle,
  ExternalLink, HardDrive, Package, Download,
  Layers, Sparkles, User, Hash, BookOpen
} from "lucide-react";
import { RESOURCE_MAP, ALL_RESOURCES } from "@/data/resources";
import { softwareSchema, organizationSchema } from "@/lib/schema";

export default function ModelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const resource = RESOURCE_MAP.get(id);
  const schemaInjected = useRef(false);

  // Inject JSON-LD Schema
  useEffect(() => {
    if (!resource || schemaInjected.current) return;
    schemaInjected.current = true;

    const scripts: HTMLScriptElement[] = [];

    const software = softwareSchema(
      resource.name,
      resource.category,
      4.5,
      100,
      'Free',
      'USD'
    );
    const s1 = document.createElement('script');
    s1.type = 'application/ld+json';
    s1.text = JSON.stringify(software);
    document.head.appendChild(s1);
    scripts.push(s1);

    const org = organizationSchema(
      'AI Resource Hub',
      'https://ai-resource-hub.com',
      'Curated AI resources, models, and tools for the AI community.'
    );
    const s2 = document.createElement('script');
    s2.type = 'application/ld+json';
    s2.text = JSON.stringify(org);
    document.head.appendChild(s2);
    scripts.push(s2);

    return () => {
      scripts.forEach(s => document.head.removeChild(s));
    };
  }, [resource]);

  if (!resource) {
    return (
      <div className="relative pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#EDE9FE] mb-4">
          Model Not Found
        </h1>
        <p className="text-[#A99BD6] mb-8">
          The model you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>
      </div>
    );
  }

  // Related models (same style)
  const relatedModels = ALL_RESOURCES.filter(
    (r) => r.style === resource.style && r.id !== resource.id
  ).slice(0, 4);

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-[#8A7DBF] hover:text-[#7C3AED] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#1A1740] border border-[#2A2560] flex items-center justify-center">
              <Package className="w-7 h-7 text-[#7C3AED]" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                  resource.style === "真实系" ? "bg-blue-900/30 text-blue-400 border-blue-800/30" :
                  resource.style === "二次元" ? "bg-pink-900/30 text-pink-400 border-pink-800/30" :
                  "bg-amber-900/30 text-amber-400 border-amber-800/30"
                }`}>
                  {resource.style}
                </span>
                <span className="px-3 py-1 bg-[#1A1740] text-[#7C3AED] text-xs font-bold rounded-full border border-[#2A2560]">
                  {resource.category}
                </span>
                <span className="px-3 py-1 bg-[#1A1740] text-[#A99BD6] text-xs font-bold rounded-full border border-[#2A2560]">
                  v{resource.version}
                </span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#EDE9FE] mb-4 tracking-tight">
            {resource.name}
          </h1>
          <p className="text-lg md:text-xl text-[#A99BD6] leading-relaxed">
            {resource.longDescription}
          </p>
        </header>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-4">
            <HardDrive className="w-5 h-5 text-[#7C3AED] mb-2" />
            <p className="text-xs text-[#6D5FA0] uppercase tracking-wider mb-1">File Size</p>
            <p className="text-sm font-bold text-[#EDE9FE]">{resource.fileSize}</p>
          </div>
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-4">
            <BookOpen className="w-5 h-5 text-[#7C3AED] mb-2" />
            <p className="text-xs text-[#6D5FA0] uppercase tracking-wider mb-1">File Type</p>
            <p className="text-sm font-bold text-[#EDE9FE]">{resource.fileType}</p>
          </div>
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-4">
            <User className="w-5 h-5 text-[#7C3AED] mb-2" />
            <p className="text-xs text-[#6D5FA0] uppercase tracking-wider mb-1">Author</p>
            <p className="text-sm font-bold text-[#EDE9FE]">{resource.author}</p>
          </div>
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-4">
            <Hash className="w-5 h-5 text-[#7C3AED] mb-2" />
            <p className="text-xs text-[#6D5FA0] uppercase tracking-wider mb-1">Version</p>
            <p className="text-sm font-bold text-[#EDE9FE]">{resource.version}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#EDE9FE] mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-[#7C3AED]" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resource.features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#12102A] border border-[#2A2560] rounded-lg px-4 py-3 text-sm text-[#A99BD6] hover:text-[#EDE9FE] hover:border-[#3B1F8A] transition-all flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-6">
            <h3 className="font-bold text-green-400 mb-4 flex items-center text-base">
              <CheckCircle className="w-5 h-5 mr-2" /> Advantages
            </h3>
            <ul className="space-y-3">
              {resource.pros.map((pro, i) => (
                <li key={i} className="flex items-start text-sm text-[#A99BD6]">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#12102A] border border-[#2A2560] rounded-xl p-6">
            <h3 className="font-bold text-red-400 mb-4 flex items-center text-base">
              <XCircle className="w-5 h-5 mr-2" /> Limitations
            </h3>
            <ul className="space-y-3">
              {resource.cons.map((con, i) => (
                <li key={i} className="flex items-start text-sm text-[#A99BD6]">
                  <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compatibility */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#EDE9FE] mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#7C3AED]" />
            Compatibility
          </h2>
          <div className="flex flex-wrap gap-3">
            {resource.compatibility.map((comp, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-[#1A1740] border border-[#2A2560] rounded-full text-sm text-[#A99BD6]"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-r from-[#1A1740] to-[#12102A] border border-[#2A2560] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#EDE9FE] mb-2">
              Download {resource.name}
            </h2>
            <p className="text-[#A99BD6] text-sm">
              {resource.fileType} · {resource.fileSize} · Available via Quark Cloud Drive
            </p>
          </div>
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-full font-bold transition-all flex items-center shadow-glow-sm whitespace-nowrap"
          >
            <Download className="w-5 h-5 mr-2" /> Download Now
          </a>
        </div>

        {/* Related Models */}
        {relatedModels.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#EDE9FE] mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#7C3AED]" />
              More {resource.style} Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedModels.map((rm) => (
                <Link
                  key={rm.id}
                  href={`/models/${rm.id}`}
                  className="group bg-[#12102A] border border-[#2A2560] rounded-xl p-5 hover:border-[#3B1F8A] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1A1740] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Package className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#EDE9FE] group-hover:text-[#7C3AED] transition-colors">
                        {rm.name}
                      </h3>
                      <p className="text-xs text-[#6D5FA0] mt-0.5">{rm.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-[#6D5FA0]">{rm.fileSize}</span>
                        <span className="text-xs text-[#6D5FA0]">·</span>
                        <span className="text-xs text-[#6D5FA0]">{rm.fileType}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#6D5FA0]">
            This model is from the open-source community (CivitAI / HuggingFace). 
            Download link provided via Quark Cloud Drive for convenience.
            When you download through links on our site, we may earn an affiliate commission.{' '}
            <Link href="/disclosure" className="text-[#7C3AED] hover:underline">Learn more</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
