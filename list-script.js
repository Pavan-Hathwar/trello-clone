const currentBoard = JSON.parse(sessionStorage.getItem("currentBoard"));
const app = JSON.parse(sessionStorage.getItem("app"));
let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = currentBoard.backgroundColor;
let boardName = document.getElementById("board-name");
boardName.innerText = currentBoard.title;

const appCurrentBoard = findBoard(app, currentBoard);

function findBoard(app, currentBoard) {
  let returnValue = null;
  app.boards.forEach((element) => {
    // console.log(element.title==currentBoard.title);
    if (element.title == currentBoard.title) {
      returnValue = element;
    }
  });

  return returnValue;
}
const listsContainer = document.getElementById("lists-container");

currentBoard.lists.forEach((element) => {
  renderList(listsContainer, element);
});

function createList(title) {
  return {
    title: title,
    tasks: [],
  };
}
function createtask(task) {
  return {
    task: task,
  };
}

function addListToBoard(board, list) {
  board.lists.push(list);
}
function addTaskToList(list, task) {
  list.tasks.push(task);
}

let newListForm = document.getElementById("new-list-form");
newListForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formObject = new FormData(newListForm);
  //   for (let entry of formObject) {
  //     console.log(entry);
  //   }

  const newList = createList(formObject.get("newListFormInput"));
  console.log(newList);
  const listsContainer = document.getElementById("lists-container");
  renderList(listsContainer, newList);
  addListToBoard(currentBoard, newList);
  addListToBoard(appCurrentBoard, newList);
  sessionStorage.setItem("currentBoard", JSON.stringify(currentBoard));
  sessionStorage.setItem("app", JSON.stringify(app));

  newListForm.reset();
});

function renderList(parent, list) {
  const li = document.createElement("li");
  li.className = "list-container";
  const header = document.createElement("header");
  header.className = "list-container-header";
  const h2 = document.createElement("h2");
  h2.className = "list-container-header-title";
  h2.innerText = list.title;
  let i = document.createElement("i");
  i.classList.add("material-icons", "list-edit-button");
  i.innerText = "more_horiz";
  const ul = document.createElement("ul");
  ul.className = "tasks-container";
  const form = document.createElement("form");
  form.className = "new-card-form";
  const textarea = document.createElement("textarea");
  textarea.className = "new-card-form-input";
  textarea.type = "text";
  textarea.placeholder = "Enter a title for new card";
  textarea.required = "true";
  const button = document.createElement("button");
  button.className = "new-card-form-button";
  button.type = "submit";
  button.innerText = "Add card";

  form.appendChild(textarea);
  form.appendChild(button);

  ul.appendChild(form);

  //   form.addEventListener("submit",(event)=>{
  //     event.preventDefault();
  //     console.log(new FormData(form));
  //     const formData=new FormData(form);
  //     console.log(formData.get("newCardFormInput"));
  //     const newTask=createtask(formData.get("newCardFormInput"));
  //     console.log("newtask"+newTask);
  //     renderTask(form.parent,newTask);

  //     });

  header.appendChild(h2);
  header.appendChild(i);

  li.appendChild(header);
  li.appendChild(ul);

  //   li.addEventListener("click",(event)=>{
  //     sessionStorage.setItem("currentList",JSON.stringify(list));
  //   });

  parent.insertBefore(li, parent.lastElementChild);
}

const newCardFormList = document.getElementsByClassName("new-card-form");
// console.log(newCardFormList[0]);

// newCardFormList.forEach(element => {
//     element.addEventListener("submit",(event)=>{
//         const formData=new FormData(element);
//         const newTask=createtask(formData.get("newCardFormInput"));
//         renderTask(element.parent,newTask);

//     });

// });

function renderTask(parent, newTask) {
  const li = document.createElement("li");
  li.className = "task";
  const i = document.createElement("i");
  i.classList.add("material-icons", "task-edit-button");
  i.innerText = "create";
  li.appendChild(i);
  li.appendChild(newTask.task);
  parent.insertBefore(li, parent.lastElementChild);
}
