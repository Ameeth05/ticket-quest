# Next.js Caching Explained

## Understanding Next.js 15 Caching Mechanisms

Next.js employs several layers of caching to optimize performance, each with different behaviors and invalidation strategies. In Next.js 15, these mechanisms have been refined further.

## Client-Side Navigation vs. Direct Loading

### Direct Loading (URL typing/refresh)

When a user directly navigates to a page by typing a URL or refreshing:

- The server sends the complete pre-rendered HTML
- For static pages, this HTML was generated at build time
- For dynamic pages, the HTML is generated on-demand
- No loading spinners appear for pre-rendered content

### Client-Side Navigation (clicking links)

When a user navigates using Next.js's `<Link>` component:

- React's client-side router intercepts the navigation
- Next.js fetches the React Server Component (RSC) payload
- During this fetch, Suspense boundaries activate, showing loading states
- Once the payload arrives, React hydrates the UI with this data
- This happens even for statically generated pages

## RSC Caching in Next.js 15

Next.js 15 made important changes to how RSC payloads are cached:

1. **Router Cache Behavior**:

   - Layouts are cached and reused during navigation
   - Loading states are cached and reused during navigation
   - Pages are NOT cached by default in Next.js 15 (a change from previous versions)

2. **Cache Duration**:

   - For static pages with default prefetching: cached for 5 minutes
   - With explicit prefetching (`prefetch={true}`): cached for 5 minutes
   - Cache persists during the session but is cleared on page refresh

3. **Cache Invalidation**:
   - Automatic invalidation after the cache duration expires
   - Manual invalidation via `revalidatePath()` or `revalidateTag()`
   - Invalidation when using dynamic functions like `cookies()`
   - Using `router.refresh()` to force invalidation

## Caching and Dynamic APIs

Dynamic server functions like `cookies()`, `headers()`, and `searchParams` have a significant impact on caching:

1. **Segment-Level Invalidation**:

   - When a component uses a dynamic function, it invalidates caching for its entire route segment
   - This happens at the page or layout level, not at the individual component level

2. **Hierarchical Effects**:

   - A single component using `cookies()` makes its parent segments dynamic too
   - You cannot isolate dynamic behavior to specific components within a page

3. **Example**:
   ```tsx
   export default async function TicketItem() {
     const { user } = await getAuth(); // Uses cookies() internally
     // Rest of component...
   }
   ```
   This component will cause its parent page to show a loading spinner during client-side navigation because the `cookies()` call invalidates the cache.

## Static Rendering and ISR

Next.js offers several rendering strategies that interact with caching:

1. **Static Rendering**:

   - Pages rendered at build time
   - Fastest possible delivery to users
   - Data can become stale

2. **Incremental Static Regeneration (ISR)**:

   - Pages statically rendered but can be regenerated
   - Regeneration triggered by:
     - Time-based expiration (`export const revalidate = 30`)
     - On-demand via `revalidatePath()` or `revalidateTag()`

3. **Dynamic Rendering**:
   - Pages generated on every request
   - Always fresh data but slower
   - Enabled with `export const dynamic = "force-dynamic"`

## Real-World Example

In our Ticket Quest application:

> The tickets page is statically rendered and uses ISR for data updates when tickets are created, edited, or deleted (via `revalidatePath(ticketsPath())`), but the cache is invalidated during client-side navigation because of the dynamic functions used within the components (specifically `getAuth()` in the TicketItem component, which uses `cookies()` internally).

This explains why we see loading spinners during navigation between pages, even though the page is statically rendered. The app prioritizes showing fresh authentication state over instant navigation.

## Optimizing Navigation UX

To avoid loading spinners during navigation:

1. **Isolate dynamic content**:

   - Move auth-dependent UI to separate components
   - Use client components with client-side auth state where possible

2. **Adjust caching behavior**:

   - Use the experimental `staleTimes` config
   - Fine-tune prefetching with `<Link prefetch={true}>`

3. **Structure your app**:
   - Group auth-dependent features in specific layouts
   - Create separate routes for highly dynamic content

The right approach depends on your priorities between navigation speed and data freshness.
