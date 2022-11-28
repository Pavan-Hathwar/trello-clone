// State of application at t1
function initialApp() {
  return {
    boards: [],
  };
}

function createBoard(title, bgColor) {
  return {
    title,
    bgColor,
    lists: [],
  };
}

function createList(title) {
  return {
    title,
    tasks: [],
  };
}

function addTaskToList(list, task) {
  list.tasks.push(task);
}

function addListToBoard(board, list) {
  board.lists.push(list);
}

function addBoardToApp(app, board) {
  app.boards.push(board);
}
const app = initialApp();
const board1 = createBoard("b1", "#fff");
const list1 = createList("l1");
const task1 = "t1";
addTaskToList(list1, task1);
addListToBoard(board1, list1);
addBoardToApp(app, board1);
console.log(app);

function renderTask(task) {
  const taskLi = document.createElement("li");
  taskLi.innerHTML = task;
  return taskLi;
}

function renderList(list) {
  const listUl = document.createElement("ul");
  list.tasks.forEach((task) => {
    const taskLi = renderTask(task);
    listUl.appendChild(taskLi);
  });
  return listUl;
}
