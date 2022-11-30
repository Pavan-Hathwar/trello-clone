const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentBoardId = urlParams.get('Id');

const app = JSON.parse(localStorage.getItem("app"));

let canvas = document.getElementById("canvas");
let boardName = document.getElementById("board-name");

const appCurrentBoard = findBoard(app, currentBoardId);
// let currentList;
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

function createList(title,id) {
  return {
    title: title,
    id: id,
    tasks: [],
  };
}
function createtask(task,id) {
  return {
    id: id,
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
  const newList = createList(formObject.get("newListFormInput"),Date.now());
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
  i.innerText = "delete";
  i.addEventListener("click",(event)=>{
    appCurrentBoard.lists=removeList(appCurrentBoard,list.id);
    localStorage.setItem("app", JSON.stringify(app));
    parent.removeChild(li);

  });
  const ul = document.createElement("ul");
  ul.className = "tasks-container";
  ul.dataset.listId=list.id;
  const form = document.createElement("form");
  form.className = "new-card-form";
  form.dataset.listId=list.id;
  const textarea = document.createElement("textarea");
  textarea.className = "new-card-form-input";
  textarea.type = "text";
  textarea.placeholder = "Enter a title for new card";
  textarea.required = "true";
  textarea.name="newCardFormInput"

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

  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData=new FormData(form);
    const newTask=createtask(formData.get("newCardFormInput"),Date.now());
    
    form.reset();
    console.log(formData.get("listId"));
    let currentList=findList(appCurrentBoard,parseInt(form.dataset.listId))
    console.log(currentList);
    renderTask(form.parentElement,newTask);
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
function findList(board,listId){
    let returnValue=null;
    board.lists.forEach(element => {
        
        if(element.id==listId){
            
            returnValue = element;
        }
        
    });
    return returnValue;
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
  i.innerText = "delete";
  i.addEventListener("click",(event)=>{
    let currentList=findList(appCurrentBoard,parseInt(parent.dataset.listId));
    console.log(currentList);
    removeTask(newTask.id,currentList);
    parent.removeChild(li);
    localStorage.setItem("app", JSON.stringify(app));
  });
  li.appendChild(i);
  const span=document.createElement("span");
  span.innerText=newTask.task;
  li.appendChild(span);
  console.log(li);
  parent.insertBefore(li, parent.lastElementChild);
}
function removeList(board,listId){
    board.lists.forEach((element,index,object) => {
        if(listId==element.id){
            object.splice(index,1);
        }
        
    });
    return board.lists;
}
function removeTask(taskId,list){
    list.tasks.forEach((element,index,object) => {
        if(taskId==element.id){
            object.splice(index,1);
        }
        
    });

}
