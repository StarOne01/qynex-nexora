# Qynex Nexora

A tech community website for developers, designers, and creators built with Next.js.

## Overview

Qynex Nexora is a website showcasing community members, mentors, and team structure with a modern, animated interface. The site features:

- Team profiles with images and descriptions
- Smooth scroll-snapping navigation
- Dynamic section highlighting
- Responsive design for mobile and desktop
- Animated content with AOS (Animate On Scroll)

## Tech Stack

- [Next.js 15.1.3](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- Google Fonts (Do Hyeon, Bungee Hairline, Geist)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- app - Next.js app router components and pages
- data - Database file with team member information
- public - Static assets including team member images
- tailwind.config.ts - Tailwind configuration
- next.config.ts - Next.js configuration

## Deployment

The site is configured for deployment with GitHub Pages via GitHub Actions workflow. The workflow automatically builds and deploys the site when changes are pushed to the main branch.

For manual deployment, you can build the project using:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Contributing

To join the Qynex Nexora community, visit the link on the website or fill out the [join form](https://forms.gle/GnBfHefs5kmLZceR6).

For code contributions:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request