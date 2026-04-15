# MatLoc Indus — Claude Code Rules

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui v4 (Base UI) + next-intl v4
- `proxy.ts` = middleware (Next.js 16 convention, exports `proxy()` function)
- No `tailwind.config.ts` — theme is in `app/globals.css` via `@theme inline`

## i18n Rules — ALWAYS FOLLOW

**Every user-facing string must be translated. No exceptions.**

1. **Never hardcode text** in components. All labels, CTAs, placeholders, error messages, and UI copy must use `useTranslations()` (client) or `getTranslations()` (server).

2. **Namespace convention**: group by feature, not component.
   - `common` — shared CTAs, loading states
   - `nav` — navigation labels
   - `home` — homepage sections
   - `simulator` — energy simulator (modal + section)
   - `forms` — form labels, validation messages, success/error states
   - `footer` — footer content

3. **When adding a new feature**, update ALL 6 message files simultaneously:
   `messages/fr.json`, `messages/en.json`, `messages/de.json`,
   `messages/es.json`, `messages/nl.json`, `messages/zh.json`

4. **FR is the source of truth**. Write French first, then translate.

5. **Client components**: use `useTranslations('namespace')`
   **Server components**: use `await getTranslations({ locale, namespace: 'namespace' })`

6. **Locale-aware navigation**: always import `Link`, `useRouter`, `usePathname`
   from `@/lib/i18n/navigation` — NOT from `next/navigation` or `next-intl`.

7. **Dynamic locale in URLs**: use `useLocale()` to build paths like `/${locale}/devis`.

8. **`t()` interpolation**: use ICU syntax — `t('key', { name: 'Jean' })` → `"Hello {name}"`

## shadcn/ui v4 (Base UI) — NOT Radix UI
- `asChild` does NOT exist on Button, Sheet, DropdownMenuTrigger
- Use plain `<Link>` or `<a>` with manual `className` for navigation buttons
- `buttonVariants` → `import { buttonVariants } from '@/components/ui/button'`

## Design System
- Primary dark: `bg-midnight` / `text-midnight` (`#0F1923`)
- Accent: `text-[var(--amber)]` / `bg-[var(--amber)]` (`#E8881F`)
- Surface: `bg-surface` (`#F4F5F7`)
- Utility: `.container-site`, `.section-padding`, `.section-padding-sm`

## Mobile-first
- All components must work on 320px+ screens
- Modals: `max-h-[90dvh] overflow-y-auto` to handle mobile viewport
- Grids: start 1-col, expand with `sm:` or `lg:` prefixes
- Touch targets: minimum 44px height for interactive elements
