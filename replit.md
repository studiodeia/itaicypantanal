# Itaicy Website

## Overview
A website for Itaicy, a Pantanal (Brazilian wetlands) eco-tourism and accommodation experience. Imported from Figma design. Built with React, Express, TypeScript, and Tailwind CSS.

## Recent Changes
- 2026-02-09: Refined mobile responsive layout across all 12 sections to match Figma 390px specs:
  - Global: px-5 (20px) horizontal padding, gap-12 mobile vertical gaps, lg:px-10 desktop padding
  - Hero: 844px mobile height with video background
  - Manifesto: Left-aligned text on mobile, centered on md+
  - Sobre nós: 464px mobile image height, feature separators with borders
  - Nossos serviços: 464px card heights, shadcn Button for card actions
  - Stats: Centered 2x2 grid on mobile
  - Acomodações: 868px mobile height, bottom-aligned content
  - Testimonials: 310px cards, 32px padding, horizontal scroll
  - Nosso impacto: 464px image, py-8 text padding
  - FAQ: Hidden numbers on mobile, body-md answer text
  - Blog: Horizontal scroll with 350px cards, 22px title font
  - CTA: 844px fixed height mobile, full-width button
  - Footer: Simplified mobile nav with chevron buttons
- 2026-02-09: Added fully responsive design across all 12 section components (mobile 390px, tablet 768px, desktop 1024px+) with mobile-first Tailwind breakpoints, responsive CSS typography variables, hamburger menu for mobile/tablet, and scrollbar-hide utility
- 2025-02-09: Initial Figma import and migration to Replit environment

## Project Architecture
- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui components
- **Backend**: Express.js server with TypeScript
- **Routing**: wouter (client-side), Express (server-side API)
- **Styling**: Tailwind CSS v3 with custom CSS variables for Figma design tokens
- **Build**: Vite for frontend, esbuild for server bundle
- **Fonts**: Playfair Display, Lato (via Google Fonts)

## Structure
```
client/          - React frontend
  src/
    pages/       - Page components
      sections/  - Section components for the landing page
    components/  - shadcn/ui components
    lib/         - Utilities and query client
    hooks/       - Custom React hooks
  public/
    figmaAssets/ - SVG and image assets from Figma
server/          - Express backend
shared/          - Shared schemas (Drizzle ORM)
```

## Key Commands
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run start` - Run production build

## User Preferences
- Language: Portuguese (Brazilian) - website content is in pt-BR
