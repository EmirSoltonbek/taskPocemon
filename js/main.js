let ul = document.querySelector("ul");
let API = "https://pokeapi.co/api/v2/pokemon";
let leftButton = document.querySelector(".triangle-left");
let rightButton = document.querySelector(".triangle-right");
// ! get informations from API
async function getInfo(api = API) {
  let res = await fetch(api);
  let data = await res.json();
  let everyObj = data.results;
  everyObj.forEach((element, index) => {
    everyObj = "";
    fetch(element.url).then((res) =>
      res.json().then((data) => {
        ul.innerHTML += `
          <div onclick = "showInfo(${index})" class="card"> 
          <img src="${data.sprites.front_default}" >
          <span>${data.name}</span>
          </div>
            `;
      })
    );
  });
}
getInfo();
// ! modal window
let modal = document.querySelector(".modal");
console.log(modal);
async function showInfo(i) {
  modal.style.display = "block";
  let res = await fetch(API);
  let data = await res.json();
  let dUrl = data.results[i].url;
  modal.innerHTML = "";
  fetch(dUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      modal.innerHTML += `
      <div onclick="closeModal()" class="close">X</div>
     <img src="${data.sprites.front_default}">
     <h2>Name: ${data.name}</h2>
     <h2>Height: ${data.height}</h2>
     <h2>Weight: ${data.weight}</h2>
     `;
    });
}
//! close modal
function closeModal() {
  modal.style.display = "none";
}

//! paginacia
let nextLet = "";
let prevLet = "";

async function next() {
  ul.innerHTML = "";
  modal.style.display = "none";
  let res = await fetch(API);
  let data = await res.json();
  console.log(data);
  let nextLet = data.next;
  if (nextLet === null) {
    alert("Нажмите на левую стрелку!");
    return;
  }
  API = nextLet;
  getInfo(nextLet);
}

async function prev() {
  ul.innerHTML = "";
  modal.style.display = "none";
  let res = await fetch(API);
  let data = await res.json();
  let prevLet = data.previous;
  if (prevLet === null) {
    alert("Нажмите на правую стрелку!");
    return;
  }
  API = prevLet;
  getInfo(prevLet);
}

// ! events for buttuns
leftButton.addEventListener("click", prev);
rightButton.addEventListener("click", next);
