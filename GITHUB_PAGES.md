# Host this portfolio on GitHub Pages

GitHub: **[@akhilsantha7](https://github.com/akhilsantha7)** — your site will be served from a **repository** under that account (the profile URL is not the website).

Your site files live in **`portfolio/`** (this folder is the website root: `index.html`, `styles.css`, etc.).

## Option A — Repo looks like this folder (`Resume/`)

If you push this whole project so the repo contains `portfolio/` at the top level:

1. Create a new **repository** on GitHub (e.g. `portfolio` or `my-site`).
2. Push the **`Resume`** folder contents to the **`main`** branch.
3. **Important (first time):** **Settings → Pages → Build and deployment → Source:** **GitHub Actions**, then **Save**.
4. The workflow uses **build** (upload artifact) + **deploy** (`deploy-pages`) only — **no `configure-pages`** step, so it avoids the **GET /pages → Not Found** API error.
5. After the first successful run, your site URL appears under **Settings → Pages** (for you: `https://akhilsantha7.github.io/<repo>/`).

### User site at the root URL (no `/repo` path)

Create a repo named **`akhilsantha7.github.io`** (exactly), put **`portfolio/`** contents at the **repo root** (`index.html` at top level), enable Pages from **`main`** → **`/ (root)`**.  
Live URL: **`https://akhilsantha7.github.io/`** — matches `og:url` in `index.html`.

If the workflow fails, open **Actions** tab and read the error; ensure **Settings → Actions → General** allows workflows.

---

## Option B — Simpler: only the website in the repo root

If you **copy everything inside `portfolio/`** to the **root** of the repo (`index.html` next to `.git`):

1. Push to **`main`**.
2. **Settings → Pages →** Source: **Deploy from a branch**
3. Branch: **`main`**, folder: **`/ (root)`**, Save.
4. You **do not** need the GitHub Actions workflow (you can delete `.github/workflows/`).

---

## Custom domain (optional)

1. Buy a domain from a registrar (Namecheap, Cloudflare, etc.).
2. Repo **Settings → Pages → Custom domain** → enter `www.yourdomain.com` or `yourdomain.com`.
3. Add the DNS records GitHub shows (usually **A** / **CNAME** records).
4. Enable **Enforce HTTPS** after DNS propagates.

---

## Update meta tags

In `portfolio/index.html`, replace placeholder URLs:

- `og:image`, `og:url`, `twitter:image` → your real **https://** site URL and image.
