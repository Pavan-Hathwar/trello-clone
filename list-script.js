const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentBoardId = urlParams.get('Id');

const app = JSON.parse(localStorage.getItem("app"));

let canvas = document.getElementById("canvas");
let boardName = document.getElementById("board-name");

const appCurrentBoard = findBoard(app, currentBoardId);
let currentList;
canvas.style.backgroundColor = appCurrentBoard.backgroundColor;
boardName.innerText = appCurrentBoard.title;

function findBoard(app, currentBoardId) {
  let returnValue = null;
  app.boards.forEach((element) => {
    // console.log(element.title==currentBoard.title);
    if (element.id == currentBoardId) {
      returnValue = element;
    }
  });

  return returnValue;
}
const listsContainer = document.getElementById("lists-container");

appCurrentBoard.lists.forEach((element) => {
  renderList(listsContainer, element, element.tasks);
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
  addListToBoard(appCurrentBoard, newList);
  localStorage.setItem("app", JSON.stringify(app));

  newListForm.reset();
});

function renderList(parent, list ,tasks=[]) {
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
  textarea.name="newCardFormInput"
  const button = document.createElement("button");
  button.className = "new-card-form-button";
  button.type = "submit";
  button.innerText = "Add card";
//   add the lisstner for button here            
  li.addEventListener("click",(event)=>{currentList=list;});

  form.appendChild(textarea);
  form.appendChild(button);

  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData=new FormData(form);
    const newTask=createtask(formData.get("newCardFormInput"));
    renderTask(form.parentElement,newTask);
    form.reset();
    addTaskToList(currentList,newTask);
    localStorage.setItem("app", JSON.stringify(app));

    });

  ul.appendChild(form);

   
    for (let i = 0; i < tasks.length; i++) {
        renderTask(ul,tasks[i]);
        
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
  li.className = "task";
  const i = document.createElement("i");
  i.classList.add("material-icons", "task-edit-button");
  i.innerText = "create";
  li.appendChild(i);
  const span=document.createElement("span");
  span.innerText=newTask.task;
  li.appendChild(span);
  console.log(li);
  parent.insertBefore(li, parent.lastElementChild);
}
