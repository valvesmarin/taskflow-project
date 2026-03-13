let tasks = [];
let currentTaskId = null;
let filter = { priority: '', category: '', sort: 'newest' };

const translations = {
  es: {
    appTitle: "PulseTasks • Gestor de Tareas",
    addButton: "Añadir",
    taskPlaceholder: "¿Qué necesitas hacer hoy?",
    allPriorities: "Todas las prioridades",
    allCategories: "Todas las categorías",
    sortNewest: "Más recientes",
    sortOldest: "Más antiguas",
    sortPriority: "Prioridad",
    sortTitle: "Alfabético",
    clearCompleted: "Limpiar completadas",
    editTitle: "Editar Tarea",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    emptyStateTitle: "Aún no hay tareas",
    emptyStateMessage: "¡Añade tu primera tarea arriba!",
    toastAdded: "Tarea añadida con éxito",
    toastUpdated: "Tarea actualizada",
    toastDeleted: "Tarea eliminada",
    toastCleared: "Tareas completadas eliminadas",
    confirmDelete: "¿Realmente deseas eliminar esta tarea?",
    confirmClear: "¿Limpiar todas las tareas completadas?",
    themeDark: "Modo Oscuro",
    themeLight: "Claro",
    priorityHigh: "Alta",
    priorityMedium: "Media",
    priorityLow: "Baja",
    categoryWork: "Trabajo",
    categoryPersonal: "Personal",
    categoryStudy: "Estudio",
    categoryHealth: "Salud",
    categoryOthers: "Otros"
  },
  pt: {
    appTitle: "PulseTasks • Gerenciador de Tarefas",
    addButton: "Adicionar",
    taskPlaceholder: "O que precisa ser feito hoje?",
    allPriorities: "Todas as prioridades",
    allCategories: "Todas as categorias",
    sortNewest: "Mais recentes",
    sortOldest: "Mais antigas",
    sortPriority: "Prioridade",
    sortTitle: "Alfabético",
    clearCompleted: "Limpar concluídas",
    editTitle: "Editar Tarefa",
    saveButton: "Salvar",
    cancelButton: "Cancelar",
    emptyStateTitle: "Ainda não há tarefas",
    emptyStateMessage: "Adicione sua primeira tarefa acima!",
    toastAdded: "Tarefa adicionada com sucesso",
    toastUpdated: "Tarefa atualizada",
    toastDeleted: "Tarefa excluída",
    toastCleared: "Tarefas concluídas removidas",
    confirmDelete: "Deseja realmente excluir esta tarefa?",
    confirmClear: "Limpar todas as tarefas concluídas?",
    themeDark: "Modo Escuro",
    themeLight: "Claro",
    priorityHigh: "Alta",
    priorityMedium: "Média",
    priorityLow: "Baixa",
    categoryWork: "Trabalho",
    categoryPersonal: "Pessoal",
    categoryStudy: "Estudo",
    categoryHealth: "Saúde",
    categoryOthers: "Outros"
  },
  en: {
    appTitle: "PulseTasks • Task Manager",
    addButton: "Add",
    taskPlaceholder: "What needs to be done today?",
    allPriorities: "All priorities",
    allCategories: "All categories",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    sortPriority: "Priority",
    sortTitle: "Alphabetical",
    clearCompleted: "Clear completed",
    editTitle: "Edit Task",
    saveButton: "Save",
    cancelButton: "Cancel",
    emptyStateTitle: "No tasks yet",
    emptyStateMessage: "Add your first task above!",
    toastAdded: "Task added successfully",
    toastUpdated: "Task updated",
    toastDeleted: "Task deleted",
    toastCleared: "Completed tasks cleared",
    confirmDelete: "Do you really want to delete this task?",
    confirmClear: "Clear all completed tasks?",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Low",
    categoryWork: "Work",
    categoryPersonal: "Personal",
    categoryStudy: "Study",
    categoryHealth: "Health",
    categoryOthers: "Others"
  }
};
// ================================================
// CONFIGURACIONES Y ESTILOS
// ================================================

const priorityStyles = {
  high:   { badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', card: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' },
  medium: { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', card: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' },
  low:    { badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', card: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' }
};

let currentLang = localStorage.getItem('lang') || 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Atualiza textos dinâmicos
  document.querySelector('title').textContent = translations[lang].title;
  document.getElementById('task-input').placeholder = translations[lang].placeholder;
  document.querySelector('#task-form button').textContent = translations[lang].addTask;
  document.querySelector('#filter-priority option[value=""]').textContent = translations[lang].allPriorities;
  // ... atualize todos os outros elementos que precisam de texto

  // Atualiza o estado vazio
  document.querySelector('#empty-state h2').textContent = translations[lang].emptyTitle;
  document.querySelector('#empty-state p').textContent = translations[lang].emptyMessage;

  // Atualiza botões do modal
  document.querySelector('#edit-modal h2').textContent = translations[lang].editTask;
  document.querySelector('#cancel-edit').textContent = translations[lang].cancel;
  document.querySelector('#edit-form button[type="submit"]').textContent = translations[lang].save;

  // Atualiza botão de tema (se necessário)
  updateThemeButton(document.documentElement.classList.contains('dark'));
  
  // Re-renderiza tarefas para atualizar badges e textos dinâmicos
  renderTasks();
}
document.getElementById('language-select').addEventListener('change', e => {
  setLanguage(e.target.value);
});

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('language-select').value = currentLang;
  setLanguage(currentLang);
});

/** Carga tareas y tema desde localStorage */
function init() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];

  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  updateThemeButton(savedTheme === 'dark');

  renderTasks();
  populateCategories();
  updateStats();
}

/** Actualiza botón de tema */
function updateThemeButton(isDark) {
  const t = translations[currentLang];
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
  document.getElementById('theme-text').textContent = isDark ? t.themeLight : t.themeDark;
}

/** Guarda tareas */
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/** Actualiza estadísticas */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById('stats').innerHTML = `
    <div class="stat-card">
      <p class="text-sm text-zinc-500 dark:text-zinc-400">Total</p>
      <p class="text-3xl font-bold">${total}</p>
    </div>
    <div class="stat-card">
      <p class="text-sm text-green-600 dark:text-green-400">Completadas</p>
      <p class="text-3xl font-bold">${completed}</p>
    </div>
    <div class="stat-card">
      <p class="text-sm text-amber-600 dark:text-amber-400">Pendientes</p>
      <p class="text-3xl font-bold">${pending}</p>
    </div>
  `;
}

/** Llena select de categorías */
function populateCategories() {
  const select = document.getElementById('filter-category');
  const categories = [...new Set(tasks.map(t => t.category))];
  select.innerHTML = '<option value="">Todas las categorías</option>' + categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

/** Crea elemento de tarea */
const t = translations[currentLang];

const priorityText = task.priority === 'high' ? t.priorityHigh :
                     task.priority === 'medium' ? t.priorityMedium :
                     t.priorityLow;
function createTaskElement(task) {
  div.className = `task-card ${prio.card} ${task.completed ? 'opacity-60' : ''}`;
  div.draggable = true;
  div.dataset.id = task.id;

  div.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-5 h-5 accent-indigo-600 cursor-pointer" />
    <div class="flex-1">
      <p class="text-lg font-medium ${task.completed ? 'line-through text-zinc-500' : ''}">${task.title}</p>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">${task.category}</p>
    </div>
    <span class="badge ${prio.badge}">${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</span>
    <button class="edit-btn text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-2" aria-label="Editar tarea">✏️</button>
    <button class="delete-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-3 py-2" aria-label="Eliminar tarea">🗑️</button>
  `;

  // Eventos
  div.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleComplete(task.id));
  div.querySelector('.edit-btn').addEventListener('click', () => openEditModal(task));
  div.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

  // Drag & Drop
  div.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', task.id);
    div.classList.add('opacity-50');
  });

  div.addEventListener('dragend', () => div.classList.remove('opacity-50'));

  div.addEventListener('dragover', e => e.preventDefault());

  div.addEventListener('drop', e => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId !== task.id) reorderTasks(draggedId, task.id);
  });

  return div;
}

/** Reordena tareas con drag & drop */
function reorderTasks(draggedId, targetId) {
  const draggedIndex = tasks.findIndex(t => t.id == draggedId);
  const targetIndex = tasks.findIndex(t => t.id == targetId);

  if (draggedIndex === -1 || targetIndex === -1) return;

  const [draggedTask] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, draggedTask);

  saveTasks();
  renderTasks();
}

/** Renderiza lista de tareas */
function renderTasks() {
  const container = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');
  container.innerHTML = '';

  let filtered = tasks.filter(task => {
    const matchPriority = !filter.priority || task.priority === filter.priority;
    const matchCategory = !filter.category || task.category === filter.category;
    return matchPriority && matchCategory;
  });

  // Ordenación
  filtered = filtered.sort((a, b) => {
    if (filter.sort === 'newest') return b.id - a.id;
    if (filter.sort === 'oldest') return a.id - b.id;
    if (filter.sort === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    }
    if (filter.sort === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  if (filtered.length === 0) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    filtered.forEach(task => container.appendChild(createTaskElement(task)));
  }

  updateStats();
}

/** Añade nueva tarea */
document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('task-input').value.trim();
  if (!title) return showToast('Escribe una tarea', 'error');

  const newTask = {
    id: Date.now(),
    title,
    category: document.getElementById('category-select').value,
    priority: document.getElementById('priority-select').value,
    completed: false
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
  e.target.reset();
  showToast('Tarea añadida con éxito', 'success');
  populateCategories();
});

/** Marca/desmarca completada */
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

/** Abre modal de edición */
function openEditModal(task) {
  currentTaskId = task.id;
  document.getElementById('edit-title').value = task.title;
  document.getElementById('edit-category').value = task.category;
  document.getElementById('edit-priority').value = task.priority;
  document.getElementById('edit-modal').classList.remove('hidden');
}

/** Guarda edición */
document.getElementById('edit-form').addEventListener('submit', e => {
  e.preventDefault();
  const task = tasks.find(t => t.id === currentTaskId);
  if (task) {
    task.title = document.getElementById('edit-title').value.trim();
    task.category = document.getElementById('edit-category').value;
    task.priority = document.getElementById('edit-priority').value;
    saveTasks();
    renderTasks();
    closeModal();
    showToast('Tarea actualizada', 'success');
  }
});

/** Cierra modal */
function closeModal() {
  document.getElementById('edit-modal').classList.add('hidden');
  currentTaskId = null;
}

document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('cancel-edit').addEventListener('click', closeModal);

/** Elimina tarea */
function deleteTask(id) {
  if (!confirm('¿Realmente deseas eliminar esta tarea?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  showToast('Tarea eliminada', 'success');
  populateCategories();
}

/** Limpia completadas */
document.getElementById('clear-completed').addEventListener('click', () => {
  if (!confirm('¿Limpiar todas las tareas completadas?')) return;
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  showToast('Tareas completadas eliminadas', 'success');
});

/** Toast */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} translate-y-0 opacity-100`;
  setTimeout(() => {
    toast.className = `toast hidden`;
  }, 3000);
}

/** Tema */
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeButton(isDark);
});

/** Filtros */
document.getElementById('filter-priority').addEventListener('change', e => {
  filter.priority = e.target.value;
  renderTasks();
});

document.getElementById('filter-category').addEventListener('change', e => {
  filter.category = e.target.value;
  renderTasks();
});

document.getElementById('sort-select').addEventListener('change', e => {
  filter.sort = e.target.value;
  renderTasks();
})

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  const t = translations[lang];

  // Atualiza elementos fixos no HTML
  document.title = t.appTitle;
  document.querySelector('#task-input').placeholder = t.taskPlaceholder;
  document.querySelector('#task-form button').textContent = t.addButton;

  // Select de filtro de prioridade
  const prioOptions = document.querySelectorAll('#filter-priority option');
  prioOptions[0].textContent = t.allPriorities;
  prioOptions[1].textContent = t.priorityHigh;
  prioOptions[2].textContent = t.priorityMedium;
  prioOptions[3].textContent = t.priorityLow;

  // Select de ordenação
  const sortOptions = document.querySelectorAll('#sort-select option');
  sortOptions[0].textContent = t.sortNewest;
  sortOptions[1].textContent = t.sortOldest;
  sortOptions[2].textContent = t.sortPriority;
  sortOptions[3].textContent = t.sortTitle;

  // Botão limpar concluídas
  document.querySelector('#clear-completed').textContent = t.clearCompleted;

  // Modal de edição
  document.querySelector('#edit-modal h2').textContent = t.editTitle;
  document.querySelector('#cancel-edit').textContent = t.cancelButton;
  document.querySelector('#edit-form button[type="submit"]').textContent = t.saveButton;

  // Estado vazio
  document.querySelector('#empty-state h2').textContent = t.emptyStateTitle;
  document.querySelector('#empty-state p').textContent = t.emptyStateMessage;

  // Botão de tema (precisa atualizar também)
  updateThemeButton(document.documentElement.classList.contains('dark'));

  // Re-renderiza as tarefas para atualizar badges e textos dinâmicos
  renderTasks();
}

document.getElementById('lang-select').value = currentLang;
document.getElementById('lang-select').addEventListener('change', (e) => {
  applyLanguage(e.target.value);
});

// Aplicar idioma inicial
applyLanguage(currentLang);

/** Iniciar */
init();