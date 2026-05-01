"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const BUSINESS_TYPES = [
  { value: "", label: "General (any business)" },
  { value: "Real estate", label: "Real estate" },
  { value: "Home services", label: "Home services" },
  { value: "Med spa", label: "Med spa" },
  { value: "Coaching", label: "Coaching" },
];

export default function AppPage() {
  const [lead, setLead] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadError, setLeadError] = useState("");
  const [copied, setCopied] = useState(false);
  const replyRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    setLeadError("");
    setError("");
    setReply("");

    if (!lead.trim()) {
      setLeadError("Please paste a lead message before generating a reply.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: lead.trim(), businessType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setReply(data.reply);
      setTimeout(() => {
        replyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!reply) return;
    await navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setLead("");
    setReply("");
    setError("");
    setLeadError("");
    setBusinessType("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lead<span className="gradient-text">Reply</span>
          </Link>
          <span className="text-sm text-gray-400 hidden sm:block">
            AI-powered lead reply generator
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Generate your reply
          </h1>
          <p className="text-gray-500 text-lg">
            Paste the lead message below and get a ready-to-send reply instantly.
          </p>
        </div>

        {/* Input card */}
        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6 card-shadow">
          {/* Business type */}
          <div className="mb-6">
            <label
              htmlFor="businessType"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Business type{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt.value} value={bt.value}>
                  {bt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Lead textarea */}
          <div className="mb-6">
            <label
              htmlFor="lead"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Lead message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="lead"
              value={lead}
              onChange={(e) => {
                setLead(e.target.value);
                if (leadError) setLeadError("");
              }}
              placeholder="Paste the message you received from a potential customer..."
              rows={6}
              className={`w-full border rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm leading-relaxed resize-y ${
                leadError
                  ? "border-red-300 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {leadError && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {leadError}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Generate Reply
                </>
              )}
            </button>

            {(lead || reply) && (
              <button
                onClick={handleClear}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-3 py-3"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-8 text-center card-shadow mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-blue-400"
                    style={{
                      animation: `bounce 1s ease-in-out ${i * 0.15}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-blue-600 font-medium text-sm">
              Crafting your reply…
            </p>
            <p className="text-blue-400 text-xs mt-1">
              This usually takes 5–10 seconds
            </p>
            <style>{`
              @keyframes bounce {
                from { transform: translateY(0); opacity: 0.6; }
                to { transform: translateY(-8px); opacity: 1; }
              }
            `}</style>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 card-shadow mb-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-700 text-sm mb-0.5">
                  Something went wrong
                </p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reply output */}
        {reply && !loading && (
          <div
            ref={replyRef}
            className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 card-shadow-lg animate-fade-up"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Your reply
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  copied
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                }`}
              >
                {copied ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy to clipboard
                  </>
                )}
              </button>
            </div>

            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-[15px]">
              {reply}
            </p>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-gray-400">
                ✏️ Feel free to edit before sending
              </p>
              <button
                onClick={handleGenerate}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Regenerate →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400 mt-12">
        LeadReply · Built with Claude AI ·{" "}
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Back to home
        </Link>
      </footer>
    </div>
  );
}
