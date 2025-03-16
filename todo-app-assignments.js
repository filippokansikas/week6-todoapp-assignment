console.log(">>> Loading todo-app.js");

// Gli elementi HTML in ordine di comparsa
const todoInputElem = document.getElementById('text-todo');
let addBtnElem = document.getElementById("btn-add-todo");
const todoListElem = document.getElementById('todo-list'); // questo e' <UL>

let todoList = [];  // questo e' il nostro modello. Un array di oggetti. Ogni oggetto e' un TODO

// questa funzione crea un nuovo elemento <LI> e lo aggiunge alla lista <UL>
function aggiungiTodoAllaLista(todoObj){
  // Creo un nuovo <LI> - questo NON e' ancora dentro il DOM - e' solo JS - NON e' visibile
  const listItemElem = document.createElement('li');

  // aggiungo una checkbox e il testo ad esso
  const checkboxElem = document.createElement('input');
  checkboxElem.type = 'checkbox';
  checkboxElem.checked = todoObj.done; // Set initial checked state
  checkboxElem.addEventListener('change', function() {
      todoObj.done = checkboxElem.checked; // Update the completed status in the array
      refreshTodolistElements(); // Re-render to update styles
  });

  listItemElem.appendChild(checkboxElem);
  listItemElem.append(todoObj.textTodo);

  // infine lo aggiungo alla lista <UL> del DOM
  todoListElem.appendChild(listItemElem); // ORA LI e' NEL DOM --> e' visibile!
}

// quando questa funzione e' chiamata effettua un
// refresh parziale della pagina
// aggiornando la lista <LI> dei TODOs
function refreshTodolistElements() {
  todoListElem.innerText = ''; // svuoto il contenuto della lista <UL>
  todoList.forEach(aggiungiTodoAllaLista); // uno alla volta aggiungo i TODO
}

// l'event handler del click sul pulsante "Add todo"
// questa funzione viene chiamata ogni volta che clicchiamo su "Add todo"
function onAddTodoClick() {
  // Update the todoList model by adding a new TODO item
  const inputFieldValue = todoInputElem.value;  // prendo il testo dalla UI
  const todoItem = { done: false, textTodo: inputFieldValue }; // creo un oggetto che rappresenta un nuovo TODO
  todoList.push(todoItem); // aggiungo il nuovo TODO alla lista - questo e' un semplice array JavaScript
  todoInputElem.value = '';
  // Refresh the list in the UI
  refreshTodolistElements();  // chiamo una funzione che si preoccupera' di popolare la lista con il contenuto dell'array
}
addBtnElem.addEventListener('click', onAddTodoClick);

let footerTextElem = document.getElementById("lbl-footer-text");

function regClickEvent(id, handler) {
  let elem = document.getElementById(id);
  elem.addEventListener('click', handler);
}

// loops
regClickEvent("btn-delete-last-added", onDeleteLastAddedItem);
regClickEvent("btn-reverse-todo", onReverseBtnClick);
regClickEvent("btn-hide-done", onHideDoneTaskElemClick);
regClickEvent("btn-show-done-last", onShowDoneAtTheBottomClick);
regClickEvent("btn-mark-all-as-done", onMarkAllAsDoneClick);
regClickEvent("btn-mark-all-as-not-done", onMarkAllAsNotDoneClick);
regClickEvent("btn-show-only-short-tasks", onShowOnlyShortTasks);

// iterators
regClickEvent("btn-show-open-iterators", onShowOpenTasksIterator);
regClickEvent("btn-add-idx-to-task-iterators", onAddIndexToDescriptionsIterator);
regClickEvent("btn-count-completed-iterators", onCountCompletedTasksIterator);
regClickEvent("btn-print-description-iterators", onPrintTaskDescriptionsIterator);
regClickEvent("btn-show-only-short-tasks-iterators", onShowOnlyShortTasksIterator);
regClickEvent("btn-calc-stats", onCalcStatsClick);



todoInputElem.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      onAddTodoClick();
  }
});
todoInputElem.focus();


// --------------------------------------------------------------
// Array & loops ------------------------------------------------
// --------------------------------------------------------------


function onDeleteLastAddedItem() {
  console.log("delete last added item");
  todoList.pop(); // Remove the last item from the array
  const list = document.getElementById("todo-list"); // Get the unordered list
  if (list.lastElementChild) { 
      list.removeChild(list.lastElementChild); // Remove the last added item
  }
  for(let i = 0; i < todoList.length; i++) {
  console.log("Todos: ", todoList[i]); // Print the updated list to the console
  }
}

function onReverseBtnClick() {
  console.log("reverse the order of the list");
  // write your code here below...
  // 1. use the array function reverse()
  // 2. print the list of the items to the console using a "while" loop
  const list = document.getElementById("todo-list");
    const items = Array.from(list.children);
    list.innerHTML = ""; // Clear the list
    items.reverse().forEach(item => list.appendChild(item)); 
    todoList.reverse()
    let i = 0;
    while (i < todoList.length){
      console.log(todoList[i]);
      i++;
    }

}

function onHideDoneTaskElemClick() {
  console.log("hide completed tasks");
  let filteredTasks = [];

  for (const task of todoList) {
      if (!task.done) {
          filteredTasks.push(task); // Keep only incomplete tasks
      }
      
  }

  console.log("Todos: ", filteredTasks); // Print the filtered list to the console
  return filteredTasks;
  // write your code here below...

  // 1. print the list of NOT completed tasks using the "for .. of" loop
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  
  
  
 // Return a new array without completed tasks

}



function onShowDoneAtTheBottomClick() {
  console.log("Show completed tasks at the bottom")
  // Completed tasks show be shown at the bottom of the list
  // write your code here below...
  // 1. loop over the tasks and print only the not completed
  for (const task of todoList) {
    if (!task.done) {
        console.log(task); // Print the incomplete tasks to the console
    }
  }
  for (const task of todoList) {
    if (task.done) {
      let index = todoList.indexOf(task);

        console.log(task); // Print the complete tasks to the console
    }
    const list = document.getElementById('todo-list'); // Get the unordered list
    const items = Array.from(list.children); // Get all list items as an array
  
    // Filter out the checked items and the unchecked ones
    const checkedItems = items.filter(item => item.querySelector('input').checked);
    const uncheckedItems = items.filter(item => !item.querySelector('input').checked);
  
    // Clear the list
    list.innerHTML = '';
  
    // Append the unchecked items first
    uncheckedItems.forEach(item => list.appendChild(item));
  
    // Append the checked items next
    checkedItems.forEach(item => list.appendChild(item));
  }
}
  // 2. loop again over the tasks and print the completed ones

  

function onMarkAllAsDoneClick() {
  console.log("Mark all task as done")
  // write your code here below...
  // 1. loop over all the tasks and update the "done" property to "true"
  // 2. print the todoList array to console using
  //    console.log("Todos: ", todoList);   // NOTE the use of the comma "," instead of the plus "+"
  for (let i = 0; i < todoList.length; i++) {
    todoList[i].done = true;
  }
  refreshTodolistElements();
  console.log("Todos: ", todoList);

}

function onMarkAllAsNotDoneClick() {
  console.log("Mark all task as NOT done")
  // write your code here below...
  for (let i = 0; i < todoList.length; i++) {
    todoList[i].done = false;
  }
  refreshTodolistElements();
  console.log("Todos: ", todoList);

}

function onShowOnlyShortTasks() {
  console.log("Show only tasks with a short description (less than 10 characters)");
  // write your code here below...
  // 1. Use a for loop to iterate through the todoList array.
  // 2. Inside the loop, use the continue keyword to skip tasks with descriptions longer than 10 characters.
  // 3. Print the short tasks to the console.

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].textTodo.length >= 10) {
       delete todoList[i];// Push to new array if text is less than 10 chars

  }
  refreshTodolistElements();

  console.log("Todos: ", todoList); // Print the short tasks to the console
  }
}


// --------------------------------------------------------------
// Array & Iterators --------------------------------------------
// --------------------------------------------------------------

function onShowOpenTasksIterator() {
  console.log("Show only open tasks using iterators");
  const openTasks = todoList.filter(task => !task.done);
  // write your code here below...
  // 1. Use the filter() method to create a new array containing only the open tasks.
  // 2. Print the new array to the console
 
  todoList = openTasks;
  refreshTodolistElements();
  console.log("Open tasks: ", openTasks);
  
}

function onAddIndexToDescriptionsIterator() {
  console.log("Add the task index to each description using iterators");
  // write your code here below...
  // 1. Use the map() method to create a new array where each task's description is modified to include its index.
  // 2. Print the new array to the console.
  // example: "0: Buy groceries", "1: Clean the house"
  const indexedDescriptions = todoList.map((task, index) => `${index}: ${task.textTodo}`);

  // 2. Print the new array to the console
  console.log(indexedDescriptions);
}

function onCountCompletedTasksIterator() {
  console.log("Count the number of completed tasks using iterators");
  // write your code here below...
  // 1. Use the reduce() method to count the number of tasks where 'done' is true.
  // 2. Print the count to the console.
  const completedTasksCount = todoList.reduce((count, task) => {
    return task.done ? count + 1 : count;
}, 0); 
console.log("Completed tasks: ", completedTasksCount);
refreshTodolistElements();
}

function onPrintTaskDescriptionsIterator() {
  if (Array.isArray(todoList) && todoList.length > 0) {
    // 1. Use forEach() to iterate through the todoList array
    todoList.forEach((task, index) => {
        // 2. Check if task.text exists to avoid undefined values
        if (task.textTodo !== undefined) {
            console.log(`${index}. ${task.textTodo}`);
        } else {
            console.warn(`Warning: Task at index ${index} has no 'text' property.`);
        }
    });
} else {
    console.error("Error: todoList is not defined or empty.");
}

}

function onShowOnlyShortTasksIterator() {
  console.log("Get descriptions of short (less than 10 characters) and open tasks using chained iterators");
  // write your code here below...
  // 1. Use filter() to filter out the open tasks
  // 2. Use filter() again to filter out the short tasks.
  // 3. use map() to create an array of only the description of the remaining tasks.
  // 4. print the array of description.
  const openTasks = todoList.filter(task => task.done === false);
  const shortOpenTasks = openTasks.filter(task => task.textTodo.length < 10);
const shortOpenTaskDescriptions = shortOpenTasks.map(task => task.textTodo);
console.log("Descriptions of short and open tasks:", shortOpenTaskDescriptions);

}

function onCalcStatsClick() {
  console.log("Calculate and display all your task statistics")

  // Calculate and display statistics like:
  // - total number of tasks
  // - number of completed tasks
  //
  // write your code here below...
  // 1 declare two number variables "numberOfTasks" and "completedTasks"
  // 2 iterate over the todoList array using a "for" loop
  //    and then inside the for block..
  //    2.1  increment the numberOfTasks var by 1 using the "++" operator
  //    2.2  if the task is completed then increment the completedTasks var by 1
  // 3. after the loop print to the console the two variables values
  // write your code here below


  // Advanced
  // 1. reimplement this logic using reduce()
  // 2. print first the result to console.log
  // 2. then show the stats in the DOM using footerTextElem ... innerText
let numberOfTasks = 0;
let completedTasks = 0;

  for (let i = 0; i < todoList.length; i++) {
    numberOfTasks++; // 2.1 Increment total tasks
    if (todoList[i].done) {
        completedTasks++; // 2.2 Increment completed tasks
    }
}
console.log("Total tasks:", numberOfTasks);
console.log("Completed tasks:", completedTasks);

footerTextElem.innerText = `Total tasks: ${numberOfTasks}, Completed tasks: ${completedTasks}`;
}

