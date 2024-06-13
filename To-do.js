// script.js
document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('todo-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    addTaskToList(task);
    saveTask(task);
    taskInput.value = '';
}

function addTaskToList(task) {
    const taskList = document.getElementById('todo-list');

    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.toggle('completed', task.completed);

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeBtn.addEventListener('click', () => toggleTaskCompletion(task, li, completeBtn));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', () => editTask(task, li));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task, li));

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function toggleTaskCompletion(task, li, button) {
    task.completed = !task.completed;
    li.classList.toggle('completed', task.completed);
    button.textContent = task.completed ? 'Uncomplete' : 'Complete';
    updateLocalStorage();
}

function editTask(task, li) {
    const newTaskText = prompt('Edit task', task.text);
    if (newTaskText !== null) {
        task.text = newTaskText.trim();
        li.childNodes[0].nodeValue = task.text;
        updateLocalStorage();
    }
}

function deleteTask(task, li) {
    li.remove();
    removeTaskFromLocalStorage(task);
}

function saveTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.text !== task.text || t.completed !== task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function updateLocalStorage() {
    const tasks = Array.from(document.getElementById('todo-list').children).map(li => ({
        text: li.childNodes[0].nodeValue,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToList(task));
}
