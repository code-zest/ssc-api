# AI Assistant Instructions for Backend & API Development

When generating or modifying Express controllers, services, or Prisma models in this project, you MUST strictly adhere to the project's backend architecture and best practices.

## 1. Zod Validation for Requests
Always use the existing `validate` middleware with Zod schemas for validating incoming `req.body`, `req.query`, and `req.params`. Never trust raw client input.

## 2. Service Layer Pattern
Keep business logic in the `*.service.ts` files. Controllers should only handle HTTP concerns (extracting request data, passing it to the service, and sending the response). 

## 3. Prisma Type Safety
Leverage Prisma's generated types instead of manually creating interfaces for database models whenever possible. Use `Prisma.TransactionClient` when running database transactions.

## 4. Standardized API Responses
All API endpoints must return a structured response. Use the standard JSON structure (e.g., `{ success: true, data: ... }`) and rely on the global error handling middleware for exceptions.

## 5. Security & Auth
All protected routes MUST use the `auth` middleware. Ensure role-based checks (e.g., Admin vs User) are enforced where necessary.

## 6. Strict TypeScript Typings (NO `any`)
**CRITICAL RULE:** You MUST NEVER use the `any` type in TypeScript.
* Use strict types (interfaces, types, generics) for all variables, function parameters, and return types.
* If a type is truly unknown, use the `unknown` type and perform proper type narrowing.
* Use `Record<string, unknown>` for generic objects.
* Never silence TypeScript errors by casting to `any`. Use proper types or `unknown`.
