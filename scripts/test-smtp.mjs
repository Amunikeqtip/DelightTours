/**
 * Direct SMTP connection test — no dev server needed.
 * Usage: node scripts/test-smtp.mjs
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer");

const settings = JSON.parse(readFileSync(join(process.cwd(), "appsettings.json"), "utf8"));
const { EmailHost, EmailUsername, EmailPassword } = settings.emailSettings;

console.log(`\nSMTP Test`);
console.log(`Host:     ${EmailHost}`);
console.log(`User:     ${EmailUsername}`);
console.log(`Password: ${"*".repeat(EmailPassword?.length ?? 0)}`);
console.log("");

const transporter = nodemailer.createTransport({
  host: EmailHost,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user: EmailUsername, pass: EmailPassword },
});

// Step 1: verify connection
console.log("1. Verifying SMTP connection...");
try {
  await transporter.verify();
  console.log("   ✓ SMTP connection OK\n");
} catch (err) {
  console.error(`   ✗ Connection FAILED: ${err.message}`);
  console.error(`     Code: ${err.code}  ResponseCode: ${err.responseCode}`);
  console.error("\nFix the SMTP credentials or host before proceeding.\n");
  process.exit(1);
}

// Step 2: send test email to admin
console.log("2. Sending test email to admin (tedwell@outlook.com)...");
try {
  const info = await transporter.sendMail({
    from: `"Delight Tours & Travel" <${EmailUsername}>`,
    to: "tedwell@outlook.com",
    subject: "[SMTP TEST] Admin notification — Delight Tours",
    text: "This is a direct SMTP test email to confirm admin delivery.",
    html: "<p>This is a direct <strong>SMTP test</strong> email to confirm admin delivery from Delight Tours.</p>",
  });
  console.log(`   ✓ Sent — messageId: ${info.messageId}\n`);
} catch (err) {
  console.error(`   ✗ Send FAILED: ${err.message}\n`);
  process.exit(1);
}

// Step 3: send test email to client (same address for test purposes)
console.log("3. Sending test confirmation to client (tedwell@outlook.com)...");
try {
  const info = await transporter.sendMail({
    from: `"Delight Tours & Travel" <${EmailUsername}>`,
    to: "tedwell@outlook.com",
    subject: "[SMTP TEST] Booking confirmation — Delight Tours",
    text: "This is a direct SMTP test email to confirm client delivery.",
    html: "<p>This is a direct <strong>SMTP test</strong> email to confirm client confirmation delivery from Delight Tours.</p>",
  });
  console.log(`   ✓ Sent — messageId: ${info.messageId}\n`);
} catch (err) {
  console.error(`   ✗ Send FAILED: ${err.message}\n`);
  process.exit(1);
}

console.log("All tests passed. Check tedwell@outlook.com for 2 test emails.\n");
