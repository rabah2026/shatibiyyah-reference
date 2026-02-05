# Shatibiyyah Companion (Web)

## Setup

This project uses Next.js 15 + Tailwind CSS v4.

### Prerequisites

- Node.js 18+
- npm or pnpm

### Configuration

Create a `.env.local` file in this directory (`web/`):

```bash
NEXT_PUBLIC_API_URL=http://localhost:5173
```

This URL should point to the running Vite server (`shatibiyyah-reference` root) which provides the API.

### Installation

```bash
npm install
```

### Running

To run the Next.js frontend:

```bash
npm run dev
```

To run the API server (required for data):

```bash
# In the root directory (../)
npm run dev
```

## Features (MVP)

- **Browse**: List of all bayts.
- **Search**: Search bayts by text.
- **Bayt Details**: View bayt text.
- **Settings**: Font size and theme persistence (localStorage).
- **RTL**: Native Arabic layout.

## Project Structure

- `app/`: App Router pages.
- `components/`: UI components.
- `lib/api.ts`: API client (fetch wrapper for tRPC).
- `lib/types.ts`: Zod schemas and TypeScript types.
