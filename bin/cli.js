#!/usr/bin/env node

import path from "path";
import { auditWorkspace } from "../lib/auditor.js";
import { autoPatchFile } from "../lib/patcher.js";

const args = process.argv.slice(2);
const isFixMode = args.includes("--fix");
const nonFlagArgs = args.filter(a => !a.startsWith("--"));
const command = nonFlagArgs[0] || "audit";
const targetDir = nonFlagArgs[1] ? path.resolve(process.cwd(), nonFlagArgs[1]) : process.cwd();

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

  if (isFixMode) {
    console.log("\n🛠️  Applying automatic patches (--fix enabled) ...");
    const fileMap = {};
    violations.forEach(v => {
      if (!fileMap[v.file]) fileMap[v.file] = [];
      fileMap[v.file].push(v);
    });

    let totalPatches = 0;
    for (const [file, vList] of Object.entries(fileMap)) {
      const patched = autoPatchFile(file, vList);
      if (patched > 0) {
        console.log(`  ✓ Patched ${patched} violation(s) in: ${file}`);
        totalPatches += patched;
      }
    }
    console.log(`\n🎉 Successfully auto-patched ${totalPatches} violation(s)!\n`);
  } else {
    console.log("Tip: Run with --fix to automatically apply drop-in replacements.\n");
  }

  if (highCount > 0 && process.env.CI && !isFixMode) {
    process.exit(1);
  }
} else {
  console.log(`Unknown command: ${command}`);
  console.log("Usage: npx gitsentry audit [directory]");
  process.exit(1);
}
