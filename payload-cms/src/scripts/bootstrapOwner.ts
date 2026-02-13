import "dotenv/config";

import { getPayload } from "payload";

import { ensureOwnerUser } from "../auth/ensure-owner-user";
import config from "../payload.config";

async function main() {
  const ownerEmail = process.env.PAYLOAD_OWNER_EMAIL;
  const ownerPassword = process.env.PAYLOAD_OWNER_PASSWORD;
  const ownerName = process.env.PAYLOAD_OWNER_NAME;

  if (!ownerEmail || !ownerPassword) {
    console.log(
      "PAYLOAD_OWNER_EMAIL/PAYLOAD_OWNER_PASSWORD nao definidos. Nenhum usuario dono foi criado.",
    );
    return;
  }

  const payload = await getPayload({ config });
  await ensureOwnerUser({
    payload,
    email: ownerEmail,
    password: ownerPassword,
    name: ownerName,
  });

  console.log(`Usuario dono garantido para ${ownerEmail}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
