# Itaicy Website

## Overview
A website for Itaicy, a Pantanal (Brazilian wetlands) eco-tourism and accommodation experience. Imported from Figma design. Built with React, Express, TypeScript, and Tailwind CSS.

## Recent Changes
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
