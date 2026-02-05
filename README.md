# Chatbot Frontend

A modern React-based chatbot interface connected to a FastAPI backend with Supabase authentication and storage.

## Tech Stack

- **React 18** - UI library with hooks and functional components
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Animation library for smooth UI transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Supabase** - Authentication and database
- **CSS Modules** - Scoped styling

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Chat/         # Chat-related components
│   ├── Sidebar/      # Conversation history sidebar
│   └── Auth/         # Authentication forms
├── pages/            # Page components (full screens)
├── hooks/            # Custom React hooks
├── context/          # React Context providers (global state)
├── services/         # API clients (FastAPI, Supabase)
├── utils/            # Helper functions
└── assets/           # Static assets (icons, images)
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_API_BASE_URL` - Your FastAPI backend URL (default: http://localhost:8000)

### 3. Run development server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Development Guidelines

### Component Structure

Each component follows this structure:

```
ComponentName/
├── index.jsx                    # Component logic
└── ComponentName.module.css     # Scoped styles
```

### Import Aliases

The project uses path aliases for cleaner imports:

```javascript
import Component from '@components/Component'
import { useAuth } from '@hooks/useAuth'
import { supabase } from '@services/supabase'
```

Available aliases:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@hooks/` → `src/hooks/`
- `@context/` → `src/context/`
- `@services/` → `src/services/`
- `@utils/` → `src/utils/`
- `@assets/` → `src/assets/`

### State Management

- **Local state**: `useState` for component-specific state
- **Global state**: Context API for auth and chat state
- **Custom hooks**: Encapsulate reusable logic and side effects

### Styling

- CSS Modules for component-specific styles
- Global styles in `index.css`
- Minimal custom CSS approach (no heavy UI frameworks)

## Architecture Decisions

### Why Vite?

Vite provides faster development experience compared to traditional bundlers:
- Instant server start
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds
- Native ES modules support

### Why Context API?

For a chat application, Context API provides sufficient state management without the complexity of Redux:
- Auth state shared across the app
- Current conversation state accessible to chat components
- No props drilling through component hierarchy

### Why Framer Motion?

Animations in a chatbot improve UX and communicate system state:
- Messages appearing smoothly enhances readability
- Typing indicators show the bot is "thinking"
- Transitions between conversations reduce cognitive load

### API Communication Pattern

The app uses Axios with interceptors for:
- **Request interceptor**: Automatically adds JWT token to requests
- **Response interceptor**: Handles common errors (401, network issues)
- **Centralized error handling**: Consistent error messages across the app

## Next Steps

1. Set up Supabase authentication tables
2. Implement AuthContext for login/register
3. Build chat components (MessageList, Message, ChatInput)
4. Connect to FastAPI backend endpoints
5. Add conversation history management
6. Implement animations with Framer Motion

## License

MIT
