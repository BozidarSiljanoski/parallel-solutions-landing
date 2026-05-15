# Next steps — Parallel Solutions landing page

A practical checklist to go from local dev to a live site with Calendly, email, and Google Search Console.

---

## 1. Finish local setup (5–10 min)

### Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Required | What to put |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | `https://yourdomain.com` after deploy |
| `NEXT_PUBLIC_CALENDLY_URL` | Yes | Your **event** link from Calendly (see §3) |
| `SENDGRID_API_KEY` | For contact form | API key from SendGrid |
| `SENDGRID_FROM_EMAIL` | For contact form | Verified sender in SendGrid |
| `SENDGRID_TO_EMAIL` | For contact form | Where leads should arrive |

Run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Scroll to **Book a discovery call** — the Calendly widget should render inside the page (not an empty box).

---

## 2. Deploy on Vercel (simplest path)

Vercel is made for Next.js: push code → connect repo → set env vars → live URL.

### Step A — Put the project on GitHub

```bash
git init
git add .
git commit -m "Initial Parallel Solutions landing page"
# Create an empty repo on GitHub, then:
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step B — Import in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. **Add New → Project** → import your repository.
3. Framework preset should be **Next.js** (auto-detected).
4. Under **Environment Variables**, add the same keys as `.env.local` (see table above).
   - For `NEXT_PUBLIC_*` vars, add them for **Production**, **Preview**, and **Development** if you use preview deployments.
5. Click **Deploy**.

You get a URL like `https://your-project.vercel.app`. Set:

```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

Redeploy once (Vercel → Project → Deployments → ⋮ → Redeploy) so metadata/sitemap use the correct URL.

### Step C — Custom domain (optional)

1. Vercel → Project → **Settings → Domains**.
2. Add `www.yourdomain.com` and `yourdomain.com`.
3. At your DNS provider, add the records Vercel shows (usually `A` / `CNAME`).
4. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and redeploy.

---

## 3. Calendly (free plan)

### Create your scheduling link

1. Sign up at [calendly.com](https://calendly.com) (free tier is enough for one event type + embed).
2. **Event types** → create something like **Discovery call** (30 min).
3. Open the event → **Share** → copy the link. It looks like:
   - `https://calendly.com/your-username/30min`

### Connect to this site

In Vercel (and `.env.local`):

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
```

Redeploy. The embed uses Calendly’s `initInlineWidget` API; if the URL is wrong or Calendly is blocked, users see an **Open Calendly** fallback button.

### Free plan limits (good to know)

- One active event type on free (upgrade for more).
- Calendly branding on the widget (removed on paid plans).
- Embed works on your site; bookings still sync to your Calendly calendar (Google/Outlook connect in Calendly settings).

### Popup alternative (no embed)

All **Book a call** buttons also open this URL in a new tab — the site works even if the inline widget fails.

---

## 4. SendGrid (contact form)

1. [sendgrid.com](https://sendgrid.com) → create account.
2. **Settings → API Keys** → create key with **Mail Send** permission.
3. **Settings → Sender Authentication** → verify a single sender (or domain for production).
4. Set in Vercel:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL` = verified address
   - `SENDGRID_TO_EMAIL` = your inbox for leads

Test: submit the form on `/contact`. Check SendGrid **Activity** if mail doesn’t arrive (spam folder too).

---

## 5. Google Search Console

Goal: tell Google your site exists and monitor indexing.

### Prerequisites

- Site is **live** on Vercel (or custom domain with HTTPS).

### Steps

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **URL prefix** → enter `https://yourdomain.com` (or your `.vercel.app` URL for testing).
3. **Verify ownership** — easiest with Vercel custom domain:
   - Method: **HTML tag** or **DNS TXT** record.
   - **HTML tag**: copy the meta tag → add to `app/layout.tsx` in `metadata.verification.google` (Next.js supports this), redeploy.
   - **DNS**: add TXT at your registrar as Google instructs.
4. After verified: **Sitemaps** → submit `https://yourdomain.com/sitemap.xml`.

This project already exposes `https://yourdomain.com/sitemap.xml` and `robots.txt` via `app/sitemap.ts` and `app/robots.ts`.

5. **URL inspection** → enter homepage → **Request indexing** for the first crawl.

Indexing takes days to weeks; Search Console shows coverage and queries over time.

---

## 6. SEO basics already in the app

- Page titles and descriptions in `app/layout.tsx` and per-route `metadata`.
- Set `NEXT_PUBLIC_SITE_URL` correctly for Open Graph URLs.
- Semantic headings on the landing page and case studies.

**Optional improvements**

- Replace placeholder copy, logos, and case study metrics.
- Add a real favicon / OG image under `app/`.

---

## 7. Commands reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Run production locally | `npm run start` |
| E2E tests | `npm run test:e2e` |
| Mobile E2E only | `npm run test:e2e:mobile` |

---

## 8. Suggested order of operations

1. Calendly event link → `NEXT_PUBLIC_CALENDLY_URL` → test embed locally.
2. SendGrid → test `/contact` locally.
3. Push to GitHub → deploy Vercel → add all env vars.
4. Set `NEXT_PUBLIC_SITE_URL` to production URL → redeploy.
5. Custom domain (if you have one).
6. Google Search Console verify + submit sitemap.
7. Replace placeholder content and inspiration links when ready for real clients.

---

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| Empty Calendly box | Use a real event URL (`/username/event-name`), not a made-up path. Redeploy after changing env. |
| Contact form 503 | SendGrid env vars missing or invalid on Vercel. |
| Button warnings in console | Fixed in `components/ui/button.tsx` (`nativeButton={false}` when using `render` with links). |
| Calendly shows fallback | Ad blocker, wrong URL, or script blocked — use **Open Calendly** or disable blockers for your domain. |

---

## 10. What you do *not* need for launch

- Paid Calendly (free embed is fine).
- Separate hosting (Vercel free tier is enough to start).
- Google Analytics (optional; add later via Vercel or `next/script`).

For Google HTML-tag verification, add to `app/layout.tsx` metadata:

```ts
verification: { google: "your-verification-code" },
```
