# Understanding useInfiniteQuery in React Query

`useInfiniteQuery` is a powerful hook from React Query that helps you fetch and manage paginated data (data that comes in "pages" or chunks, like comments, posts, etc.). It makes loading more data easy and keeps track of everything for you.

---

## 1. What does useInfiniteQuery do?

- Fetches data in pages (chunks)
- Lets you load more data when needed (e.g., when a user clicks "More")
- Automatically keeps all the loaded pages in memory
- Handles loading, error, and data states for you

---

## 2. Basic Example

```tsx
const queryKey = ["comments", ticketId];
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
  initialPageParam: undefined, // Start with no cursor
  getNextPageParam: (lastPage) =>
    lastPage.metadata.hasNextPage
      ? JSON.stringify(lastPage.metadata.cursor)
      : undefined,
  initialData: {
    pages: [
      {
        list: paginatedComments.list,
        metadata: paginatedComments.metadata,
      },
    ],
    pageParams: [undefined],
  },
});
```

### Using initialData
- **Purpose:** Allows you to provide initial comments (from server or props) so the UI can show something immediately, and React Query can use this as the first page.
- **Example:**
  ```js
  initialData: {
    pages: [
      { list: paginatedComments.list, metadata: paginatedComments.metadata },
    ],
    pageParams: [undefined],
  }
  ```
- **Benefit:** Faster first render and seamless hydration if you already have some data.

---

## 3. Explanation of Each Parameter (with Examples)

### queryKey
- **Purpose:** Uniquely identifies your query.
- **Example:** `["comments", ticketId]` means "fetch comments for this specific ticket".

### queryFn
- **Purpose:** The function that actually fetches the data.
- **Example:** `({ pageParam }) => getComments(ticketId, pageParam)`
  - `pageParam` is used to fetch the correct page (like a cursor or page number).

### initialPageParam
- **Purpose:** The value of `pageParam` for the very first fetch.
- **Example:** `undefined` means "start from the beginning".
- **How it works:** When the component loads for the first time, React Query will call your queryFn with `pageParam` set to `undefined`.

### pageParam
- **Purpose:** The value passed to your queryFn each time a new page is fetched.
- **Example:**
  - First page: `pageParam` is `undefined`.
  - Second page: `pageParam` is the value returned by getNextPageParam (e.g., a cursor like "cursor1").
- **How it works:**
  ```js
  // When fetching next page, React Query calls:
  getComments(ticketId, pageParam)
  ```

### getNextPageParam
- **Purpose:** Tells React Query how to find the next page's cursor from the last page's data.
- **Example:**
  ```js
  getNextPageParam: (lastPage) =>
    lastPage.metadata.hasNextPage
      ? JSON.stringify(lastPage.metadata.cursor)
      : undefined
  ```
  - If there is another page, return the cursor for it. Otherwise, return `undefined` (no more pages).
- **How it works:**
  - After each fetch, React Query passes the last page's data to this function to determine if there are more pages to load and what the next pageParam should be.

### lastPage
- **Purpose:** The data returned from your last fetch (the most recent page of results).
- **Example:**
  ```js
  {
    list: [ {id: 3, text: "C"}, {id: 4, text: "D"} ],
    metadata: { hasNextPage: false, cursor: null }
  }
  ```
- **How it works:** Used by getNextPageParam to decide if there are more pages.

---

### How are these connected? (Step-by-step)

1. **First fetch:**
   - `initialPageParam` is `undefined`.
   - `queryFn` runs: `getComments(ticketId, undefined)`
   - Backend returns first page and a cursor (if there are more pages).
2. **User clicks "More":**
   - `getNextPageParam(lastPage)` runs, returns the new cursor (e.g., "cursor1").
   - `queryFn` runs: `getComments(ticketId, "cursor1")`
   - Backend returns next page.
3. **Repeat:**
   - This continues until `getNextPageParam` returns `undefined` (no more pages).

---

## 4. How does useInfiniteQuery work in practice?

### Step-by-step Example

1. **Component mounts:**
   - React Query fetches the first page of data.
   - Example result:
     ```js
     data = {
       pages: [
         { list: [ {id: 1, text: "A"}, {id: 2, text: "B"} ] }
       ]
     }
     ```

2. **User clicks "More":**
   - Call `fetchNextPage()`.
   - React Query fetches the next page and adds it to `data.pages`.
   - Example result:
     ```js
     data = {
       pages: [
         { list: [ {id: 1, text: "A"}, {id: 2, text: "B"} ] },
         { list: [ {id: 3, text: "C"}, {id: 4, text: "D"} ] }
       ]
     }
     ```

3. **Displaying all comments:**
   - Combine all pages into one array:
     ```js
     const comments = data?.pages.flatMap(page => page.list) ?? [];
     // Result: [ {id: 1, text: "A"}, {id: 2, text: "B"}, {id: 3, text: "C"}, {id: 4, text: "D"} ]
     ```

4. **Displaying only new comments:**
   - Show only the last page:
     ```js
     const newComments = data.pages[data.pages.length - 1].list;
     // Result: [ {id: 3, text: "C"}, {id: 4, text: "D"} ]
     ```

---

## 5. Summary Table

| Parameter           | What it does                                             | Example                                      |
|---------------------|---------------------------------------------------------|-----------------------------------------------|
| queryKey            | Uniquely identifies the query                           | ["comments", ticketId]                       |
| queryFn             | Function to fetch a page of data                        | ({ pageParam }) => getComments(ticketId, pageParam) |
| initialPageParam    | The starting value for pagination                       | undefined                                     |
| getNextPageParam    | How to get the next page's cursor from the last page    | (lastPage) => lastPage?.metadata.cursor       |

---

## 6. Visual Analogy

Imagine you have several boxes (pages), and each box contains some balls (comments). `useInfiniteQuery` helps you fetch one box at a time and keeps all the boxes you’ve opened. You can:
- Pour all balls into one basket (`flatMap`) to display everything
- Look inside just the last box to see only the newest balls (new comments)

---

## 7. Why use useInfiniteQuery?
- Less code to write and maintain
- Handles caching, loading, and errors for you
- Automatically merges new pages
- Makes your code cleaner and easier to follow

---

## 8. Cache Management: Using invalidateQueries

Sometimes, you want to make sure your data is always up-to-date, especially if comments can be changed from other parts of your app. React Query provides `invalidateQueries` for this purpose.

### Example:
```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const handleDeleteComment = () => {
  queryClient.invalidateQueries({ queryKey });
};

const handleCreateComment = () => {
  queryClient.invalidateQueries({ queryKey });
};
```

- **What does this do?**
  - Marks the comments query as "stale" so React Query will refetch the latest data the next time it's needed (or immediately if the component is mounted).
  - This is better than just calling `refetch()` because it ensures all components using the same queryKey get the updated data, not just the current one.

---

## 9. Quick Reference

- To load more: `fetchNextPage()`
- To check if more pages exist: `hasNextPage`
- To get all items: `data.pages.flatMap(page => page.list)`
- To get only new items: `data.pages[data.pages.length - 1].list`
- To provide initial data: use `initialData`
- To refresh everywhere: `queryClient.invalidateQueries({ queryKey })`

---

**In summary:**
`useInfiniteQuery` is your assistant for fetching and managing paginated data in React apps. With features like `initialData` for fast first loads and `invalidateQueries` for cache management, it makes loading, updating, and rendering paginated data simple and efficient!
