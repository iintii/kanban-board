# Kanban Board - Real-time Collaborative Task Management

A modern Kanban board built with Next.js, TypeScript, and Nhost backend with real-time synchronization across multiple users.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Nhost (PostgreSQL + Hasura GraphQL + Auth)
- **Real-time**: GraphQL Subscriptions
- **Drag & Drop**: @hello-pangea/dnd

## Project Structure

```
app/
├── layout.tsx              # App-wide providers
├── page.tsx               # Landing redirect to /boards
├── providers.tsx          # Nhost auth + Apollo providers
└── boards/
    ├── page.tsx          # All boards list
    └── [boardId]/
        └── page.tsx      # Individual board view

components/
├── AuthWrapper.tsx        # Auth state checker
├── LoginForm.tsx         # Login/signup UI
├── BoardSelector.tsx     # Board navigation dropdown
├── Card.tsx              # Individual card component
├── Column.tsx            # Column with filtered cards
└── AddCardForm.tsx       # New card creation

lib/
├── nhost.ts              # Nhost client config
└── queries.ts            # GraphQL operations
```

## Core Data Flow

### 1. Authentication
```
App loads → Providers wrap app → AuthWrapper checks auth → Show LoginForm OR protected content
```

### 2. Data Rendering
```
page.tsx → useSubscription(SUBSCRIBE_CARDS) → Column filters cards → Card displays data
```

### 3. CRUD Operations
```
Form submit → useMutation → Database update → Subscription pushes changes → UI re-renders
```

### 4. Drag & Drop
```
User drags card → onDragEnd calculates position → updateCard mutation → Database sync → All clients update
```

## Key Components

### Data Management
- **GraphQL Subscriptions**: Real-time data sync via `SUBSCRIBE_BOARDS`, `SUBSCRIBE_COLUMNS`, `SUBSCRIBE_CARDS`
- **Optimistic Updates**: Instant UI feedback with `setLocalCards()` before database confirmation
- **Position System**: Float-based positioning (10.0, 20.0, 30.0) allows infinite precision between cards

### Authentication
- **Nhost Auth**: Email/password authentication with JWT tokens
- **Protected Routes**: `AuthWrapper` component guards all board content
- **Automatic Headers**: Apollo client adds JWT to all GraphQL requests

### Multi-Board Support
- **Dynamic Routes**: `/boards/[boardId]` structure for individual boards
- **Board Filtering**: All queries scoped by `boardId` variable
- **Navigation**: `BoardSelector` dropdown for switching between boards

## Environment Setup

```env
NEXT_PUBLIC_NHOST_SUBDOMAIN=your-subdomain
NEXT_PUBLIC_NHOST_REGION=your-region
```

## Database Schema

```sql
boards (id, title, created_at)
columns (id, title, board_id, position)
cards (id, title, description, column_id, board_id, position)
```

## Key Features

- ✅ Real-time collaboration
- ✅ Drag & drop card reordering
- ✅ Multi-board support
- ✅ User authentication
- ✅ Responsive design
- ✅ Optimistic UI updates
- ✅ Cross-browser compatibility

## Getting Started

1. **Clone & Install**
   ```bash
   git clone <repo>
   npm install
   ```

2. **Setup Nhost**
   - Create Nhost project
   - Add environment variables
   - Import database schema

3. **Run Development**
   ```bash
   npm run dev
   ```

## GraphQL Operations

| Operation | Purpose | Variables |
|-----------|---------|-----------|
| `SUBSCRIBE_BOARDS` | List all boards | - |
| `SUBSCRIBE_COLUMNS` | Get board columns | `boardId` |
| `SUBSCRIBE_CARDS` | Get board cards | `boardId` |
| `INSERT_CARD` | Create new card | `title`, `description`, `columnId`, `boardId` |
| `DELETE_CARD` | Remove card | `cardId` |
| `UPDATE_CARD` | Move/edit card | `cardId`, `columnId`, `position` |

## Performance Notes

- **Local State**: `localCards` provides instant UI feedback
- **Subscription Sync**: `useEffect` syncs database changes to local state
- **Position Algorithm**: Prevents position collisions with float arithmetic
- **Provider Pattern**: Single client instance shared across components

## Architecture Highlights

- **Unidirectional Data Flow**: Database → Subscription → Local State → UI
- **Component Separation**: Data fetching (pages) vs Display (components)
- **Type Safety**: Full TypeScript coverage with GraphQL codegen
- **Error Boundaries**: Graceful handling of network/auth failures
