import { taskService } from '../services/task.service.js';

export const taskController = {
  getAll(req, res) {
    res.json(taskService.getAll());
  },

  create(req, res, next) {
    try {
      if (!req.body.title) return res.status(400).json({ error: 'Título é obrigatório' });
      const task = taskService.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  },

  update(req, res, next) {
    try {
      const task = taskService.update(req.params.id, req.body);
      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    try {
      taskService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  deleteCompleted(req, res, next) {
    console.log("✅ Rota deleteCompleted foi chamada com sucesso!");   
    try {
      taskService.deleteCompleted();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  markAllCompleted(req, res, next) {
    try {
      taskService.markAllCompleted();
      res.json({ message: 'Todas as tarefas foram marcadas como concluídas' });
    } catch (err) {
      next(err);
    }
  }
};