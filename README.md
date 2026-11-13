# 🛡️ GitSentry

> **Autonomous Frontend Design, Animation Performance, and Anti-AI-Tell Codebase Auditor.**  
> Built by **David Erikefe (davebuiltit)**.

[![CLI Version](https://img.shields.io/badge/CLI-v1.0.0-blue?style=flat-square)](https://github.com/erikefedavid/GitSentry)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![Zero AI Tells](https://img.shields.io/badge/Design-Zero%20AI%20Tells-purple?style=flat-square)](https://impeccable.style)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

---

## Why GitSentry?

Modern web engineering often suffers from two hidden diseases:
1. **Layout Thrashing Animations**: Developers accidentally animating `height`, `width`, `top`, or `left`, causing dropped frames and jank on mobile devices.
2. **Generic AI Tells & Sloppy Design**: Accidental matrix/crosshair grids, arbitrary neon blur spots, generic placeholder text (*"empower your workflow"*), and unnatural cartoon bounce animations.

**GitSentry** is an autonomous auditor that scans your frontend codebases, pull requests, and component libraries to enforce the **Holy Trinity of Modern Frontend Excellence**:
- **Taste Skill Standards** (Equal margins, one section per screen, zero caption essays)
- **Impeccable Design Quality** (Anti-AI tells, strict accessibility contrast, 44x44px touch targets)
- **Emil Kowalski Design Engineering** (Composite-only animations, deceleration momentum curves, tactile click physics)

---

## Installation & Usage

### Direct CLI Execution
You can run GitSentry directly in any project folder:

```bash
# Scan current directory
node path/to/GitSentry/bin/cli.js audit

# Scan a specific component directory
node path/to/GitSentry/bin/cli.js audit ./src/components
```

### Example Audit Output

```text
=======================================================
 🛡️  GitSentry: Autonomous Frontend & Anti-AI Auditor
=======================================================

📁 Scanning workspace: ./src ...
🔍 Scanned 13 files in 35ms.

⚠️  Found 3 violation(s):

  1. [HIGH PRIORITY] [Performance] Geometry property animated (triggers browser layout thrashing)
     File: ./src/Components/Navbar.jsx:114
     Snippet: "animate={{ opacity: 1, height: "auto" }}"
     💡 Fix: Animate transform and opacity using composite layers instead of layout geometry.

  2. [HIGH PRIORITY] [Anti-AI Tells] Decorative matrix/crosshair grid background
     File: ./src/index.css:43
     Snippet: ".bg-grid-pattern {"
     💡 Fix: Remove decorative grid lines. Rely on structured whitespace, subtle borders, and typography.

  3. [MEDIUM] [Physics & Animation] Ease-in used on entrance transition
     File: ./src/index.css:84
     Snippet: "animation: pulseGlow 8s ease-in-out infinite;"
     💡 Fix: Use standard ease-out: cubic-bezier(0.23, 1, 0.32, 1) or snappy cubic-bezier(0.16, 1, 0.3, 1).
```

---

## Core Rules Enforced

| Rule ID | Severity | Category | What It Catches |
| :--- | :---: | :--- | :--- |
| `PERF-LAYOUT-ANIM` | **HIGH** | Performance | Animating `height`, `width`, `top`, `left`, `margin`, `padding` |
| `PERF-EASE-IN-ENTRANCE` | **MEDIUM** | Motion | Using `ease-in` or sluggish curves on elements entering viewport |
| `PERF-SCALE-ZERO` | **MEDIUM** | Motion | Scaling elements from pinhole zero (`scale(0)`) instead of `0.95 -> 1.0` |
| `PERF-CARTOON-BOUNCE` | **MEDIUM** | Motion | `animate-bounce` on standard interface buttons and cards |
| `TELL-DECORATIVE-GRID` | **HIGH** | Anti-AI Tells | Decorative matrix/crosshair grid backgrounds |
| `TELL-NEON-GLOW-BLOB` | **MEDIUM** | Anti-AI Tells | Arbitrary neon blur bubbles placed behind text |
| `TELL-PLACEHOLDER-COPY` | **HIGH** | Copy Authenticity | Generic filler copy (*"Empower your workflow"*, *"Unlock synergies"*) |
| `A11Y-TOUCH-TARGET` | **MEDIUM** | Accessibility | Interactive buttons with touch targets smaller than 44x44px |

---

## Integration in CI / GitHub Actions

Add GitSentry to your `.github/workflows/audit.yml` to automatically reject PRs introducing layout thrashing or AI tells:

```yaml
name: GitSentry Codebase Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: node bin/cli.js audit ./src
        env:
          CI: true
```

---

## Author

**David Erikefe-Dickson (davebuiltit)**  
- Portfolio: [daviderikefe.vercel.app](https://daviderikefe.vercel.app/)  
- GitHub: [@erikefedavid](https://github.com/erikefedavid)  
- Twitter: [@Davebuiltit](https://x.com/Davebuiltit)  
