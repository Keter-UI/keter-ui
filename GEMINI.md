# Keter UI — Unified Project Context (AI-Driven Development)

## Overview

Keter UI is a production-grade, AI-native, RTL-first UI platform designed for modern developers building real-world applications.

It is not just a component library.

Keter UI is a **complete UI system**, composed of:

* Component library (React-first, multi-framework future)
* Design tokens system
* RTL engine (first-class support)
* CLI for automation and scaffolding
* AI integration layer
* Documentation system (auto-generatable)
* Production-ready dashboard templates

This repository acts as the **single source of truth** for:

* Code generation
* Documentation generation
* Landing page content
* Developer experience

---

## Vision

Build a globally adopted UI system that developers trust in production.

Keter UI must feel:

* Fast
* Precise
* Structured
* Powerful
* Reliable

It should eliminate friction between:

> Idea → UI → Production

---

## Core Philosophy

### 1. Engineering First

Prioritize:

* Performance
* Code quality
* Maintainability
* Predictability

Avoid:

* Visual gimmicks without function
* Overly complex abstractions

---

### 2. Real Usability (No Fake UI)

All components MUST:

* Be fully interactive
* Have real states (hover, focus, active, disabled)
* Use realistic data (when applicable)
* Be production-ready

---

### 3. Documentation as a First-Class Output

⚠️ CRITICAL:

All code must be written in a way that allows:

* Automatic documentation generation
* AI-readable structure
* Predictable API extraction

Every component, hook, and utility MUST:

* Have clear naming
* Have consistent props
* Be self-explanatory

Documentation is not written later.
Documentation is **derived from the system**.

---

### 4. AI-First Architecture

Keter UI must be optimized for AI usage.

That means:

* Clear, structured APIs
* Predictable patterns
* Minimal ambiguity
* Installable via prompt

Examples:

* "Install Keter UI in Next.js"
* "Generate a dashboard with RTL support"

---

### 5. RTL as a Core Feature

RTL is NOT optional.

The system must:

* Fully support layout mirroring
* Use logical CSS properties
* Allow dynamic switching (LTR ↔ RTL)
* Work seamlessly with all components

---

### 6. Performance by Default

* Tree-shakeable packages
* Minimal bundle size
* Lazy loading where applicable
* No unnecessary dependencies

---

### 7. Developer Experience (DX)

Everything must optimize for:

* Speed of adoption
* Ease of use
* Low cognitive load

---

## System Architecture

### Monorepo Structure

keter-ui/

* apps/

  * web/           → Landing page (marketing + product showcase)
  * docs/          → Documentation site (generated + structured)
  * playground/    → Interactive component environment

* packages/

  * core/          → Shared utilities and hooks
  * tokens/        → Design system (colors, spacing, typography)
  * rtl/           → RTL engine
  * react/         → React components
  * cli/           → CLI tool

* ai/

  * install.json   → AI-readable instructions

---

## Documentation System (CRITICAL LAYER)

The documentation is NOT separate from the system.

It must be generated from:

* Component definitions
* Props
* Examples
* CLI commands

### Documentation Requirements

Each component must produce:

1. Overview
2. Usage example
3. Props table
4. Variants
5. Accessibility notes
6. RTL behavior notes
7. Code examples (copy-paste ready)

---

### Documentation Pages Structure

/docs
/docs/installation
/docs/getting-started
/docs/components/button
/docs/components/input
/docs/components/modal
/docs/components/table
/docs/dashboard
/docs/rtl
/docs/cli

---

### Documentation Style

* Clear and technical
* No fluff
* Copy-paste friendly
* Code-first explanations

---

## Landing Page Integration

The landing page (apps/web) must reuse:

* Real components from packages/react
* Real dashboard templates
* Real interactions

⚠️ No fake UI allowed.

The LP is an extension of the product.

---

## Component System

All components must follow:

### Requirements

* Accessible (ARIA compliant)
* Interactive
* Styled via tokens
* Theme-aware (dark/light)
* RTL-compatible
* Composable

---

### Required Components (Initial Scope)

* Button
* Input
* Modal
* Card
* Table

---

### Component Standards

Each component must include:

* Variants (e.g. primary, secondary)
* States (hover, focus, active, disabled)
* Clean API
* Minimal dependencies

---

## Dashboard System (KEY DIFFERENTIATOR)

Dashboards must:

* Look like real SaaS products
* Be information-dense
* Include realistic mock data
* Be responsive
* Be immediately usable

### Required Features

* Sidebar (collapsible)
* Topbar (search, notifications)
* Metrics cards
* Charts (mocked)
* Data tables
* Activity feed

---

## CLI System

CLI is a core feature.

### Commands

* npx keter-ui init
* npx keter-ui add button
* npx keter-ui add modal
* npx keter-ui add dashboard

### Responsibilities

* Setup project
* Install dependencies
* Inject tokens
* Configure RTL
* Generate layouts

---

## AI Integration Layer

File:
ai/install.json

Must include:

* Install commands
* Framework support
* Prompt examples
* Usage patterns

---

## Code Standards

* TypeScript everywhere
* Modular architecture
* Clear naming
* Avoid over-engineering
* Prefer composition over inheritance

---

## Non-Goals

* No bloated components
* No visual-only features
* No unnecessary abstractions

---

## Long-Term Vision

* Multi-framework support (Vue, Svelte, Web Components)
* Plugin ecosystem
* Global open-source adoption
* Optional premium layer

---

## Final Directive

All outputs generated from this project must be:

* Reusable
* Documentable
* Predictable
* Scalable

Always ask:

"Can this be understood, used, and extended by another developer instantly?"

If not, simplify.


Final Organograma:
keter-ui/
│
├── .github/
│   ├── workflows/
│   └── templates/
│
├── apps/
│   └── web/                        # 🌐 APP PRINCIPAL (LP + Docs + Playground)
│       │
│       ├── app/
│       │   ├── (marketing)/        # Landing Page
│       │   │   ├── page.tsx
│       │   │   ├── components/
│       │   │   └── sections/
│       │   │
│       │   ├── docs/               # 📚 DOCUMENTAÇÃO
│       │   │   ├── page.tsx
│       │   │   ├── getting-started/
│       │   │   ├── installation/
│       │   │   ├── components/
│       │   │   │   ├── button/
│       │   │   │   ├── input/
│       │   │   │   └── modal/
│       │   │   ├── dashboard/
│       │   │   ├── rtl/
│       │   │   └── cli/
│       │   │
│       │   ├── playground/         # 🧪 playground
│       │   │   └── page.tsx
│       │   │
│       │   ├── dashboard/          # 🔥 demo real (usado na LP)
│       │   │   └── page.tsx
│       │   │
│       │   ├── api/                # (opcional - se precisar)
│       │   │
│       │   ├── layout.tsx
│       │   └── globals.css
│       │
│       ├── components/             # shared UI da web (não da lib)
│       ├── lib/
│       ├── public/
│       ├── styles/
│       ├── i18n/                   # EN, PT, ES, HE (RTL)
│       │
│       └── package.json
│
├── packages/                       # 🧠 PRODUTO REAL (open source)
│   │
│   ├── core/
│   ├── tokens/
│   ├── rtl/
│   ├── react/
│   └── cli/
│
├── ai/
│   └── install.json
│
├── scripts/
│   ├── generate-docs.ts
│   └── release.ts
│
├── configs/
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
│
├── README.md
├── LICENSE
├── CONTRIBUTING.md
│
├── GEMINI.md
└── CLAUDE.md