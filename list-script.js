import {
  createList,
  createtask,
  addListToBoard,
  addTaskToList,
  findList,
  findTask,
  removeList,
  removeTask,
  findBoard,
} from "./Modules/app.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentBoardId = urlParams.get("Id");

const app = JSON.parse(localStorage.getItem("app"));

let canvas = document.getElementById("canvas");
let boardName = document.getElementById("board-name");

const appCurrentBoard = findBoard(app, currentBoardId);
// let currentList;
canvas.style.backgroundColor = appCurrentBoard.backgroundColor;
boardName.innerText = appCurrentBoard.title;

// function findBoard(app, currentBoardId) {
//   let returnValue = null;
//   app.boards.forEach((element) => {
//     // console.log(element.title==currentBoard.title);
//     if (element.id == currentBoardId) {
//       returnValue = element;
//     }
//   });

//   return returnValue;
// }
const listsContainer = document.getElementById("lists-container");

appCurrentBoard.lists.forEach((element) => {
  renderList(listsContainer, element, element.tasks);
});

// function createList(title, id) {
//   return {
//     title: title,
//     id: id,
//     tasks: [],
//   };
// }
// function createtask(task, id) {
//   return {
//     id: id,
//     task: task,
//   };
// }

// function addListToBoard(board, list) {
//   board.lists.push(list);
// }
// function addTaskToList(list, task) {
//   list.tasks.push(task);
// }

let newListForm = document.getElementById("new-list-form");
newListForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formObject = new FormData(newListForm);
  //   for (let entry of formObject) {
  //     console.log(entry);
  //   }
  const newList = createList(formObject.get("newListFormInput"), Date.now());
  console.log(newList);
  const listsContainer = document.getElementById("lists-container");
  renderList(listsContainer, newList);
  addListToBoard(appCurrentBoard, newList);
  localStorage.setItem("app", JSON.stringify(app));

  newListForm.reset();
});

function renderList(parent, list, tasks = []) {
  const li = document.createElement("li");
  li.className = "list-container";
  const header = document.createElement("header");
  header.className = "list-container-header";
  const h2 = document.createElement("h2");
  h2.className = "list-container-header-title";
  h2.innerText = list.title;
  let i = document.createElement("i");
  i.classList.add("material-icons", "list-edit-button");
  i.innerText = "delete";
  i.addEventListener("click", (event) => {
    appCurrentBoard.lists = removeList(appCurrentBoard, list.id);
    localStorage.setItem("app", JSON.stringify(app));
    parent.removeChild(li);
  });
  const ul = document.createElement("ul");
  ul.className = "tasks-container";
  ul.dataset.listId = list.id;
  const form = document.createElement("form");
  form.className = "new-card-form";
  form.dataset.listId = list.id;
  const textarea = document.createElement("textarea");
  textarea.className = "new-card-form-input";
  textarea.setAttribute("type", "text");
  // textarea.type = "text";
  textarea.placeholder = "Enter a title for new card";
  textarea.required = "true";
  textarea.name = "newCardFormInput";

  //   const listidinput=document.createElement("input");
  //   listidinput.style.display="none";
  //   listidinput.name="listId";
  //   listidinput.value=list.id;
  const button = document.createElement("button");
  button.className = "new-card-form-button";
  button.type = "submit";
  button.innerText = "Add card";
  //   add the lisstner for button here
  //   li.addEventListener("click",(event)=>{currentList=list;});

  form.appendChild(textarea);
  //   form.appendChild(listidinput);
  form.appendChild(button);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newTask = createtask(formData.get("newCardFormInput"), Date.now());

    form.reset();
    console.log(formData.get("listId"));
    let currentList = findList(appCurrentBoard, parseInt(form.dataset.listId));
    console.log(currentList);
    renderTask(form.parentElement, newTask);
    addTaskToList(currentList, newTask);
    localStorage.setItem("app", JSON.stringify(app));
  });

  ul.appendChild(form);
  ul.addEventListener("drop", (event) => {
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = event.dataTransfer.getData("text/plain");
    console.log(data);
    console.log(document.getElementById(data));
    let currentList = findList(appCurrentBoard, parseInt(form.dataset.listId));
    let droppedTask=createtask(document.getElementById(data).getElementsByTagName('span')[0].innerText,parseInt(data));
    addTaskToList(currentList,droppedTask);
    localStorage.setItem("app", JSON.stringify(app));
    ul.insertBefore(document.getElementById(data), ul.lastElementChild);
  });
  ul.addEventListener("dragover", dragover_handler);
  for (let i = 0; i < tasks.length; i++) {
    renderTask(ul, tasks[i]);
  }
  header.appendChild(h2);
  header.appendChild(i);

  li.appendChild(header);
  li.appendChild(ul);

  //   li.addEventListener("click",(event)=>{
  //     sessionStorage.setItem("currentList",JSON.stringify(list));
  //   });

  parent.insertBefore(li, parent.lastElementChild);
}
// function findList(board, listId) {
//   let returnValue = null;
//   board.lists.forEach((element) => {
//     if (element.id == listId) {
//       returnValue = element;
//     }
//   });
//   return returnValue;
// }
// function findTask(list, taskId) {
//   let returnValue = null;
//   list.tasks.forEach((element) => {
//     if (element.id == taskId) {
//       returnValue = element;
//     }
//   });
//   return returnValue;
// }
const newCardFormList = document.getElementsByClassName("new-card-form");
// console.log(newCardFormList[0]);

// newCardFormList.forEach(element => {
//     element.addEventListener("submit",(event)=>{
//         const formData=new FormData(element);
//         const newTask=createtask(formData.get("newCardFormInput"));
//         renderTask(element.parent,newTask);

//     });

// });

// for (let i = 0; i < newCardFormList.length; i++) {
//     newCardFormList[i].addEventListener("submit",(event)=>{
//                 event.preventDefault();
//                 const formData=new FormData(newCardFormList[i]);
//                 const newTask=createtask(formData.get("newCardFormInput"));
//                 console.log(newTask);
//                 renderTask(newCardFormList[i].parentElement,newTask);
//                 newCardFormList[i].reset();
//                 addTaskToList(currentList,newTask);
//                 localStorage.setItem("app", JSON.stringify(app));

//             });

// }

function renderTask(parent, newTask) {
  const li = document.createElement("li");
  li.draggable = "true";
  li.className = "task";
  li.id = newTask.id;
  const i = document.createElement("i");
  i.classList.add("material-icons", "task-edit-button");
  i.innerText = "delete";
  let currentList = findList(appCurrentBoard, parseInt(parent.dataset.listId));
  i.addEventListener("click", (event) => {
    console.log(currentList);
    removeTask(newTask.id, currentList);
    parent.removeChild(li);
    localStorage.setItem("app", JSON.stringify(app));
  });
  li.appendChild(i);
  const span = document.createElement("span");
  span.innerText = newTask.task;
  const textarea = document.createElement("textarea");
  textarea.value = newTask.task;
  textarea.style.fontFamily = "sans-serif";
  textarea.style.display = "none";
  span.addEventListener("click", (event) => {
    event.target.style.display = "none";
    textarea.style.display = "block";
  });
  textarea.addEventListener("blur", (event) => {
    event.target.style.display = "none";
    span.style.display = "block";
    span.innerText = event.target.value;
    let currentTask = findTask(currentList, parseInt(newTask.id));
    currentTask.task = event.target.value;
    localStorage.setItem("app", JSON.stringify(app));
  });
  li.appendChild(span);
  li.appendChild(textarea);
  console.log(li);
  li.addEventListener("dragstart", (event)=>{
    event.dataTransfer.setData("text/plain", event.target.id);
    removeTask(newTask.id,currentList);
    localStorage.setItem("app", JSON.stringify(app));
  });
  parent.insertBefore(li, parent.lastElementChild);
}
// function removeList(board, listId) {
//   board.lists.forEach((element, index, object) => {
//     if (listId == element.id) {
//       object.splice(index, 1);
//     }
//   });
//   return board.lists;
// }
// function removeTask(taskId, list) {
//   list.tasks.forEach((element, index, object) => {
//     if (taskId == element.id) {
//       object.splice(index, 1);
//     }
//   });
// }

// function dragStart(ev) {
//   // Specify the item and data type being dragged
//   ev.dataTransfer.clearData();
//   ev.dataTransfer.setData("text/plain", ev.target.id);
//   console.log(ev.dataTransfer.getData("text"));
// }
// function allowDrop(ev) {
//   // Critical. This is what tells the browser to allow drop
//   ev.preventDefault();
// }
// function dropIt(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   const source = document.getElementById(data);
//   console.log(data);
//   ev.target.appendChild(source);
// }

// function dragstart_handler(ev) {
//   // Add the target element's id to the data transfer object
//   ev.dataTransfer.setData("text/plain", ev.target.id);
// }
// let t1 = document.getElementById("t1");
// let t2 = document.getElementById("t2");
// let t3 = document.getElementById("t3");
// t1.addEventListener("dragstart", dragstart_handler);
// t2.addEventListener("dragstart", dragstart_handler);
// t3.addEventListener("dragstart", dragstart_handler);
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
// function drop_handler(ev) {
//   ev.preventDefault();
//   // Get the id of the target and add the moved element to the target's DOM
//   const data = ev.dataTransfer.getData("text/plain");
//   ev.target.insertBefore(
//     document.getElementById(data),
//     ev.target.lastElementChild
//   );
// }
// let l1 = document.getElementById("l1");
// l1.addEventListener("drop", (event) => {
//   event.preventDefault();
//   // Get the id of the target and add the moved element to the target's DOM
//   const data = event.dataTransfer.getData("text/plain");
//   console.log(data);
//   console.log(document.getElementById(data));
//   l1.insertBefore(document.getElementById(data), l1.lastElementChild);
// });
// l1.addEventListener("dragover", dragover_handler);
