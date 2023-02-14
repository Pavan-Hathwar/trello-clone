function initialApp() {
  return {
    boards: [],
  };
}

function createBoard(title, id, bgColor) {
  return {
    title: title,
    id: id,
    backgroundColor: bgColor,
    lists: [],
  };
}
function addBoardToApp(app, board) {
  app.boards.push(board);
}

function removeBoard(app, boardId) {
  app.boards.forEach((element, index, object) => {
    if (boardId == element.id) {
      object.splice(index, 1);
    }
  });
  return app;
}
function createList(title, id) {
  return {
    title: title,
    id: id,
    tasks: [],
  };
}
function createtask(task, id) {
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
function findList(board, listId) {
  let returnValue = null;
  board.lists.forEach((element) => {
    if (element.id == listId) {
      returnValue = element;
    }
  });
  return returnValue;
}
function findTask(list, taskId) {
  let returnValue = null;
  list.tasks.forEach((element) => {
    if (element.id == taskId) {
      returnValue = element;
    }
  });
  return returnValue;
}
function removeList(board, listId) {
  board.lists.forEach((element, index, object) => {
    if (listId == element.id) {
      object.splice(index, 1);
    }
  });
  return board.lists;
}
function removeTask(taskId, list) {
  list.tasks.forEach((element, index, object) => {
    if (taskId == element.id) {
      object.splice(index, 1);
    }
  });
}
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
export {
  initialApp,
  createBoard,
  addBoardToApp,
  removeBoard,
  createList,
  createtask,
  addListToBoard,
  addTaskToList,
  findList,
  findTask,
  removeList,
  removeTask,
  findBoard,
};
