# Next.js 15 Knowledge Assessment

This document contains questions to test your understanding of server components, client components, and server actions in Next.js 15.

## Fundamentals

1. What directive must you add to a component file to make it a client component in Next.js?

2. In Next.js, are components server components or client components by default?

3. What is the primary advantage of server components over client components in terms of performance?

4. True or False: You can use React hooks (useState, useEffect) directly in server components.

## Server Actions

5. What directive is required to define a server action in Next.js?

6. Can you call a server action directly in the rendering flow of a client component? Why or why not?

7. What are the appropriate ways to invoke server actions from client components?

8. Why must server actions always be declared as async functions, even if they don't contain asynchronous operations?

## Data Fetching

9. In a server component, which approach is more appropriate for reading data: using a server action or fetching data directly? Explain why.

10. How would you implement data fetching for a dynamic user profile page that needs to display personalized content based on the logged-in user?

## Caching & Rendering

11. What happens to caching if you import the `cookies()` function in a server component, even if you don't use it?

12. How does Next.js 15's caching behavior differ from previous versions, particularly regarding page caching during client-side navigation?

## Architecture Patterns

13. You have an application with a form that submits data to create a new ticket. The form has client-side validation and needs to show errors. How would you structure this using server components, client components, and server actions?

14. Consider a sidebar navigation component that displays different menu items based on user role. How would you implement this respecting Next.js architecture patterns?

## Advanced Edge Cases

15. You have a server action that fetches data from an API that occasionally times out. What's the best approach to handle this in a client component that calls this action?

16. Can server components call server actions? If so, why would you do this instead of fetching data directly?

17. How would you share authentication state between multiple client components without passing props through the component tree?

## Performance Optimization

18. How does streaming in Next.js 15 improve perceived performance, and how would you implement it for a data-heavy dashboard?

19. What is the RSC payload, and how does it differ from traditional HTML payload?

20. If you have a page with both static content and user-specific content, how would you structure it to maximize performance through caching?

## Practical Problems

21. You have a client component that needs to periodically fetch fresh data from the server. How would you implement this using server actions?

22. What is the correct approach to handle form submission with file uploads in Next.js 15 using server actions?

23. Your app has a server component that displays tickets based on the current user's team. You've noticed it's causing cache invalidation across segments. How would you modify your code to improve caching?

24. You need to implement a "Delete Account" feature that requires both client-side confirmation and server-side processing. How would you structure this using Next.js components and actions?
