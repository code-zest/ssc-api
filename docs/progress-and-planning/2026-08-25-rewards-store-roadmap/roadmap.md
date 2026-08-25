# Gamification Rewards Store: Implementation Plan (Revised)

This document outlines the architecture and implementation steps to build the Gamification Rewards Store with industry best standard practices, focusing on premium UX and seamless admin operations.

## User Review Required

> [!IMPORTANT]  
> **XP vs. Coins Architecture:**  
> Currently, `xpPoints` determine a user's Rank (e.g., `COMMISSIONER`). If they spend `xpPoints` on merch, their rank would drop. To prevent this, we are adding a new `coins` field to the `User` model.  
> 1. Earning XP will automatically grant an equal amount of `coins`.  
> 2. Buying merch deducts `coins`, but leaves `xpPoints` (and therefore Rank) unaffected.  
> 3. Existing users will have their `coins` backfilled to equal their current `xpPoints`.  

## Resolved Architectural Decisions

> [!TIP]  
> **Handling Shipping Fees (Industry Standard):**  
> In gamified ecosystems (like Duolingo or corporate reward portals), charging real money for shipping a "free" reward feels like a bait-and-switch. **The industry standard is to bake the shipping cost into the virtual currency price.** 
> *Decision:* We will absorb the shipping cost as a marketing/retention expense. The coin price of the items will be set high enough to justify this. No payment gateways needed.

> [!TIP]  
> **MVP Product Selection (No Variants):**  
> To avoid the complexity of managing sizes (like T-shirts), we will launch the store with universally appealing, "one-size-fits-all" study accessories. 
> *Initial Merchandise Suggestions:*
> 1. **"SSC Champion" Ceramic Coffee Mug** (Perfect for late-night studying)
> 2. **Premium Engraved Metal Pen**
> 3. **High-Quality Desk Planner / Study Notebook**
> 4. **Motivational Laptop Sticker Pack**

---

## Proposed Changes

### 1. Database (Prisma Schema)

Industry standard e-commerce models translated for coin-based redemption.

#### [MODIFY] [schema.prisma](file:///Volumes/CVS%20Sandisk%201TB%20SkyBlue/Code%20Zest/SSC/ssc-api/prisma/schema.prisma)
- **User Model:** Add `coins Int @default(0)`.
- **New Model:** `StoreItem`
  - `id`, `name`, `description` (markdown supported), `imageUrl`, `cost` (Int), `stock` (Int), `isActive` (Boolean).
- **New Model:** `StoreOrder`
  - `id`, `userId`, `storeItemId`, `status` (Enum: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
  - Structured Shipping fields: `addressLine1`, `addressLine2`, `city`, `state`, `pincode`, `phone`.
  - Tracking fields: `trackingNumber`, `courierName` (for admin fulfillment).

---

### 2. Backend API (`ssc-api`)

Create a robust `store` module for transaction integrity.

#### [NEW] `src/modules/store/store.service.ts`
- **Concurrency Control:** `placeOrder` will use a database transaction to lock the user's row and the item's row to prevent race conditions (double spending coins or buying out-of-stock items).
- **Admin fulfillment:** APIs to update tracking details and transition order status.

#### [NEW] Controllers & Routes
- `GET /api/v1/store/items` (Student - active items only)
- `POST /api/v1/store/orders` (Student - transactional placement)
- `GET /api/v1/store/orders/my-orders` (Student)
- `GET /api/v1/store/admin/items` (Admin)
- `POST/PUT /api/v1/store/admin/items` (Admin)
- `GET /api/v1/store/admin/orders` (Admin)
- `PATCH /api/v1/store/admin/orders/:id` (Admin - status/tracking update)

---

### 3. Client Frontend (`ssc-client`)

Focus on a premium, highly engaging e-commerce experience instead of generic accordions.

#### [NEW] `src/app/(dashboard)/store/page.tsx` (The Storefront)
- **Bento Grid Layout:** Modern grid of merchandise using glassmorphism cards and hover micro-animations.
- **Floating Balance Indicator:** A sticky/floating pill showing the user's current coin balance, glowing if they have enough to buy an item on screen.
- **Slide-out Cart/Checkout:** Instead of a jarring modal, a smooth slide-out sheet (Drawer) from the right to collect the structured shipping address and confirm the transaction.

#### [NEW] `src/app/(dashboard)/store/orders/page.tsx` (Order Tracking)
- **Visual Order Timeline:** Instead of boring accordions or lists, orders will display as beautiful individual cards featuring a **horizontal step timeline** (e.g., Pending ──► Processing ──► Shipped ──► Delivered).
- If shipped, it displays the Courier and Tracking Number directly on the card.

---

### 4. Admin Frontend (`ssc-admin-web`)

Focus on operational efficiency using modern back-office patterns.

#### [NEW] `src/pages/store/inventory/index.tsx`
- **Data Table:** Modern grid view of inventory with quick toggles for `isActive` and inline editing for stock numbers to avoid multiple clicks.

#### [NEW] `src/pages/store/orders/index.tsx` (Kanban Fulfillment)
- **Drag-and-Drop Kanban Board:** Instead of standard tables or accordions, orders will be managed via a Kanban board. Columns will be: `Pending` | `Processing` | `Shipped` | `Delivered`.
- Admins can drag an order card from `Pending` to `Processing`.
- Moving to `Shipped` will trigger a modal asking for the `Tracking Number` and `Courier`.
- This provides an industry-standard, at-a-glance view of the fulfillment pipeline.

---

## Verification Plan

### Automated Tests
- Prisma migrations generated and types compiled.
- Backend transactional logic tested for negative coin balances.

### Manual Verification
1. Log in as Admin, create a "SSC Champion T-Shirt" with 10 stock.
2. Log in as a Student with 5000 coins, view the bento grid store, and purchase the shirt.
3. Verify the slide-out sheet UX and check that coins drop and the order timeline shows "Pending".
4. Log back as Admin to the Kanban board, drag the order to "Shipped", enter tracking details.
5. Check Student timeline to ensure it reflects the shipped status and tracking number.
