import type { Payload } from "payload";

type EnsureOwnerUserArgs = {
  payload: Payload;
  email?: string;
  password?: string;
  name?: string;
};

export async function ensureOwnerUser({
  payload,
  email,
  password,
  name,
}: EnsureOwnerUserArgs): Promise<void> {
  if (!email || !password) {
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const ownerName = name?.trim() || "Project Owner";

  const existing = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: normalizedEmail,
      },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    const owner = existing.docs[0];
    await payload.update({
      collection: "users",
      id: owner.id,
      data: {
        name: ownerName,
        password,
      },
      depth: 0,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: "users",
    data: {
      email: normalizedEmail,
      password,
      name: ownerName,
    },
    depth: 0,
    overrideAccess: true,
  });
}
