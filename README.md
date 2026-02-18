# Allocation - House Rental Platform

A house rental platform targeting Tunisians living abroad to rent summer houses in Tunisia.
Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Clerk** authentication.

## Features

- **Welcome page** with hero carousel of recommended houses
- **House cards** showing: admin number, house picture, call button, rooms, price/night
- **House detail page** with image carousel, rooms, living room, kitchen, price/night
- **Admin dashboard** to manage house listings (CRUD)
- **Admin-only details**: location, owner name, owner number (visible only in dashboard)
- **Cash-only payments** — targeting Tunisians abroad
- **SEO optimized** with keywords: rental house tunisia summer
- **Clerk authentication** for user management
- **MongoDB** with Mongoose for data persistence

## Color Palette

- `#DDE3EA` — Light blue-gray
- `#4FC3E7` — Sky blue
- `#ACC8A2` — Soft sage
- `#1A2517` — Deep olive

## Getting Started

1. Clone the repository
2. Copy `.env.local` and add your Clerk + MongoDB credentials
3. Install dependencies and run:

```bash
npm install
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
