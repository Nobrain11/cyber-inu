# Cyber Inu ($CYBERINU)

Community memecoin site for the cyberpunk Shiba who refused to log off.

## Stack

- React 18 + Vite
- Plain CSS (no Tailwind)
- Hash routing (`#/`, `#/raid`, `#/pack`, `#/leaderboard`, `#/raid-list`, `#/ask`)
- Vercel serverless functions in `/api` (ES modules)

## Brand

- Contract: `7u4JmWrWG41kYkKpyqbuYJR4uZhE7oLCUMCGfNkNCFWq`
- X: https://x.com/OfficialCyInu
- Logo: `/public/logo.svg` (also used as favicon)

## Local development

```bash
cp .env.example .env
# fill HELIUS_API_KEY, X_BEARER_TOKEN, XAI_API_KEY if you have them
npm install
npm run dev
```

API routes fall back to sample data when keys are missing.

## Deploy to Vercel

1. Push this repo to GitHub (already done if using this repo).
2. Import the project in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.

## Pages

| Route            | Description                          |
|------------------|--------------------------------------|
| `#/`             | Feed                                 |
| `#/raid`         | Raid generator                       |
| `#/pack`         | The pack                             |
| `#/leaderboard`  | Top holders                          |
| `#/raid-list`    | All mentions                         |
| `#/ask`          | Ask Inu chat                         |

## Notes

- All editable content lives in `src/config.js` and `src/data.js`.
- Market data comes from the public DexScreener API.
- Holders from Helius DAS; mentions from X API v2; chat/raid from xAI Grok.
- Footer disclaimer is required and must stay visible.
