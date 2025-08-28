import { Router } from 'express';
import * as ctrl from '../controllers/vehicles.js';
import { authRequired } from '../middleware/auth.js';
const router = Router();
router.get('/', authRequired, ctrl.list);
router.post('/', authRequired, ctrl.create);
router.put('/:id', authRequired, ctrl.update);
router.delete('/:id', authRequired, ctrl.remove);
export default router;
