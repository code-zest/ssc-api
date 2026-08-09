import { AccessTier, PurchasableItemType } from "@prisma/client";
import { prisma } from "../config/prisma";

export const canAccessContent = async (
  userId: string,
  userSubscriptionTier: string,
  itemType: PurchasableItemType,
  itemId: string,
  accessTier: AccessTier
): Promise<boolean> => {
  // 1. Check if the content is completely free
  if (accessTier === "FREE") {
    return true;
  }

  // 2. Check if the user has an active premium subscription
  // Assuming subscription tiers are FREE, PREMIUM etc.
  if (userSubscriptionTier === "PREMIUM" && accessTier !== "EXCLUSIVE") {
    // If the tier is PREMIUM, they get PRO content, but maybe not EXCLUSIVE
    return true;
  }
  
  if (userSubscriptionTier === "PREMIUM" && accessTier === "EXCLUSIVE") {
    // If it's EXCLUSIVE, they still need to buy it separately, OR we can allow it
    // depending on business rules. We'll require purchase for EXCLUSIVE.
  }

  // 3. Check if the user has purchased the item individually or via a Combo (Product)
  const purchases = await prisma.purchase.findMany({
    where: {
      studentId: userId,
      status: "SUCCESS",
    },
    include: {
      product: {
        include: {
          items: true,
        },
      },
    },
  });

  for (const purchase of purchases) {
    const productItems = purchase.product.items;
    const hasItem = productItems.some(
      (pi) => pi.itemType === itemType && pi.itemId === itemId
    );
    if (hasItem) {
      return true;
    }
  }

  // 4. Default deny
  return false;
};
