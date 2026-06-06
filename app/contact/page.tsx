"use client";

import { useState } from "react";
import { Mail, Send, MessageSquare, User } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#BE185D] bg-[#4A2030] px-3 py-1.5 rounded-md mb-4">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#FDF2F8] tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-[#EC4899] max-w-xl mx-auto">
            Have a question, suggestion, or know a pet product we should add?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#2A1420] border border-[#4A2030] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#FDF2F8] mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-[#4A2030] border border-[#BE185D]/30 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#BE185D]/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-[#BE185D]" />
                  </div>
                  <p className="text-[#FDF2F8] font-semibold text-lg mb-1">Message Sent!</p>
                  <p className="text-[#EC4899] text-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#EC4899] mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BE185D]" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#140A0E] border border-[#4A2030] rounded-lg text-[#FDF2F8] placeholder:text-[#BE185D] focus:border-[#BE185D] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EC4899] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BE185D]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#140A0E] border border-[#4A2030] rounded-lg text-[#FDF2F8] placeholder:text-[#BE185D] focus:border-[#BE185D] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EC4899] mb-1.5">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#BE185D]" />
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#140A0E] border border-[#4A2030] rounded-lg text-[#FDF2F8] placeholder:text-[#BE185D] focus:border-[#BE185D] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#BE185D] hover:bg-[#EC4899] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#2A1420] border border-[#4A2030] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#FDF2F8] mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#BE185D]" />
                Email Us
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-[#EC4899]">
                  <strong className="text-[#FDF2F8]">General Inquiries:</strong>
                  <br />
                  <a
                    href="mailto:info@pawpicks.com"
                    className="text-[#BE185D] hover:underline break-all"
                  >
                    info@pawpicks.com
                  </a>
                </p>
                <p className="text-sm text-[#EC4899]">
                  <strong className="text-[#FDF2F8]">Product Suggestions:</strong>
                  <br />
                  <a
                    href="mailto:info@pawpicks.com"
                    className="text-[#BE185D] hover:underline break-all"
                  >
                    info@pawpicks.com
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-[#2A1420] border border-[#4A2030] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#FDF2F8] mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#BE185D]" />
                Response Time
              </h3>
              <p className="text-sm text-[#EC4899]">
                We typically respond within{" "}
                <strong className="text-[#FDF2F8]">24 hours</strong> during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
