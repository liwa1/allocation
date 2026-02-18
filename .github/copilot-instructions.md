# Allocation - House Rental Platform

## Project Overview
A house rental platform targeting Tunisians living abroad to rent summer houses in Tunisia.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, MongoDB, and Clerk authentication.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Auth**: Clerk
- **File Upload**: UploadAnything (placeholder)
- **Color Palette**: #DDE3EA (light blue-gray), #4FC3E7 (sky blue), #ACC8A2 (soft sage), #1A2517 (deep olive)

## Architecture
- `src/models/` - Mongoose models and TypeScript interfaces
- `src/services/` - Business logic (houseService.ts)
- `src/app/api/v1/` - REST API routes
- `src/app/` - Pages (welcome, house detail, dashboard)
- `src/components/` - Reusable UI components

## Key Rules
- Admin-only details: location, owner name, owner number
- Payments are cash-only
- Use `JSON.parse(JSON.stringify(data))` pattern in services for MongoDB serialization
- SEO keywords: rental house tunisia summer
