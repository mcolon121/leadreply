import Link from "next/link";

const DEMO_LEAD = `Hi, I found your listing on Zillow for the property on Maple Street. I'm interested but have a few questions about the neighborhood and school district. Is it still available? Can we schedule a showing this week?`;

const DEMO_REPLY = `Hi! Thanks so much for reaching out — yes, the Maple Street property is still available and I'd love to show it to you.

The neighborhood is quiet and family-friendly, and it falls within the Riverside School District, which is well-regarded locally. Happy to share more details on that.

Would Thursday or Friday afternoon work for a showing? Just let me know what time suits you best and I'll get it on the calendar.`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lead<span className="gradient-text">Reply</span>
          </span>
          <Link
            href="/app"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Try the tool →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="animate-fade-up">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Free tool · No signup needed
          </span>
        </div>

        <h1
          className="animate-fade-up animate-fade-up-1 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-gray-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Reply to new leads{" "}
          <span className="gradient-text">instantly</span>
        </h1>

        <p className="animate-fade-up animate-fade-up-2 text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
          Paste a message from a potential customer and get a friendly,
          professional reply — ready to send in seconds. No more staring at a
          blank reply box.
        </p>

        <div className="animate-fade-up animate-fade-up-3">
          <Link
            href="/app"
            className="btn-pulse inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-150 shadow-md hover:shadow-lg"
          >
            Generate a reply
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Powered by Claude AI · Works for any industry
          </p>
        </div>
      </section>

      {/* Demo */}
      <section className="max-w-5xl mx-auto px-6 pb-24 animate-fade-up animate-fade-up-4">
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See it in action
          </h2>
          <p className="text-gray-500">
            From inbound inquiry to polished reply — in one click.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Lead message
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              {DEMO_LEAD}
            </p>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6 card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Generated reply
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed text-[15px] whitespace-pre-line">
              {DEMO_REPLY}
            </p>
          </div>
        </div>

        {/* Arrow label between cards (desktop) */}
        <div className="hidden md:flex justify-center mt-4 -translate-y-1">
          <span className="text-xs text-gray-400 italic">
            ← Lead in · Reply out →
          </span>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-gray-100 bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-10">
          {[
            {
              icon: "⚡",
              title: "Instant replies",
              body: "Stop letting leads sit cold. Get a tailored response in under 10 seconds.",
            },
            {
              icon: "🎯",
              title: "Industry-aware",
              body: "Choose your business type so the tone and language fits your audience perfectly.",
            },
            {
              icon: "✏️",
              title: "Always editable",
              body: "The reply is a starting point. Tweak it before you send — no lock-in.",
            },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3
                className="font-bold text-gray-900 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2
          className="text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to reply faster?
        </h2>
        <p className="text-gray-500 mb-8">
          No account required. Just paste your lead and go.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-150 shadow-md hover:shadow-lg"
        >
          Try it free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        LeadReply · Built with Claude AI
      </footer>
    </div>
  );
}
