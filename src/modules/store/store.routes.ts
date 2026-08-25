import { Router } from 'express';
import { StoreController } from './store.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Student Routes
router.use(authenticate);
router.get('/items', StoreController.listActiveItems);
router.post('/orders', StoreController.placeOrder);
router.get('/orders/my-orders', StoreController.getMyOrders);

// Admin Routes
// We pass 'ADMIN' and 'SUPER_ADMIN' to authorize, depending on how authorize is implemented in this codebase.
// From users.routes.ts, it was `authorize('SUPER_ADMIN')`
router.use('/admin', authorize('ADMIN', 'SUPER_ADMIN'));
router.get('/admin/items', StoreController.listAllItems);
router.post('/admin/items', StoreController.createItem);
router.put('/admin/items/:id', StoreController.updateItem);
router.get('/admin/orders', StoreController.listAllOrders);
router.patch('/admin/orders/:id', StoreController.updateOrderStatus);

export const storeRoutes = router;
