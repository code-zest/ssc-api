import { Router } from "express";
import * as paymentController from "./payments.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post("/create-order", authenticate, paymentController.createOrder);
router.post("/verify", authenticate, paymentController.verifyPayment);
router.get("/history", authenticate, paymentController.getPurchaseHistory);
router.get("/admin/purchases", authenticate, authorize("ADMIN", "SUPER_ADMIN", "STAFF"), paymentController.getAllPurchases);

export default router;
