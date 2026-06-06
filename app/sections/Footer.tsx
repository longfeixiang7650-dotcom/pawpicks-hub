"use client";
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#4A2030] bg-[#140A0E]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#BE185D] to-[#EC4899] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[#FDF2F8]">Paw Picks</span>
            </Link>
            <p className="text-sm text-[#EC4899] leading-relaxed mb-6">
              The best curated pet products for dogs, cats, and all furry friends. Toys, treats, accessories, and more.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[{
              title: "Products",
              links: [
                { name: 'All Products', href: '/' },
                { name: 'Dogs', href: '/' },
                { name: 'Cats', href: '/' },
                { name: 'Accessories', href: '/' },
              ]
            }, {
              title: "Company",
              links: [
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blog' },
              ]
            }, {
              title: "Legal",
              links: [
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Affiliate Disclosure', href: '/disclosure' },
              ]
            }].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-[#FDF2F8] mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-[#EC4899] hover:text-[#BE185D] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[#4A2030] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#BE185D]">
            &copy; {new Date().getFullYear()} Paw Picks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
