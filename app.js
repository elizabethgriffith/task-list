// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners(){
  // Get tasks from local storage when page loads
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear task list event
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks)
  
}

// Get tasks from local storage
function getTasks(){
  let tasks 
  if (localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // Create list item element and add class value
    const li = document.createElement('li')
    li.className = 'collection-item'
    // Create text node and append to LI
    li.appendChild(document.createTextNode(task))
    // Create new link element and all class
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    // Append link to the li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li)

  })
}

function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task')
  }

  // Create list item element and add class value
  const li = document.createElement('li')
  li.className = 'collection-item'
  // Create text node and append to LI
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link element and all class
  const link = document.createElement('a')
  link.className = 'delete-item secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  // Append link to the li
  li.appendChild(link)


  // Append li to ul
  taskList.appendChild(li)

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value)

  // Clear input
  taskInput.value = ''

  e.preventDefault()
}

// Store task in local storage function
function storeTaskInLocalStorage(task){
  let tasks 
  if (localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()
      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove task from ls 
function removeTaskFromLocalStorage(taskItem){
  let tasks 
  if (localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear task list
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }

  // Clear from LS
  clearTasksFromLocalStorage()
}

// Clear all tasks from LS

function clearTasksFromLocalStorage(){
  localStorage.clear()
}

// Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function (task){
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}