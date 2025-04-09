# Next.js Components, Server Actions, and General Functions Explained

Next.js utilizes two primary component types: **Server Components** and **Client Components**.

## Component Types

### Server Components (Default)

- Execute **exclusively** on the server side during the rendering process.
- Output is serialized into a React Server Component (RSC) payload and streamed to the browser.
- **Cannot** use client-side hooks (like `useState`, `useEffect`) or browser APIs.
- **Can** directly access server-only resources (databases, file systems, environment variables).

### Client Components (`"use client"`)

- Marked with the `"use client"` directive.
- Rendered initially on the server (SSR/prerender) to generate static HTML.
- "Hydrate" and execute on the client side in the browser.
- **Can** use client-side hooks, manage state, handle user interactions (`onClick`), and access browser APIs.
- **Cannot** directly access server-only resources or APIs.

## Function Types and Execution Context

### Server Actions (`"use server"`)

- Defined in files or functions marked with `"use server"`.
- Specifically designed to handle mutations or server-side logic triggered from the client.
- **Critically, Server Actions always execute exclusively on the server**, even when imported and called from within a Client Component (e.g., inside an event handler or `useEffect`).
- The Client Component acts as the trigger; the actual execution happens securely on the server.
- Can perform `async` operations and access server-only APIs like `cookies()` or database clients.

### General Utility Functions (No Directive)

- These functions (without `"use server"` or `"use client"` at the top of their file) inherit their execution context.
- **If used only in a Server Component:** They run **only on the server**. Can be `async` and access server resources.
- **If used in a Client Component:** They run **both on the server** (during initial SSR/prerendering) **and on the client** (during hydration and interactions). Because they also run on the client, they **cannot** safely contain server-only logic or access server-only APIs (like database connections or `cookies()`). They _can_ perform client-safe `async` operations (like `fetch` to a public API).

## Handling Sensitive Operations (e.g., Database Queries)

- While Client Components can perform `async` operations in `useEffect` (e.g., `fetch('/api/public-data')`), they **must never** attempt sensitive operations like direct database queries or access server-only resources directly.
- Doing so exposes credentials and logic to the browser, creating a major security vulnerability.
- The **correct and secure pattern** for a Client Component to interact with the database or other server resources is to **call a Server Action**. The Server Action executes the sensitive operation safely on the server.

## Server-Only APIs

Certain APIs provided by Next.js (like `cookies()` and `headers()` from `next/headers`) and Node.js (like the `fs` module) are inherently **server-only**. These can only be safely used within **Server Components** or **Server Actions**.

## When to Use Server Actions

Use Server Actions primarily when you need to:

1.  **Perform Data Mutations:** Handle operations like creating, updating, or deleting data in your database, triggered by user interactions in Client Components (e.g., submitting a form, clicking a button).
2.  **Access Server-Only APIs or Resources from Client Components:** Execute logic requiring server-only APIs (`cookies()`, `headers()`), direct database access, filesystem operations, or sensitive environment variables, when the trigger originates from a Client Component.

**The Key Benefit:** Server Actions provide a **secure bridge**, allowing Client Components to trigger server-side execution without exposing sensitive logic or credentials to the browser.

**Note:** While Server Components can _also_ access server-only APIs and perform database queries directly (as they only run server-side), Server Actions become necessary when that server-side logic needs to be invoked _dynamically_ based on user interaction within a Client Component.

**Example:** Your `getAuth` function (fetching user data based on a cookie) is a query needing access to `cookies()`. Because it must be called dynamically from the client-side `Header` component's `useEffect`, implementing it as a Server Action is the correct approach.
