let tasks = [];

// Carregar tarefas do LocalStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) tasks = JSON.parse(savedTasks);
  renderTasks();
}

// Salvar no LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Criar elemento de tarefa com Tailwind
function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = `flex items-center gap-4 bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-md ${task.completed ? 'opacity-75' : ''}`;
  div.dataset.id = task.id;

  div.innerHTML = `
    <input type="checkbox" class="task-check w-5 h-5 accent-blue-600 cursor-pointer" ${task.completed ? 'checked' : ''}>
    
    <div class="flex-1 min-w-0">
      <span class="title block text-lg font-medium ${task.completed ? 'line-through text-zinc-400' : ''}">${task.title}</span>
      <span class="category text-sm text-zinc-500 dark:text-zinc-400">${task.category}</span>
    </div>

    <span class="badge px-4 py-1.5 text-xs font-semibold rounded-full 
      ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
      ${task.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
      ${task.priority === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}">
      ${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
    </span>

    <button class="delete-btn w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl transition-all">🗑️</button>
  `;

  // Checkbox
  div.querySelector('.task-check').addEventListener('change', () => {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  });

  // Botão eliminar
  div.querySelector('.delete-btn').addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderTasks();
  });

  return div;
}

// Renderizar lista
function renderTasks(filterText = '') {
  const container = document.getElementById('task-list');
  container.innerHTML = '';

  const filtered = tasks.filter(task => 
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );

  filtered.forEach(task => container.appendChild(createTaskElement(task)));
}

// Adicionar tarefa
document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('task-input').value.trim();
  if (!title) return;

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
});

// Filtro de busca
document.getElementById('search-input').addEventListener('input', (e) => {
  renderTasks(e.target.value);
});

// Dark mode 
const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  toggle.textContent = document.documentElement.classList.contains("dark") ? "Modo Claro" : "Modo Oscuro";
});

// Iniciar
loadTasks();