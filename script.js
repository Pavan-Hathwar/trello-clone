function initialApp() {
  return {
    boards: [],
  };
}

function createBoard(title, bgColor) {
  return {
    title: title,
    backgroundColor: bgColor,
    lists: [],
  };
}

function addBoardToApp(app, board) {
  app.boards.push(board);
}

function renderBoard(parent, board) {
  const li = document.createElement("li");
  li.innerText = board.title;
  li.style.backgroundColor = board.backgroundColor;
  li.className = "board";
  li.addEventListener("click", () => {
    const url="list.html";
    sessionStorage.setItem("currentBoard",JSON.stringify(board));
    window.location.href=url;
  });
  parent.insertBefore(li, parent.lastElementChild);
}

let app;
// Use hex code
let backgroundColors = [
  "#6d0c33",
  "#2d5007",
  "#2c0c6d",
];
let modalTemplateContainer = document.getElementById(
  "modal-template-container"
);
let boardColor = backgroundColors[0];
// document.getElementsByClassName("board")[1].style.backgroundColor=backgroundColorList[0];
// class board {
//     constructor(parent, boardName,boardColor) {
//       this.parent = parent;
//       this.boardName = boardName;
//       this.boardColor = boardColor;
//       this.lists = [];
//       this.createBoard();
//       this.appendBoard();
//     }
//     createBoard() {
//       this.li = document.createElement("li");
//       this.li.innerText = this.boardName;
//       this.li.style.backgroundColor=this.boardColor;
//       this.li.className = "board";
//       this.li.addEventListener("click", () => {
//         alert(this.boardName);
//       });
//     }
//     appendBoard() {
//       this.parent.insertBefore(this.li,this.parent.lastElementChild);
//     }
// }

backgroundColors.forEach((element) => {
  let lable = document.createElement("label");
  lable.className = "modal-template";
  //   lable.name = element;
  lable.style.backgroundColor = element;
  let radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.name = "colors";
  radioButton.value = element;
  radioButton.addEventListener("click", (event) => {
    boardColor = event.target.value;
  });
  radioButton.id = element;
  lable.for = radioButton.id;
  lable.setAttribute("for", element);
  modalTemplateContainer.append(radioButton);
  modalTemplateContainer.append(lable);
});

document.getElementById(backgroundColors[0]).defaultChecked = true;

// let templateList = document.getElementsByClassName("modal-template");
// for (let i = 0; i < templateList.length; i++) {
//   templateList[i].addEventListener("click", (event) => {
//     alert("hi");
//     boardColor = templateList[i].style.backgroundColor;
//   });
// }

let newBoardForm = document.getElementById("new-board-form");
newBoardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formObject = new FormData(newBoardForm);
  //   for (let entry of formObject) {
  //     console.log(entry);
  //   }
  const newBoard = createBoard(
    formObject.get("newBoardFormInput"),
    formObject.get("colors")
  );
  const boardContainer = document.getElementById("board-list");
  renderBoard(boardContainer, newBoard);
  addBoardToApp(app, newBoard);
  sessionStorage.setItem("app", JSON.stringify(app));
  let formButton = document.getElementsByClassName("new-board-form-button")[0];
  formButton.setAttribute("disabled", "true");
  newBoardForm.reset();
  console.log(app);

  closeModal();
});

function newBoardModal() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.visibility = "visible";
}

function closeModal() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.visibility = "hidden";
}



function boardNameValidation(val) {
  let formButton = document.getElementsByClassName("new-board-form-button")[0];
  let boardNameValidationMessage = document.getElementsByClassName(
    "new-board-form-input-message"
  )[0];
  if (val.trim() == "") {
    formButton.disabled = true;
    boardNameValidationMessage.style.visibility = "visible";
  } else {
    formButton.disabled = false;
    boardNameValidationMessage.style.visibility = "hidden";
  }
}

window.onload = function () {
  if (!("app" in sessionStorage)) {
    app = initialApp();
    sessionStorage.setItem("app", JSON.stringify(app));
    console.log("initial time");
  } else {
    console.log("refresh time");

    app = JSON.parse(sessionStorage.getItem("app"));
    console.log(app);
    const boardContainer = document.getElementById("board-list");
    app.boards.forEach((element) => {
      renderBoard(boardContainer, element);
    });
  }
};
