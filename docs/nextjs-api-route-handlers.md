# Next.js API Route Handlers: Detailed Documentation

## Overview

API Route Handlers in Next.js (App Router) allow you to build backend endpoints directly inside your Next.js application. These endpoints can handle HTTP requests (GET, POST, etc.), process data, interact with databases, and return responses—just like a traditional backend API.

With the App Router (introduced in Next.js 13+), API routes are colocated with your application code, following the same file-system based routing as your pages and components.

---

## 1. File Structure & Placement

- API Route Handlers live inside the `app` or `src/app` directory under the special `api` folder.
- Each route is defined by a folder and a `route.ts` (or `route.js`) file.

**Example:**
```
src/
  app/
    api/
      tickets/
        route.ts   <-- Handles /api/tickets
      users/
        route.ts   <-- Handles /api/users
```

---

## 2. Defining a Route Handler

You define HTTP method handlers by exporting functions named after the HTTP verbs you want to support (`GET`, `POST`, `PUT`, `DELETE`, etc.).

**Example:**
```ts
// src/app/api/tickets/route.ts
export async function GET(request: Request) {
  // handle GET requests
}

export async function POST(request: Request) {
  // handle POST requests
}
```

- The exported function receives a `Request` object (see below).
- You return a `Response` object to send data back to the client.

---

## 2a. Handler Argument Structure: params, request, and More

When defining a route handler in the Next.js App Router (such as `GET`, `POST`, etc.), the function receives a single argument: an object containing relevant properties for that route. The exact shape of this object depends on the type of route (dynamic, static, etc.) and the HTTP method.

### Common Properties in the Argument Object

- **params**: An object containing dynamic route parameters extracted from the URL. For example, in `/api/tickets/[ticketId]`, `params` will be `{ ticketId: "123" }`.
- **request**: The incoming `Request` object (Web Fetch API), which provides access to headers, body, method, and URL. This is always present in route handlers.
- **context**: (Less common) Additional context, such as preview data, may be present in some advanced scenarios.

### Example Signatures

**Destructured (recommended for clarity):**
```ts
export async function GET({ params, request }: { params: { ticketId: string }, request: Request }) {
  // Use params.ticketId and request
}
```

**Without destructuring:**
```ts
export async function POST(arg: { params: { ticketId: string }, request: Request }) {
  // Access via arg.params.ticketId and arg.request
}
```

### Why Destructure?
Destructuring in the function signature allows you to directly access the properties you need, rather than repeatedly referencing `arg.params` or `arg.request`. It improves readability and reduces boilerplate.

### Typical Properties Table

| Property   | Description                                                    | Typical Availability      |
|------------|----------------------------------------------------------------|--------------------------|
| params     | Dynamic route params (from URL)                                | Dynamic API routes       |
| request    | The incoming Request object (Web Fetch API)                    | All route handlers       |
| context    | Extra context (e.g., preview data, rarely used in route files) | Rare/advanced scenarios  |

### Notes
- In static API routes (no dynamic segments), `params` may be omitted.
- In dynamic routes, `params` will always be present and typed based on your route folder structure.
- The `request` object is always present and follows the standard Web Fetch API.

---

## 3. The Request Object

The `Request` object is based on the [Web Fetch API Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and represents the incoming HTTP request.

### Key Features:
- **Method**: `request.method` (e.g., "GET", "POST")
- **Headers**: `request.headers` (access request headers)
- **Body**: Use `await request.json()` (for JSON), `await request.text()`, etc.
- **URL**: `request.url` (full URL string)
- **Query Params**: Parse from `request.url` using `URL`:
  ```ts
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  ```

### Example:
```ts
export async function POST(request: Request) {
  const data = await request.json(); // Parse JSON body
  // Use data.title, data.description, etc.
}
```

---

## 4. The Response Object

The `Response` object is also based on the [Web Fetch API Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). It represents what you send back to the client.

### Common Usage:
- **JSON Response**: `Response.json(data, options?)`
- **Text Response**: `new Response('Hello', { status: 200 })`
- **Status Codes**: Pass `{ status: 201 }` as an option for custom status codes.
- **Headers**: Pass `{ headers: { ... } }` to set custom headers.

### Examples:
```ts
return Response.json({ success: true, ticket });
return Response.json("ok"); // Sends a string
return new Response("Created", { status: 201 });
```

> **Tip:** You can send any serializable value with `Response.json`: objects, arrays, strings, numbers, etc. Wrapping in `{}` is common for extensibility.

---

## 5. Full Example: GET and POST

```ts
// src/app/api/tickets/route.ts
import { getTickets, createTicket } from "@/features/ticket/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 0);
  const size = Number(searchParams.get("size") ?? 5);

  const { list, metadata } = await getTickets(undefined, {
    search: "",
    size,
    page,
    sortKey: "createdAt",
    sortValue: "desc",
  });

  return Response.json({ list, metadata });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Assume data = { title, description }
  const ticket = await createTicket(data);
  return Response.json(ticket, { status: 201 });
}
```

---

## 6. Best Practices

- Always validate and sanitize incoming data in POST/PUT handlers.
- Handle errors gracefully and return appropriate status codes (e.g., 400 for bad input, 500 for server errors).
- Use objects (`{}`) for JSON responses to allow future extensibility.
- Avoid exposing sensitive information in responses.

---

## 7. References & Further Reading

- [Next.js API Routes (App Router) Documentation](https://nextjs.org/docs/app/building-your-application/routing/api-routes)
- [Web Fetch API: Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
- [Web Fetch API: Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- [Next.js Route Handlers Examples](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 8. FAQ

**Q: Do I always need to use curly brackets in `Response.json`?**
A: No, but it’s best practice for extensibility. You can send strings, arrays, or numbers directly if needed.

**Q: Can I use third-party libraries in route handlers?**
A: Yes! You can import and use any npm package, database client, etc., just like in a traditional Node.js backend.

**Q: Are route handlers server-only?**
A: Yes, they always run on the server, never in the browser.

---

If you have further questions or want to see advanced patterns (authentication, file uploads, etc.), let me know!
