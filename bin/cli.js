#!/usr/bin/env node

import path from "path";
import { auditWorkspace } from "../lib/auditor.js";

const args = process.argv.slice(2);
const command = args[0] || "audit";
const targetDir = args[1] ? path.resolve(process.cwd(), args[1]) : process.cwd();

console.log("\n=======================================================");
console.log(" 🛡️  GitSentry: Autonomous Frontend & Anti-AI Auditor");
console.log("=======================================================\n");

if (command === "audit") {
  console.log(`📁 Scanning workspace: ${targetDir} ...`);
  const startTime = Date.now();
  const { scannedFilesCount, violations } = auditWorkspace(targetDir);
  const duration = Date.now() - startTime;

  console.log(`🔍 Scanned ${scannedFilesCount} files in ${duration}ms.\n`);

  if (violations.length === 0) {
    console.log("✅ Zero violations detected! Your codebase adheres to Impeccable Design & 60fps Animation Standards.\n");
    process.exit(0);
  }

  console.log(`⚠️  Found ${violations.length} violation(s):\n`);

  let highCount = 0;
  let mediumCount = 0;

  violations.forEach((v, idx) => {
    if (v.severity === "HIGH") highCount++;
    if (v.severity === "MEDIUM") mediumCount++;

    const badge = v.severity === "HIGH" ? "[HIGH PRIORITY]" : "[MEDIUM]";
    console.log(`  ${idx + 1}. ${badge} [${v.category}] ${v.title}`);
    console.log(`     File: ${v.file}:${v.line}`);
    console.log(`     Snippet: "${v.codeSnippet}"`);
    console.log(`     💡 Fix: ${v.fix}\n`);
  });

  console.log("-------------------------------------------------------");
  console.log(`Summary: ${highCount} High, ${mediumCount} Medium violations.`);
  console.log("Run with auto-patch or review suggested diffs above.\n");

  if (highCount > 0 && process.env.CI) {
    process.exit(1);
  }
} else {
  console.log(`Unknown command: ${command}`);
  console.log("Usage: npx gitsentry audit [directory]");
  process.exit(1);
}
