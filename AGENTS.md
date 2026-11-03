# AI Project Instructions

## Project

Personal portfolio built with Next.js, TypeScript and Tailwind CSS.

## Technology Stack

- Next.js with App Router
- TypeScript (strict mode)
- Tailwind CSS
- Supabase for database and authentication
- GitHub REST API for repository information
- Vitest and React Testing Library for tests
- ESLint and Prettier for code quality
- Vercel for deployment

## Architecture

- `src/app`: pages, layouts and API routes.
- `src/components`: reusable visual components.
- `src/services`: external API communication and integrations.
- `src/hooks`: reusable React hooks.
- `src/types`: shared TypeScript types.
- `src/lib`: shared utilities and configurations.

Keep business logic separate from visual components whenever practical.

## Code Conventions

- Use TypeScript for all application code.
- Use PascalCase for React components.
- Use camelCase for variables and functions.
- Prefix custom hooks with `use`.
- Prefer arrow functions.
- Avoid unnecessary abstractions and dependencies.
- Use explicit types when they improve clarity.
- Keep components small and focused.
- Never use `any` without a justified reason.

## Git Workflow

- `main`: stable and deployable version.
- `develop`: integration branch.
- `feature/*`: individual features.
- Use Conventional Commits:
  - `feat`: new functionality.
  - `fix`: bug fixes.
  - `docs`: documentation.
  - `chore`: maintenance and configuration.
  - `test`: tests.

## AI Behavior

- Explain important implementation decisions.
- Prefer simple, readable and maintainable solutions.
- Do not introduce dependencies without justification.
- Do not modify unrelated files.
- Never invent API responses or claim an integration works without testing it.
- Explain errors and their underlying causes.
- Preserve existing architecture and conventions.
- Ask before making destructive changes.
- Help the developer understand and be able to explain the code.

## Quality Requirements

- Run lint and relevant tests after changes.
- Handle loading, error and empty states for API-driven data.
- Protect private dashboard routes.
- Never expose secrets or commit `.env` files.
- Keep `.env.example` updated.
