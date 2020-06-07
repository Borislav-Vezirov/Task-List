let form        = document.querySelector('.btn-info');
let input       = document.querySelector('#task');
let filter      = document.querySelector('#filter');
let ul          = document.querySelector('.list-group');
let clearTasks  = document.querySelector('.btn-dark');

form       .addEventListener('click', addTask);
ul         .addEventListener('click', removeTask);
clearTasks .addEventListener('click', clearAllTasks);
filter     .addEventListener('keyup', filterTasks);

document   .addEventListener('DOMContentLoaded', getTasks);

function getTasks() {
    
    let tasks

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }  else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {

        let li         = document.createElement('li');

        li.className   = 'list-group-item';
        
        li.appendChild(document.createTextNode(task));

        let link       = document.createElement('a');

        link.className = 'link';

        link.innerHTML = '<i class="fas fa-trash-alt float-right"></i>';

        li.appendChild(link);

        ul.appendChild(li);
    });
}
function addTask(e) {

    e.preventDefault();

    if(input.value === "") {
        alert('You must write something..');
    } else {
      
        let li         = document.createElement('li');

        li.className   = 'list-group-item';
        
        li.appendChild(document.createTextNode(input.value));

        let link       = document.createElement('a');

        link.className = 'link';

        link.innerHTML = '<i class="fas fa-trash-alt float-right"></i>';

        li.appendChild(link);

        ul.appendChild(li);

        storeTaskInLocalStorage(input.value);
        
        input.value    = "";
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

function filterTasks(e) {
    let text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.list-group-item').forEach(function(task){
      let item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }

function removeTask(e) {

    if(e.target.parentElement.classList.contains('link')) {
        if(confirm('Are you sure you want to delete the task?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {

    let tasks;

    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTasks() {

    if(confirm('Are you sure you want to delete all tasks?')) {

        ul.textContent = '';

        clearTasksFromLocalStorage();

    }
}

function clearTasksFromLocalStorage() {

    localStorage.clear();
}















