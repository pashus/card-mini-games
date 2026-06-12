import bcrypt from "bcrypt";
import prisma from "./prisma";
import "dotenv/config";

async function main() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admins.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
    },
  });

  console.log("Admin created");
}

main().finally(() => process.exit());
