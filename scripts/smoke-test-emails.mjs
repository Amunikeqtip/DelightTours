/**
 * Email smoke test — runs 4 test emails through /api/client-inquiry.
 * Requires the dev server to be running: npm run dev
 *
 * Usage:
 *   node scripts/smoke-test-emails.mjs
 */

const BASE_URL = "http://localhost:3000";
const ENDPOINT = `${BASE_URL}/api/client-inquiry`;

const TEST_CLIENT = {
  clientName: "Smoke Test User",
  clientEmail: "tedwell@outlook.com",
  clientPhone: "+263789276807",
  selectedServices: ["Victoria Falls Guided Tour"],
  date: "2026-06-15",
};

const TESTS = [
  {
    label: "Booking follow-up",
    payload: { ...TEST_CLIENT, flow: "booking" },
  },
  {
    label: "General enquiry",
    payload: { ...TEST_CLIENT, flow: "general" },
  },
  {
    label: "Cancellation notice",
    payload: { ...TEST_CLIENT, flow: "cancellation" },
  },
  {
    label: "Review request",
    payload: { ...TEST_CLIENT, flow: "reviewRequest" },
  },
];

let passed = 0;
let failed = 0;

console.log(`\nDelight Tours — Email Smoke Tests`);
console.log(`Endpoint: ${ENDPOINT}`);
console.log(`Recipient: ${TEST_CLIENT.clientEmail}\n`);
console.log("─".repeat(60));

for (const test of TESTS) {
  process.stdout.write(`  ${test.label.padEnd(28)} `);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(test.payload),
    });

    const body = await res.json();

    if (res.ok && body.ok) {
      console.log(`✓ PASS  →  admin: ${body.adminTo}  client: ${body.clientTo ?? "n/a (review flow)"}  flow: ${body.flow}`);
      passed++;
    } else {
      console.log(`✗ FAIL  →  HTTP ${res.status}  ${JSON.stringify(body)}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ FAIL  →  ${err.message}`);
    failed++;
  }
}

console.log("─".repeat(60));
console.log(`\n  Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
