const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { pool } = require("./pool");

async function migrate() {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");
    await pool.query(sql);
    console.log(`Applied migration: ${file}`);
  }

  await pool.end();
}

migrate().catch(async (error) => {
  console.error("Migration failed:", error);
  await pool.end();
  process.exit(1);
});
