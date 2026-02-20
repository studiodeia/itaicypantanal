import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../payload.config";

// One-time seed route — protected by SEED_SECRET env var
// Usage: GET /api/admin-seed?secret=<SEED_SECRET>&step=<step>
// Steps: all | seed | batch1 | translations
// Remove this file after seeding is complete.

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const step = req.nextUrl.searchParams.get("step") ?? "all";
  const expected = process.env.SEED_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    if (step === "all" || step === "seed") {
      const { runImportSeed } = await import("../../../scripts/importSeed");
      await runImportSeed(payload);
      results.push("importSeed OK");
    }

    if (step === "all" || step === "batch1") {
      const { runImportEditorialBatch1 } = await import("../../../scripts/importEditorialBatch1");
      await runImportEditorialBatch1(payload);
      results.push("importEditorialBatch1 OK");
    }

    if (step === "all" || step === "translations") {
      const { runImportEditorialBatch1Translations } = await import("../../../scripts/importEditorialBatch1Translations");
      await runImportEditorialBatch1Translations(payload);
      results.push("importEditorialBatch1Translations OK");
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
