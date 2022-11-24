let backgroundColorList=["rgb(109, 12, 51)","rgb(45, 80, 7)","rgb(44, 12, 109)"]
let modalTemplateContainer=document.getElementsByClassName("modal-template-container")[0];
let boardColor=backgroundColorList[0];
// document.getElementsByClassName("board")[1].style.backgroundColor=backgroundColorList[0];
class board {
    constructor(parent, boardName,boardColor) {
      this.parent = parent;
      this.boardName = boardName;
      this.boardColor=boardColor;
      this.lists = [];
      this.createBoard();
      this.appendBoard();
    }
    createBoard() {
      this.li = document.createElement("li");
      this.li.innerText = this.boardName;
      this.li.style.backgroundColor=this.boardColor;
      this.li.className = "board";
      this.li.addEventListener("click", () => {
        alert(this.boardName);
      });
    }
    appendBoard() {
      this.parent.insertBefore(this.li,this.parent.lastElementChild);
    }
}


backgroundColorList.forEach(element => {
    let lable=document.createElement("div");
    lable.className="modal-template";
    lable.name=element;
    lable.style.backgroundColor=element;
    modalTemplateContainer.append(lable);
});

let templateList=document.getElementsByClassName("modal-template");
for(let i=0;i<templateList.length;i++){
    templateList[i].addEventListener('click',(event)=>{
        boardColor=templateList[i].style.backgroundColor;
        
    }
    );
}
(event)=>{boardColor=templateList[i].style.backgroundColor;}
function backgroundSelector(){
    alert(this.style.backgroundColor);
}

let newBoardForm = document.getElementsByClassName("new-board-form")[0];
newBoardForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    let boardContainer = document.getElementsByClassName("board-list")[0];
    let boardName=newBoardForm.elements["newBoardFormInput"].value;
    new board(boardContainer, boardName,boardColor);
    closeModal();
    newBoardForm.elements["newBoardFormInput"].value="";
    newBoardForm.elements["createButton"].disabled="true";
    boardColor=backgroundColorList[0];


});

function newBoardModal() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.visibility = "visible";
}

function closeModal() {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.visibility = "hidden";
}

function searchbarFocus(isfocused) {
  let searchbar = document.getElementsByClassName("searchbar")[0];
  if (isfocused) {
    searchbar.style.backgroundColor = "white";
  } else {
    searchbar.style.backgroundColor = "rgb(105, 153, 187)";
  }
}

function boardNameValidation(val){
    let formButton=document.getElementsByClassName("new-board-form-button")[0];
    let boardNameValidationMessage=document.getElementsByClassName("new-board-form-input-message")[0];
    if(val.trim() == ""){
        formButton.disabled=true;
        boardNameValidationMessage.style.visibility="visible";
    }
    else{
        formButton.disabled=false;
        boardNameValidationMessage.style.visibility="hidden";
    }
}



class list {}
class card {}
