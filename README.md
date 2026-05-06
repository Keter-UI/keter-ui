# Keter UI

> A next-generation UI system for building SaaS products at startup speed with enterprise-grade design.

---

## ✨ What is Keter UI?

Keter UI is a modern, registry-based UI system designed for developers who want:

- ⚡ Ship SaaS products fast
- 🎨 Build with a design system at Apple/Stripe level
- 🧩 Reusable components with real-world scalability
- 🧠 DX-first architecture (developer experience first)
- 🌍 Multi-language & multi-tenant ready by default

This is a copy-and-paste UI system, allowing you full ownership of your component code.

---

## 🏗️ Architecture

- Registry-based distribution (shadcn/ui style)
- File-copy components (no runtime library coupling)
- CLI-driven installation and management
- CVA-based variant system
- Tailwind CSS integration

---

## ⚡ Features

### 🎨 Design System
- Token-based theming
- Dark mode first
- Accessible by default

### 🧩 Components
- Buttons, Inputs, Modals, Tables, Forms
- Fully typed (TypeScript-first)
- Variant system with CVA

---

## 📦 Installation

Initialize the project and base utilities:

```bash
npx keter-ui init
```

---

## 🚀 Usage

Add components to your project:

```bash
npx keter-ui add button
```

Then import them from your local project:

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div>
      <Button variant="primary">
        Launch SaaS
      </Button>
    </div>
  );
}
```

---

## 🧪 CLI

```bash
npx keter-ui init
npx keter-ui add [component]
npx keter-ui list
```

---

## 🤝 Contributing

- Follow design system rules
- Keep DX clean

---

## 📜 License

MIT — Build something meaningful.
