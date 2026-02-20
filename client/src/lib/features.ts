/**
 * Feature flags — controlled via VITE_ environment variables.
 *
 * ─────────────────────────────────────────────────────────────────
 * BLOG_ENABLED
 * ─────────────────────────────────────────────────────────────────
 * When false, hides the blog from:
 *   • Nav header (desktop + mobile)
 *   • Footer "Lodge" link column
 *   • Homepage blog cards section (PantanalBlogSection)
 *   • 404 page blog cards section
 *
 * The /blog routes remain accessible via direct URL (not removed).
 *
 * Local dev  →  .env contains: VITE_BLOG_ENABLED=true
 * Production →  leave unset (or set VITE_BLOG_ENABLED=false) in Vercel
 *
 * ✅ TO RE-ENABLE THE BLOG IN PRODUCTION:
 *   1. Vercel → Project → Settings → Environment Variables
 *   2. Add  VITE_BLOG_ENABLED = true  (Environment: Production)
 *   3. Redeploy (or trigger via git push)
 * ─────────────────────────────────────────────────────────────────
 */
export const BLOG_ENABLED = import.meta.env.VITE_BLOG_ENABLED === "true";
