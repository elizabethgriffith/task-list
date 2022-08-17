// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners(){
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
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

  // Clear input
  taskInput.value = ''

  e.preventDefault()
}

// Remove task
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove()
  }
}