# LeadReply

**Reply to new leads instantly.**

LeadReply is a lightweight Next.js tool that takes an inbound lead message and generates a friendly, professional reply using Claude AI — ready to send in seconds.

---

## Features

- 🚀 Instant AI-powered replies via Claude (Sonnet)
- 🎯 Business-type aware tone (real estate, home services, med spa, coaching, UX consulting)
- 📋 One-click copy to clipboard
- ✏️ Always editable before sending
- 📱 Fully mobile responsive

---

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd leadreply
npm install
```

### 2. Create your environment file

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and add your Anthropic API key:

```env
CLAUDE_API_KEY=sk-ant-...
```

You can get an API key from [console.anthropic.com](https://console.anthropic.com).

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
leadreply/
├── app/
│   ├── layout.tsx          # Root layout + global metadata
│   ├── globals.css         # Tailwind base + custom styles
│   ├── page.tsx            # Landing page (/)
│   ├── app/
│   │   └── page.tsx        # Tool page (/app)
│   └── api/
│       └── generate/
│           └── route.ts    # POST /api/generate — calls Claude API
├── .env.local.example      # Template for environment variables
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API reference

### `POST /api/generate`

**Request body:**

```json
{
  "lead": "Hi, I saw your listing on Zillow...",
  "businessType": "Real estate"
}
```

| Field          | Type   | Required | Description                                      |
|----------------|--------|----------|--------------------------------------------------|
| `lead`         | string | Yes      | The inbound lead message                         |
| `businessType` | string | No       | One of: Real estate, Home services, Med spa, Coaching, UX consulting |

**Response:**

```json
{
  "reply": "Hi! Thanks for reaching out..."
}
```

**Error response:**

```json
{
  "error": "A lead message is required."
}
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add `CLAUDE_API_KEY` as an environment variable in your Vercel project settings.

### Other platforms

Build the production bundle:

```bash
npm run build
npm start
```

Set the `CLAUDE_API_KEY` environment variable on your host.

---

## Tech stack

- [Next.js 14](https://nextjs.org/) — App Router, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) — Claude API
- [Google Fonts](https://fonts.google.com/) — Sora + DM Sans

---

## License

MIT
