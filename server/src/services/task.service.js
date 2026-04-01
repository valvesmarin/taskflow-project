let tasks = [];

export const taskService = {
  getAll() {
    return tasks;
  },

  create(data) {
    const newTask = {
      id: Date.now(),
      title: data.title,
      category: data.category || 'Otros',
      priority: data.priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.unshift(newTask);
    return newTask;
  },

  update(id, data) {
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) throw new Error('NOT_FOUND');
    Object.assign(task, data);
    return task;
  },

  delete(id) {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) throw new Error('NOT_FOUND');
    tasks.splice(index, 1);
  },

  deleteCompleted() {
    tasks = tasks.filter(t => !t.completed);
  },

  markAllCompleted() {
    tasks.forEach(t => t.completed = true);
  }
};