import { Router } from "express";
import * as productsController from "./products.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Public / User routes
router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);

// Admin routes
router.post("/", authenticate, authorize("ADMIN", "SUPER_ADMIN"), productsController.createProduct);
router.put("/:id", authenticate, authorize("ADMIN", "SUPER_ADMIN"), productsController.updateProduct);
router.post("/:id/items", authenticate, authorize("ADMIN", "SUPER_ADMIN"), productsController.addItemsToProduct);
router.delete("/:id/items", authenticate, authorize("ADMIN", "SUPER_ADMIN"), productsController.removeItemsFromProduct);

export default router;
