import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../payload.config";

// One-time seed route — protected by SEED_SECRET env var
// Usage: GET /api/admin-seed?secret=<SEED_SECRET>
// Remove this file after seeding is complete.

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expected = process.env.SEED_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const { runImportSeed } = await import("../../../scripts/importSeed");
    await runImportSeed(payload);
    return NextResponse.json({ ok: true, message: "Seed completed" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
