/**
 * Auto-patch engine for GitSentry
 */

import fs from "fs";

export function autoPatchFile(filePath, violations) {
  if (!violations || violations.length === 0) return 0;
  
  let content = fs.readFileSync(filePath, "utf-8");
  let patchCount = 0;

  for (const v of violations) {
    if (v.ruleId === "PERF-LAYOUT-ANIM") {
      // Replace animate={{ ... height: "auto" }} or similar layout animation with opacity & y
      if (content.includes('height: "auto"')) {
        content = content.replace(/height:\s*["']auto["']/g, 'y: 0');
        patchCount++;
      }
      if (content.includes('height: 0')) {
        content = content.replace(/height:\s*0/g, 'y: -8');
        patchCount++;
      }
    } else if (v.ruleId === "PERF-EASE-IN-ENTRANCE") {
      if (content.includes('ease-in-out')) {
        content = content.replace(/\bease-in-out\b/g, 'cubic-bezier(0.23, 1, 0.32, 1)');
        patchCount++;
      } else if (content.includes('ease-in')) {
        content = content.replace(/\bease-in\b/g, 'cubic-bezier(0.16, 1, 0.3, 1)');
        patchCount++;
      }
    } else if (v.ruleId === "PERF-SCALE-ZERO") {
      content = content.replace(/\bscale:\s*0\b/g, 'scale: 0.95');
      content = content.replace(/\bscale-0\b/g, 'scale-95');
      patchCount++;
    } else if (v.ruleId === "PERF-CARTOON-BOUNCE") {
      content = content.replace(/\banimate-bounce\b/g, 'active:scale-[0.97] transition-transform duration-100');
      patchCount++;
    }
  }

  if (patchCount > 0) {
    fs.writeFileSync(filePath, content, "utf-8");
  }

  return patchCount;
}
