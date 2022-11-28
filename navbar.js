function searchbarFocus(isfocused) {
  let searchbar = document.getElementsByClassName("searchbar")[0];
  if (isfocused) {
    searchbar.style.backgroundColor = "white";
  } else {
    searchbar.style.backgroundColor = "rgb(105, 153, 187)";
  }
}
