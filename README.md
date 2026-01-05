# 🏗️ MAS Contractors LLC - Official Website

![MAS Contractors Logo](public/IMG_0271.png)

This project is a modern, responsive website for **MAS Contractors LLC**, built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. It focuses on performance, local SEO, and a premium user experience.

## 📂 Project Structure Map

```
d:\Proyectos\mascontractorsllc\
├── public/                 # Static assets (images, logos, robots.txt)
├── src/
│   ├── app/                # Next.js App Router (Pages & Routing)
│   │   ├── about/          # Route: /about
│   │   ├── contact/        # Route: /contact
│   │   ├── gallery/        # Route: /gallery
│   │   ├── services/       # Route: /services
│   │   ├── layout.js       # Root Layout (Fonts, Metadata, Header/Footer)
│   │   ├── page.jsx        # Route: / (Home Page)
│   │   ├── not-found.js    # 404 Error Handler (Redirects to Home)
│   │   └── globals.css     # Global Styles & Tailwind Directives
│   │
│   ├── components/         # Reusable UI Components
│   │   ├── contact.jsx     # Contact Form with EmailJS & ReCAPTCHA
│   │   ├── navbar.jsx      # Responsive Navigation Bar
│   │   ├── footer.jsx      # Site Footer
│   │   ├── FAQ.jsx         # Accordion FAQ Component
│   │   └── ...             # Other section-specific components
│   │
│   └── lib/                # Utilities & Shared Data
│       ├── data.json       # Content Text & Configuration
│       └── gallery.json    # Gallery Image Data (Generated)
│
├── scripts/
│   └── generate-gallery.js # Script to generate gallery.json
│
├── .env.local              # Local Environment Variables (Git Ignored)

└── tailwind.config.js      # Design System Configuration (Colors, Fonts)
```

## 🏗️ Architecture Decisions

The project follows a **Feature-Based** and **Component-Driven** architecture optimized for Next.js App Router:

1.  **`src/app/` (Routing)**:
    *   We use the **App Router** for better performance and Server Components support.
    *   **Server Components** (`page.jsx`): Used by default for SEO metadata and initial data fetching.
    *   **Client Components** (`"use client"`): Used only where interactivity is needed (animations, forms, sliders), keeping the JS bundle size small.

2.  **`src/components/` (UI)**:
    *   Components are modular and reusable.
    *   Logic is separated from the page structure (e.g., `ServicesContent.jsx` holds the logic/view for `services/page.jsx`).

3.  **`src/data/` vs `src/lib/`**:
    *   Separation of content from code allows for easier updates to text and images without risking breaking the application logic.

## 🚀 SEO Implementation (Search Engine Optimization)

The site is heavily optimized for **Local SEO** to target clients in **Richmond, VA**.

### 1. Metadata API
Every page (`page.jsx`) exports a `metadata` object containing:
*   **Title**: Optimized with keywords (e.g., "General Contractor in Richmond, VA").
*   **Description**: Compelling summaries including core services.
*   **Keywords**: Specific tags like "Kitchen Remodeling", "Commercial Construction".
*   **OpenGraph**: optimized for social media sharing.

### 2. Semantic HTML
*   **Hierarchy**: Strict `H1` -> `H2` -> `H3` structure.
    *   `H1`: One per page, defining the main topic.
    *   `H2`: Main sections and service categories.
*   **Alt Text**: All images follow the **"What + Where"** pattern (e.g., *"Kitchen Remodeling in Richmond VA"*) to help Google associate services with the location.

### 3. Structured Data (Schema.org)
*   **LocalBusiness**: Implemented to tell Google this is a physical business.
*   **FAQPage**: The Services page includes JSON-LD for FAQs, increasing the chance of appearing in Google's "People Also Ask" snippets.

### 4. Technical SEO
*   **Mobile First**: Fully responsive design.
*   **Performance**: Uses `next/image` for automatic image optimization (WebP, resizing).
*   **Redirects**: A custom `not-found.js` redirects all broken links to the Homepage to reduce bounce rates.

## 🔐 Environment Variables

Security is managed via `.env.local` (local development) and Vercel Environment Variables (production).

**Required Keys:**
*   `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: For Google ReCAPTCHA v2.
*   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: For sending emails via EmailJS.
*   `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: EmailJS Service Identifier.
*   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: EmailJS Template Identifier.

> **Note:** These keys are prefixed with `NEXT_PUBLIC_` because they are required by Client Components (`contact.jsx`) to function in the browser.

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Forms**: React Hook Form / Standard State
*   **Email**: EmailJS
*   **Security**: Google ReCAPTCHA v2

## 📜 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production.\
It automatically runs `npm run generate-gallery` before building to ensure `src/lib/gallery.json` is up to date.

### `npm run start`
Starts the production server.

### `npm run lint`
Runs the linter to check for code quality issues.

### `npm run generate-gallery`
Scans `public/gallery` and generates/updates `src/lib/gallery.json`.\
*Useful when you add new images to the gallery.*\
\
**Alt Text Format**: Automatically generates readable descriptions based on the filename + "in North Chesterfield, VA". (e.g. `MyImage.jpg` -> `My Image in North Chesterfield, VA`)
