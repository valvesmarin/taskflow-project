let tasks = []

const priorityStyles = {
high:"bg-red-100 text-red-700 dark:bg-red-900/30",
medium:"bg-amber-100 text-amber-700 dark:bg-amber-900/30",
low:"bg-green-100 text-green-700 dark:bg-green-900/30"
}

function loadTasks(){

const saved = localStorage.getItem("tasks")

if(saved){

tasks = JSON.parse(saved)

}

renderTasks()

}

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks))

}

function createTaskElement(task){

const div = document.createElement("div")

div.className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg shadow"

div.innerHTML=`

<div>

<p class="font-medium ${task.completed ? "line-through text-zinc-400":""}">${task.title}</p>

<span class="text-sm text-zinc-500">${task.category}</span>

</div>

<span class="px-3 py-1 text-xs rounded-full ${priorityStyles[task.priority]}">

${task.priority}

</span>

<button class="delete text-red-500 hover:text-red-700">🗑</button>

`

div.querySelector(".delete").addEventListener("click",()=>{

tasks=tasks.filter(t=>t.id!==task.id)

saveTasks()

renderTasks()

})

return div

}

function renderTasks(filter=""){

const container=document.getElementById("task-list")

container.innerHTML=""

tasks

.filter(t=>t.title.toLowerCase().includes(filter.toLowerCase()))

.forEach(task=>{

container.appendChild(createTaskElement(task))

})

}

document.getElementById("task-form").addEventListener("submit",e=>{

e.preventDefault()

const title=document.getElementById("task-input").value.trim()

if(!title)return

tasks.unshift({

id:Date.now(),

title,

category:document.getElementById("category-select").value,

priority:document.getElementById("priority-select").value,

completed:false

})

saveTasks()

renderTasks()

e.target.reset()

})

document.getElementById("search-input").addEventListener("input",e=>{

renderTasks(e.target.value)

})

loadTasks()