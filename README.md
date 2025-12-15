# NextMart Inventory App

![Project Banner](https://placehold.co/600x200?text=NextMart+Inventory+App)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lavansh1306s-projects/v0-next-mart-inventory-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/sCmyuGd8wOQ)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Overview

**NextMart** is a modern, responsive inventory managemen dashboard built to help retail businesses track stock, manage products, and visualize inventory data. Designed with performance and user experience in mind, it utilizes the latest features of the Next.js App Router.

This project was initialized using [v0.app](https://v0.app) and is continuously integrated with Vercel for deployment.

## ✨ Key Features

* **Real-time Inventory Tracking:** Monitor stock levels and product status.
* **Product Management:** Interface to add, edit, or remove inventory items.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile views.
* **Modern UI:** Built with Tailwind CSS and Shadcn UI for a clean, accessible interface.
* **Type Safety:** robust code quality ensured by TypeScript.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (inferred via `components.json`)
* **Package Manager:** [pnpm](https://pnpm.io/)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (v18.17 or later)
* pnpm (v8 or later)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/lavansh1306/nextmart-inventory-app.git](https://github.com/lavansh1306/nextmart-inventory-app.git)
    cd nextmart-inventory-app
    ```

2.  **Install dependencies**
    This project uses `pnpm` for package management.
    ```bash
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    pnpm dev
    ```

4.  **Open the app**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable UI components (buttons, cards, etc.)
├── lib/              # Utility functions and shared logic
├── public/           # Static assets (images, fonts)
├── styles/           # Global CSS styles
├── next.config.mjs   # Next.js configuration
└── package.json      # Project dependencies and scripts
