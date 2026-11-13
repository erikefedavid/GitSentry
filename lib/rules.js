/**
 * Core Rule Definitions for GitSentry Frontend Engineering Audit
 */

export const RULES = [
  // 1. Animation Performance & Layout Thrashing
  {
    id: "PERF-LAYOUT-ANIM",
    severity: "HIGH",
    category: "Performance",
    title: "Geometry property animated (triggers browser layout thrashing)",
    description: "Animating layout properties (height, width, top, left, margin, padding) forces the browser to recalculate layout on every frame. Use transform (translate, scale) and opacity exclusively.",
    regex: /(transition(?:-all)?|animate)[\s\S]{0,80}\b(height|width|top|left|right|bottom|margin|padding|max-h|max-w)\b/i,
    fix: "Animate transform and opacity using composite layers instead of layout geometry."
  },
  {
    id: "PERF-EASE-IN-ENTRANCE",
    severity: "MEDIUM",
    category: "Physics & Animation",
    title: "Ease-in used on entrance transition",
    description: "Entrance animations must start with momentum and decelerate smoothly (ease-out). Never use ease-in on elements entering the viewport.",
    regex: /\b(ease-in\b|cubic-bezier\(\s*0\.\d+\s*,\s*0\s*,\s*1\s*,\s*1\s*\))/i,
    fix: "Use standard ease-out: cubic-bezier(0.23, 1, 0.32, 1) or snappy cubic-bezier(0.16, 1, 0.3, 1)."
  },
  {
    id: "PERF-SCALE-ZERO",
    severity: "MEDIUM",
    category: "Physics & Animation",
    title: "Element scaling from zero (pinhole pop-in)",
    description: "Elements entering should scale subtly from scale(0.95) to scale(1) with opacity 0 to 1. Scaling from zero looks unnatural and cartoony.",
    regex: /\b(scale-0\b|scale\(0\)|initial=\{\{\s*scale:\s*0\s*\}\})/i,
    fix: "Scale from scale(0.95) to scale(1) combined with opacity: 0 to 1."
  },
  {
    id: "PERF-CARTOON-BOUNCE",
    severity: "MEDIUM",
    category: "Physics & Animation",
    title: "Cartoon bounce animation detected",
    description: "Rubber-band or animate-bounce effects on standard UI elements create a toy-like feel.",
    regex: /\banimate-bounce\b/i,
    fix: "Replace with subtle tactile press feedback: active:scale-[0.97] with transition <= 100ms."
  },

  // 2. Anti-AI Tells (Impeccable Design Quality)
  {
    id: "TELL-DECORATIVE-GRID",
    severity: "HIGH",
    category: "Anti-AI Tells",
    title: "Decorative matrix/crosshair grid background",
    description: "Faux 2-axis hairline grid backgrounds and matrix crosshairs are a telltale sign of generic AI-generated templates.",
    regex: /\b(codex-grid-background|bg-grid-pattern|radial-grid-mesh)\b/i,
    fix: "Remove decorative grid lines. Rely on structured whitespace, subtle borders, and typography."
  },
  {
    id: "TELL-NEON-GLOW-BLOB",
    severity: "MEDIUM",
    category: "Anti-AI Tells",
    title: "Arbitrary floating neon blur bubble",
    description: "Floating radial blur circles behind headers create artificial neon glow that harms text contrast and looks generic.",
    regex: /\b(blur-(?:2xl|3xl)\s+bg-(?:purple|indigo|fuchsia)-(?:500|600|700)\/20)\b/i,
    fix: "Remove arbitrary neon blur spots; establish visual hierarchy through crisp contrast and layout."
  },
  {
    id: "TELL-PLACEHOLDER-COPY",
    severity: "HIGH",
    category: "Copy & Authenticity",
    title: "Generic AI placeholder copy detected",
    description: "Phrases like 'Empower your workflow', 'Unlock next-gen synergies', or 'Seamlessly streamline' convey zero actual utility to the user.",
    regex: /\b(empower your (?:workflow|journey|business)|unlock (?:next-gen|seamless) synergies|streamline everything|seamlessly transform)\b/i,
    fix: "Replace with plain, concrete human copy with real numbers, specific nouns, and authentic utility."
  },

  // 3. Accessibility & Touch Targets
  {
    id: "A11Y-TOUCH-TARGET",
    severity: "MEDIUM",
    category: "Accessibility",
    title: "Interactive element may not meet 44x44px touch target requirement",
    description: "Touch targets on interactive elements must measure at least 44x44px to satisfy mobile accessibility standards.",
    regex: /<button[^>]*class(?:Name)?=["'][^"']*\b(h-[4-8]\b|w-[4-8]\b)[^"']*["']/i,
    fix: "Ensure button has min-h-[44px] min-w-[44px] or adequate padding (p-3 / py-2.5 px-4)."
  }
];
