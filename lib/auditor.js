import fs from "fs";
import path from "path";
import { RULES } from "./rules.js";

const DEFAULT_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".html", ".vue", ".svelte", ".css"];
const IGNORED_DIRS = ["node_modules", ".git", ".next", "dist", "build", "coverage", ".cache", "lib"];

/**
 * Recursively find all source files matching extensions
 */
export function getSourceFiles(dir, extensions = DEFAULT_EXTENSIONS) {
  let results = [];
  
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.includes(entry.name)) {
        results = results.concat(getSourceFiles(fullPath, extensions));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

/**
 * Scan a single file content against GitSentry rules
 */
export function auditFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];

    for (const rule of RULES) {
      if (rule.regex.test(line)) {
        violations.push({
          ruleId: rule.id,
          title: rule.title,
          category: rule.category,
          severity: rule.severity,
          description: rule.description,
          fix: rule.fix,
          file: filePath,
          line: lineIndex + 1,
          codeSnippet: line.trim()
        });
      }
    }
  }

  return violations;
}

/**
 * Execute audit across an entire workspace directory
 */
export function auditWorkspace(workspaceDir) {
  const files = getSourceFiles(workspaceDir);
  const allViolations = [];

  for (const file of files) {
    const fileViolations = auditFile(file);
    if (fileViolations.length > 0) {
      allViolations.push(...fileViolations);
    }
  }

  return {
    scannedFilesCount: files.length,
    violations: allViolations
  };
}
