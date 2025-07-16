# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an invoice management system built with Next.js 15, React 19, and Tailwind CSS. The application is designed to streamline billing processes for office administrators and finance managers, providing features for customer management, invoice creation, payment tracking, and financial reporting.

## Tech Stack

- **Framework**: Next.js 15.4.1 with App Router
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full TypeScript support
- **Runtime**: Bun (lockfile present)
- **Fonts**: Geist Sans and Geist Mono (Google Fonts)

## Development Commands

```bash
# Start development server
bun dev
# or
npm run dev

# Build for production
bun run build
# or
npm run build

# Start production server
bun start
# or
npm start

# Run linting
bun run lint
# or
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts and global styles
│   ├── page.tsx        # Homepage component
│   ├── globals.css     # Global styles and Tailwind imports
│   └── favicon.ico     # App icon
```

## Key Configuration Files

- **next.config.ts**: Next.js configuration (currently minimal)
- **tsconfig.json**: TypeScript configuration with path aliases (`@/*` → `./src/*`)
- **eslint.config.mjs**: ESLint configuration using Next.js recommended rules
- **postcss.config.mjs**: PostCSS configuration for Tailwind CSS v4
- **PRD.md**: Comprehensive product requirements document outlining all features and requirements

## Development Notes

- The project uses the Next.js App Router architecture
- Tailwind CSS v4 is configured with PostCSS
- Path aliases are set up: `@/*` maps to `./src/*`
- The project follows Next.js TypeScript best practices
- Global styles use CSS custom properties for theme variables
- Dark mode is supported via `prefers-color-scheme`

## Key Features to Implement

Based on the PRD, the system should include:

1. **Customer Management**: Database, profiles, search, categorization
2. **Invoice Creation**: Templates, line items, calculations, numbering
3. **Payment Terms**: Flexible terms, tracking, discounts
4. **Invoice Delivery**: Email integration, PDF generation
5. **Payment Tracking**: Recording, status indicators, history
6. **Automated Reminders**: Email reminders, escalation workflows
7. **Reporting**: Dashboard, financial reports, analytics
8. **Tax Management**: Calculations, rates, reporting

## Target Architecture

The project follows a comprehensive structure outlined in `structure.md` with:

### App Router Structure
- Route groups for authentication `(auth)` and dashboard `(dashboard)`
- Nested routes for customers, invoices, payments, reports, reminders, templates, settings
- Complete API routes structure under `/api`

### Component Architecture
- **UI Components**: shadcn/ui components in `/components/ui/`
- **Layout Components**: Header, sidebar, navigation in `/components/layout/`
- **Form Components**: Feature-specific forms in `/components/forms/`
- **Feature Components**: Domain-specific components organized by feature in `/components/features/`
- **Common Components**: Reusable components in `/components/common/`

### Services Layer
- Business logic organized by domain (auth, customer, invoice, payment, etc.)
- Each service handles CRUD operations, validation, and integrations
- Separate services for reporting, reminders, taxes, templates

### Supporting Structure
- **Types**: TypeScript definitions organized by domain
- **Hooks**: Custom React hooks for data fetching and state management
- **Utils**: Utility functions for formatting, validation, calculations
- **Constants**: Application constants organized by category
- **Lib**: Core utilities and configurations (auth, db, validations)

### Database & Testing
- Prisma schema with migrations in `/prisma/`
- Comprehensive test structure mirroring the component/service architecture
- Database seeding for development

## Current State

**Phase 1 Complete ✅** - Foundation & Setup:
- **Database**: Prisma configured with SQLite, schema created for customers/invoices/payments
- **UI Components**: shadcn/ui installed (button, card, input, label, table, form, dialog, badge)
- **Layout**: Header and sidebar navigation implemented
- **Routing**: Main pages created (dashboard, customers, invoices, payments, reports)
- **Build**: Application builds successfully, linting passes

**Phase 2 In Progress 🔄** - Core Features:
- ✅ Customer management CRUD operations (Complete)
- ✅ DRY principle implementation with service/repository layers
- ✅ Security headers and environment validation
- 🔄 Invoice creation with line items (Next)
- 🔄 Payment tracking (Next)

**Development Progress**: See `todo.md` for detailed task tracking

The application has a professional interface with working navigation. Database schema is ready, and the foundation is solid for building core features.