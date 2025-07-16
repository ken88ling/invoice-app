# Invoice System - Next.js Project Structure (shadcn/ui + Tailwind)

## Root Directory Structure

```
invoice-system/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json            # shadcn/ui config
├── .env.local
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── docs/
│   ├── api/
│   ├── deployment/
│   └── user-guide/
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── middleware.ts
│   └── constants/
├── public/
│   ├── assets/
│   ├── templates/
│   └── uploads/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── __mocks__/
│   ├── components/
│   ├── services/
│   └── utils/
└── scripts/
    ├── build/
    ├── deploy/
    └── maintenance/
```

## Detailed Structure

### `/src` - Source Code

#### `/src/app` - Next.js App Router Structure

```
app/
├── globals.css
├── layout.tsx                  # Root layout with providers
├── page.tsx                    # Home/Dashboard page
├── loading.tsx                 # Global loading UI
├── error.tsx                   # Global error UI
├── not-found.tsx               # 404 page
├── (auth)/                     # Auth route group
│   ├── login/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── register/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── layout.tsx              # Auth layout
├── (dashboard)/                # Dashboard route group
│   ├── layout.tsx              # Dashboard layout with sidebar
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── customers/
│   │   ├── page.tsx            # Customer list
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Customer detail
│   │   │   └── edit/
│   │   │       └── page.tsx    # Edit customer
│   │   ├── new/
│   │   │   └── page.tsx        # New customer
│   │   └── loading.tsx
│   ├── invoices/
│   │   ├── page.tsx            # Invoice list
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Invoice detail
│   │   │   ├── edit/
│   │   │   │   └── page.tsx    # Edit invoice
│   │   │   └── preview/
│   │   │       └── page.tsx    # Invoice preview
│   │   ├── new/
│   │   │   └── page.tsx        # New invoice
│   │   └── loading.tsx
│   ├── payments/
│   │   ├── page.tsx            # Payment list
│   │   ├── [id]/
│   │   │   └── page.tsx        # Payment detail
│   │   ├── new/
│   │   │   └── page.tsx        # Record payment
│   │   └── loading.tsx
│   ├── reports/
│   │   ├── page.tsx            # Reports dashboard
│   │   ├── aging/
│   │   │   └── page.tsx        # Aging report
│   │   ├── payments/
│   │   │   └── page.tsx        # Payment report
│   │   └── financial/
│   │       └── page.tsx        # Financial report
│   ├── reminders/
│   │   ├── page.tsx            # Reminder management
│   │   ├── templates/
│   │   │   └── page.tsx        # Reminder templates
│   │   └── schedule/
│   │       └── page.tsx        # Reminder scheduling
│   ├── templates/
│   │   ├── page.tsx            # Template management
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Template detail
│   │   │   └── edit/
│   │   │       └── page.tsx    # Edit template
│   │   └── new/
│   │       └── page.tsx        # New template
│   ├── settings/
│   │   ├── page.tsx            # Settings dashboard
│   │   ├── users/
│   │   │   └── page.tsx        # User management
│   │   ├── taxes/
│   │   │   └── page.tsx        # Tax settings
│   │   ├── payment-terms/
│   │   │   └── page.tsx        # Payment terms
│   │   └── integrations/
│   │       └── page.tsx        # Third-party integrations
│   └── profile/
│       └── page.tsx            # User profile
└── api/                        # API Routes
    ├── auth/
    │   ├── login/
    │   │   └── route.ts
    │   ├── register/
    │   │   └── route.ts
    │   ├── logout/
    │   │   └── route.ts
    │   └── refresh/
    │       └── route.ts
    ├── customers/
    │   ├── route.ts
    │   ├── [id]/
    │   │   ├── route.ts
    │   │   └── invoices/
    │   │       └── route.ts
    │   ├── search/
    │   │   └── route.ts
    │   └── analytics/
    │       └── route.ts
    ├── invoices/
    │   ├── route.ts
    │   ├── [id]/
    │   │   ├── route.ts
    │   │   ├── pdf/
    │   │   │   └── route.ts
    │   │   ├── send/
    │   │   │   └── route.ts
    │   │   └── duplicate/
    │   │       └── route.ts
    │   ├── draft/
    │   │   └── route.ts
    │   └── overdue/
    │       └── route.ts
    ├── payments/
    │   ├── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   ├── reconcile/
    │   │   └── route.ts
    │   └── methods/
    │       └── route.ts
    ├── reports/
    │   ├── dashboard/
    │   │   └── route.ts
    │   ├── aging/
    │   │   └── route.ts
    │   ├── payments/
    │   │   └── route.ts
    │   ├── financial/
    │   │   └── route.ts
    │   └── export/
    │       └── route.ts
    ├── reminders/
    │   ├── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   ├── send/
    │   │   └── route.ts
    │   └── schedule/
    │       └── route.ts
    ├── templates/
    │   ├── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   └── preview/
    │       └── route.ts
    ├── taxes/
    │   ├── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   ├── calculate/
    │   │   └── route.ts
    │   └── rates/
    │       └── route.ts
    ├── users/
    │   ├── route.ts
    │   ├── [id]/
    │   │   └── route.ts
    │   ├── profile/
    │   │   └── route.ts
    │   └── permissions/
    │       └── route.ts
    └── upload/
        └── route.ts
```

#### `/src/components` - shadcn/ui Components Structure

```
components/
├── ui/                         # shadcn/ui components
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── alert-dialog.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── command.tsx
│   ├── context-menu.tsx
│   ├── data-table.tsx
│   ├── date-picker.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── hover-card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── loading.tsx
│   ├── menubar.tsx
│   ├── navigation-menu.tsx
│   ├── popover.tsx
│   ├── progress.tsx
│   ├── radio-group.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   ├── slider.tsx
│   ├── switch.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   ├── toggle.tsx
│   ├── tooltip.tsx
│   └── use-toast.ts
├── layout/                     # Layout components
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── main-nav.tsx
│   ├── user-nav.tsx
│   ├── breadcrumb.tsx
│   ├── page-header.tsx
│   └── theme-toggle.tsx
├── forms/                      # Form components
│   ├── customer-form.tsx
│   ├── invoice-form.tsx
│   ├── payment-form.tsx
│   ├── reminder-form.tsx
│   ├── template-form.tsx
│   ├── tax-form.tsx
│   ├── user-form.tsx
│   └── auth-form.tsx
├── features/                   # Feature-specific components
│   ├── customers/
│   │   ├── customer-list.tsx
│   │   ├── customer-card.tsx
│   │   ├── customer-search.tsx
│   │   ├── customer-stats.tsx
│   │   ├── customer-details.tsx
│   │   └── customer-analytics.tsx
│   ├── invoices/
│   │   ├── invoice-list.tsx
│   │   ├── invoice-card.tsx
│   │   ├── invoice-preview.tsx
│   │   ├── invoice-status.tsx
│   │   ├── invoice-line-items.tsx
│   │   ├── invoice-summary.tsx
│   │   ├── invoice-actions.tsx
│   │   └── invoice-filters.tsx
│   ├── payments/
│   │   ├── payment-list.tsx
│   │   ├── payment-card.tsx
│   │   ├── payment-status.tsx
│   │   ├── payment-history.tsx
│   │   ├── payment-methods.tsx
│   │   └── payment-reconciliation.tsx
│   ├── reports/
│   │   ├── dashboard-stats.tsx
│   │   ├── aging-report.tsx
│   │   ├── payment-report.tsx
│   │   ├── financial-report.tsx
│   │   ├── report-filters.tsx
│   │   ├── report-charts.tsx
│   │   └── report-export.tsx
│   ├── reminders/
│   │   ├── reminder-list.tsx
│   │   ├── reminder-card.tsx
│   │   ├── reminder-schedule.tsx
│   │   ├── reminder-templates.tsx
│   │   └── reminder-history.tsx
│   ├── templates/
│   │   ├── template-list.tsx
│   │   ├── template-card.tsx
│   │   ├── template-editor.tsx
│   │   ├── template-preview.tsx
│   │   └── template-selector.tsx
│   ├── taxes/
│   │   ├── tax-list.tsx
│   │   ├── tax-card.tsx
│   │   ├── tax-calculator.tsx
│   │   └── tax-rates.tsx
│   └── users/
│       ├── user-list.tsx
│       ├── user-card.tsx
│       ├── user-profile.tsx
│       ├── user-permissions.tsx
│       └── user-activity.tsx
├── common/                     # Common components
│   ├── data-table.tsx
│   ├── search-input.tsx
│   ├── date-range-picker.tsx
│   ├── file-upload.tsx
│   ├── export-button.tsx
│   ├── status-badge.tsx
│   ├── currency-input.tsx
│   ├── percentage-input.tsx
│   ├── pagination.tsx
│   ├── empty-state.tsx
│   ├── loading-skeleton.tsx
│   ├── confirmation-dialog.tsx
│   └── error-boundary.tsx
└── providers/                  # Context providers
    ├── theme-provider.tsx
    ├── auth-provider.tsx
    ├── query-provider.tsx
    └── toast-provider.tsx
```

#### `/src/services` - Business Logic Services

```
services/
├── auth/
│   ├── auth-service.ts         # Authentication logic
│   ├── token-service.ts        # JWT token management
│   ├── session-service.ts      # Session management
│   └── permission-service.ts   # Role-based permissions
├── customer/
│   ├── customer-service.ts     # Customer CRUD operations
│   ├── customer-search-service.ts # Search functionality
│   ├── customer-analytics-service.ts # Analytics
│   └── customer-validation-service.ts # Validation
├── invoice/
│   ├── invoice-service.ts      # Invoice CRUD operations
│   ├── invoice-calculation-service.ts # Calculations
│   ├── invoice-pdf-service.ts  # PDF generation
│   ├── invoice-email-service.ts # Email delivery
│   ├── invoice-template-service.ts # Template rendering
│   └── invoice-validation-service.ts # Validation
├── payment/
│   ├── payment-service.ts      # Payment operations
│   ├── payment-tracking-service.ts # Status tracking
│   ├── payment-reconciliation-service.ts # Reconciliation
│   ├── payment-term-service.ts # Payment terms
│   └── payment-gateway-service.ts # Gateway integration
├── reporting/
│   ├── dashboard-service.ts    # Dashboard data
│   ├── report-service.ts       # Report generation
│   ├── analytics-service.ts    # Analytics
│   ├── export-service.ts       # Data export
│   └── chart-service.ts        # Chart data
├── reminder/
│   ├── reminder-service.ts     # Reminder operations
│   ├── reminder-scheduler-service.ts # Scheduling
│   ├── reminder-template-service.ts # Templates
│   └── reminder-delivery-service.ts # Delivery
├── tax/
│   ├── tax-service.ts          # Tax operations
│   ├── tax-calculation-service.ts # Calculations
│   ├── tax-rate-service.ts     # Rate management
│   └── tax-report-service.ts   # Tax reporting
├── template/
│   ├── template-service.ts     # Template operations
│   ├── template-render-service.ts # Rendering
│   └── template-validation-service.ts # Validation
├── notification/
│   ├── email-service.ts        # Email notifications
│   ├── notification-service.ts # General notifications
│   └── notification-queue-service.ts # Queue management
├── integration/
│   ├── accounting-service.ts   # Accounting integration
│   ├── crm-service.ts         # CRM integration
│   ├── bank-service.ts        # Bank integration
│   └── webhook-service.ts     # Webhook handling
└── file/
    ├── file-upload-service.ts  # File upload
    ├── file-storage-service.ts # File storage
    └── file-validation-service.ts # File validation
```

#### `/src/lib` - Utilities and Configuration

```
lib/
├── auth.ts                     # Auth configuration (NextAuth.js)
├── db.ts                       # Database connection (Prisma)
├── validations.ts              # Zod schemas
├── utils.ts                    # Utility functions (cn, etc.)
├── constants.ts                # App constants
├── config.ts                   # App configuration
├── email.ts                    # Email configuration
├── pdf.ts                      # PDF generation utilities
├── encryption.ts               # Encryption utilities
├── date.ts                     # Date utilities
├── currency.ts                 # Currency utilities
├── permissions.ts              # Permission utilities
└── api.ts                      # API utilities
```

#### `/src/hooks` - Custom React Hooks

```
hooks/
├── use-auth.ts                 # Authentication hook
├── use-customers.ts            # Customer data hook
├── use-invoices.ts             # Invoice data hook
├── use-payments.ts             # Payment data hook
├── use-reports.ts              # Reports data hook
├── use-reminders.ts            # Reminders hook
├── use-templates.ts            # Templates hook
├── use-taxes.ts                # Tax data hook
├── use-users.ts                # User data hook
├── use-debounce.ts             # Debounce hook
├── use-local-storage.ts        # Local storage hook
├── use-pagination.ts           # Pagination hook
└── use-filters.ts              # Filters hook
```

#### `/src/types` - TypeScript Types

```
types/
├── auth.ts                     # Authentication types
├── customer.ts                 # Customer types
├── invoice.ts                  # Invoice types
├── payment.ts                  # Payment types
├── report.ts                   # Report types
├── reminder.ts                 # Reminder types
├── template.ts                 # Template types
├── tax.ts                      # Tax types
├── user.ts                     # User types
├── api.ts                      # API response types
├── common.ts                   # Common types
└── index.ts                    # Type exports
```

#### `/src/utils` - Utility Functions

```
utils/
├── cn.ts                       # Class name utility (clsx + tailwind-merge)
├── formatters.ts               # Data formatters
├── validators.ts               # Validation utilities
├── calculations.ts             # Mathematical calculations
├── date-utils.ts               # Date utilities
├── currency-utils.ts           # Currency utilities
├── string-utils.ts             # String utilities
├── array-utils.ts              # Array utilities
├── object-utils.ts             # Object utilities
└── api-utils.ts                # API utilities
```

#### `/src/constants` - Application Constants

```
constants/
├── app.ts                      # App constants
├── routes.ts                   # Route constants
├── permissions.ts              # Permission constants
├── status.ts                   # Status constants
├── payment-terms.ts            # Payment term constants
├── tax-rates.ts                # Tax rate constants
└── themes.ts                   # Theme constants
```

### `/public` - Static Assets

```
public/
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── favicon.ico
│   │   └── placeholder.png
│   └── icons/
│       ├── invoice.svg
│       ├── payment.svg
│       └── customer.svg
├── templates/
│   ├── invoices/
│   │   ├── default.html
│   │   ├── professional.html
│   │   └── minimal.html
│   └── emails/
│       ├── invoice-sent.html
│       ├── payment-reminder.html
│       └── payment-received.html
└── uploads/
    ├── invoices/
    ├── attachments/
    └── temp/
```

### `/prisma` - Database Schema

```
prisma/
├── schema.prisma              # Prisma schema
├── migrations/
│   ├── 20240101000000_init/
│   ├── 20240102000000_add_customers/
│   ├── 20240103000000_add_invoices/
│   ├── 20240104000000_add_payments/
│   └── 20240105000000_add_reminders/
└── seed.ts                    # Database seeding
```

### `/tests` - Testing Structure

```
tests/
├── __mocks__/
│   ├── prisma.ts
│   └── next-auth.ts
├── components/
│   ├── ui/
│   ├── forms/
│   └── features/
├── services/
│   ├── auth/
│   ├── customer/
│   └── invoice/
├── utils/
│   ├── formatters.test.ts
│   └── validators.test.ts
├── setup.ts
└── jest.config.js
```

## Key Configuration Files

### Root Level Files

- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration with shadcn/ui
- `next.config.js` - Next.js configuration
- `middleware.ts` - Next.js middleware for auth/routing
- `prisma/schema.prisma` - Database schema
