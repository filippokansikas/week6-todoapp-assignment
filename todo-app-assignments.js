// script.js
let tasks = [];

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false });
        taskInput.value = "";
        displayTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    sortTasks();
    displayTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function sortTasks() {
    tasks.sort((a, b) => a.completed - b.completed);
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<input type='checkbox' ${task.completed ? "checked" : ""} onchange='toggleTask(${index})'> 
                        <span style='text-decoration: ${task.completed ? "line-through" : "none"};'>${task.text}</span> 
                        <button class='delete-btn' onclick='removeTask(${index})'>X</button>`;
        taskList.appendChild(li);
    });
}