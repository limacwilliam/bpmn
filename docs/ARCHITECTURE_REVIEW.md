# Architecture Review - Stabilization Pass

## Executive Summary

The project has a solid enterprise-oriented shape: App Router routes are grouped by operational module, domain components are separated by experience, and the mock operational data layer is now rich enough to support leadership demos. The main architectural risk was sprint-layer accumulation: duplicated navigation metadata, duplicated sparkline calculation, a placeholder root route, and documentation that described future APIs as if they already existed.

This pass preserves the product and refactors only stabilization points.

## Findings

### Folder Structure

- `app/admin/*` is consistent with the product modules and should remain the primary routing boundary.
- `components/dashboard`, `components/presentation`, `components/bpmn`, `components/ai`, and `components/process` are useful domain boundaries.
- `components/dashboard/Header.tsx` and `Sidebar.tsx` are shell components living in the dashboard folder. This is acceptable for now, but they should move to `components/layout` if the admin shell grows.

### Component Organization

- Dashboard and presentation components intentionally share names like `BottleneckHeatmap`, but they serve different density and storytelling contexts. They are not safe to merge yet.
- `MetricCard` and `ExecutiveKPICard` duplicated sparkline path logic. That logic now lives in `lib/sparkline.ts`.
- Navigation metadata was embedded inside `Sidebar` while route names were embedded inside `Header`. Both now consume `config/navigation.ts`.

### Routing Consistency

- `/admin` already redirected to `/admin/dashboard`.
- `/` still showed the default Next.js starter page. It now redirects to `/admin/dashboard`.
- Chromeless route behavior for `/admin/presentation` is now centralized in `config/navigation.ts`.
- Presentation slide hash links are supported by initial state derivation in `PresentationClient`.

### State Management

- Current state is local and appropriate:
  - Sidebar collapsed state in admin layout.
  - Dashboard tab state in `DashboardClient`.
  - Presentation slide and mode state in `PresentationClient`.
- No global store is needed yet. Adding one now would be overengineering.

### Design Consistency

- HIT visual language is broadly consistent: charcoal, accent orange, warm neutrals, dense enterprise layout.
- The new `/admin/demo` route follows the same system and acts as a leadership-safe control center.
- Root page now avoids breaking design perception by removing the starter screen.

### Data and Documentation

- Demo data is centralized enough for presentation safety, but split correctly by view model:
  - enterprise source data
  - dashboard aggregates
  - presentation story
  - leadership demo flow
- `docs/SYSTEM_ARCHITECTURE.md` was updated to describe the actual current architecture instead of aspirational API/backend capabilities.

## Changes Made

- Added `config/navigation.ts` for sidebar groups, route names and chromeless route config.
- Updated `Header` and `Sidebar` to consume shared navigation config.
- Added `lib/sparkline.ts` and reused it in dashboard metric cards.
- Replaced the default root page with a product redirect.
- Updated presentation hash handling to initialize cleanly without effect-driven state correction.
- Updated system architecture documentation.

## Remaining Technical Debt

- ESLint still reports generated unused-import warnings in older modules. They do not break build, but should be cleaned in a separate mechanical pass.
- Shell components can be moved from `components/dashboard` to `components/layout` later. This was not done now to avoid broad import churn.
- Some mock data still lives under component folders (`components/ai/mockData.ts`, `components/bpmn/mockData.ts`). It is stable but should eventually move under `lib` if reused across modules.
