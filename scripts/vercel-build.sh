#!/usr/bin/env bash
set -euo pipefail

FUNC_DIR=".vercel/output/functions/api/index.func"

echo "==> Step 1: Build client (Vite) + server (esbuild)"
npm run build

echo "==> Step 2: Build Vercel serverless function with esbuild (CJS)"
mkdir -p "$FUNC_DIR"
npx esbuild server/vercel-handler.ts \
  --platform=node \
  --bundle \
  --format=cjs \
  --outfile="$FUNC_DIR/index.js" \
  --alias:@shared=./shared \
  --target=node20

# Force CJS mode for the function directory.
# The project root has "type":"module" which makes .js = ESM.
# This local package.json overrides that for the deployed function.
echo '{"type":"commonjs"}' > "$FUNC_DIR/package.json"

echo "==> Step 3: Arrange Build Output API v3 structure"

# Static assets → .vercel/output/static/
mkdir -p .vercel/output/static
cp -r dist/public/* .vercel/output/static/
# Remove index.html from static so all HTML routes go through the function
rm -f .vercel/output/static/index.html

# Copy index.html template into function for meta injection
cp dist/public/index.html "$FUNC_DIR/_index.html"

# Copy seed data into function (fallback when Payload CMS is unavailable)
mkdir -p "$FUNC_DIR/docs/payload-seed"
cp docs/payload-seed/*.json "$FUNC_DIR/docs/payload-seed/"

echo "==> Step 4: Write function config"
cat > "$FUNC_DIR/.vc-config.json" << 'VCEOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.js",
  "launcherType": "Nodejs",
  "shouldAddHelpers": true,
  "supportsResponseStreaming": true
}
VCEOF

echo "==> Step 5: Write output config (routing)"
cat > .vercel/output/config.json << 'CFGEOF'
{
  "version": 3,
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "Cache-Control": "public, max-age=31536000, immutable" },
      "continue": true
    },
    {
      "src": "/images/(.*)",
      "headers": { "Cache-Control": "public, max-age=604800" },
      "continue": true
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index"
    }
  ]
}
CFGEOF

echo "==> Build Output API v3 ready"
echo "Static files:"
ls .vercel/output/static/ | head -20
echo "Function files:"
ls -la "$FUNC_DIR/"
echo "Function size:"
du -sh "$FUNC_DIR/index.js"

# Export sanity check (esbuild CJS puts default export at module.exports.default)
echo "==> Export check:"
node -e "const m = require('./$FUNC_DIR/index.js'); const fn = m.default || m; console.log('default:', typeof m.default, '| module.exports:', typeof m, '| keys:', Object.keys(m).join(','));"
