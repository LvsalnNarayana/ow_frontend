# AGENT.md - Development Guidelines for One World Frontend

## Build/Test/Lint Commands
- `npm run dev` - Start development server on port 4800
- `npm run build` - Build production bundle (TypeScript check + Vite build)
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build
- **No test commands configured** - tests need to be added

## Architecture & Structure
- **Tech Stack**: React 19 + TypeScript + Vite + Material-UI (MUI)
- **Main directories**: `/src/pages/` (page components), `/src/components/` (shared components), `/src/socialMedia/` (social media features), `/src/types/` (TypeScript definitions)
- **Key features**: Feed dashboard, posts, stories, chat, calendar, meetings, user profiles
- **No backend/database integration** - currently uses mock data and scripts in `/src/scripts/`

## Code Style & Conventions
- **TypeScript**: Strict types required, explicit module boundary types enforced
- **Imports**: Sorted alphabetically (enforced by ESLint), use absolute paths from `src/`
- **Components**: Functional components with hooks, interface definitions for all props
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for file names
- **MUI**: Use MUI components consistently, follow Material Design patterns
- **State**: React hooks for local state, no Redux/context currently implemented
- **Files**: `.tsx` for components, `.ts` for utilities/types, organize by feature domains
- **Error handling**: Use TypeScript strict boolean expressions, handle optional chaining properly
