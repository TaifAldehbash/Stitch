# 🧵 Stitch – Mini Website Builder

A lightweight, responsive, and SSR-friendly **Website Builder** built with **Next.js (App Router)**, **TypeScript**, and **TailwindCSS**.

> Submission for Rekaz Frontend Developer Assignment

---

## 🌐 Live Demo
🔗 **Deployed on Vercel:** [https://stitch-one.vercel.app](https://stitch-one.vercel.app)

---

## 💻 Repository
📦 **GitHub:** [https://github.com/TaifAldehbash/Stitch](https://github.com/TaifAldehbash/Stitch)

---

## 🎯 Objective

The goal was to implement a **Mini Website Builder** that allows users to:
- Add pre-made sections (e.g., Hero, Features, FAQ, Footer)
- Preview the page in real-time
- Edit section content (text, images, arrays, etc.)
- Reorder and delete sections via drag-and-drop
- Export/Import layouts as JSON files
- Save work locally for persistence
- Enjoy smooth animations and responsive design
- Support SSR by pushing client components down the tree

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Validation:** [Zod](https://zod.dev/)
- **Drag & Drop:** [dnd-kit](https://dndkit.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Persistence:** LocalStorage via Zustand middleware

---

## 🧩 Features Overview

| Feature | Description |
|----------|--------------|
| **Section Library** | Add pre-defined sections (Hero, Features, FAQ, Footer) with a single click. |
| **Live Canvas Preview** | Instantly preview all updates on the canvas. |
| **Editable Sections** | Edit text, images, and arrays (like feature lists or FAQ items). |
| **Drag & Drop Reordering** | Rearrange sections dynamically with smooth transitions. |
| **Import/Export** | Save or load your entire layout using JSON. |
| **Persistence** | Automatically saves layout state locally between sessions. |
| **Responsive Design** | Optimized for desktop and mobile. |
| **SSR-Friendly** | Client components are pushed down from App Router for server rendering. |

---

## ⚙️ Setup & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/TaifAldehbash/Stitch.git

# 2. Navigate to the project
cd Stitch

# 3. Install dependencies
pnpm install
# or
npm install

# 4. Run the development server
pnpm dev
# or
npm run dev

# 5. Visit the app
http://localhost:3000
