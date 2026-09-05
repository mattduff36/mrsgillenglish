import { hash } from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-admin-password -- \"your-password\"");
  process.exit(1);
}

hash(password, 12)
  .then((value) => {
    console.log(value);
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
