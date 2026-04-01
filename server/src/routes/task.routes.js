import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';

const router = Router();

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.put('/:id', taskController.update);

// ✅ Rotas específicas devem vir ANTES das rotas dinâmicas
router.delete('/completed', taskController.deleteCompleted);
router.delete('/:id', taskController.delete);

router.post('/mark-all-completed', taskController.markAllCompleted);

export default router;