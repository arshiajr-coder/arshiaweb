let counter = 0;
function openMenu() {
  counter++;
  const nav = document.querySelector("nav");
  const navbar = document.querySelector(".navbar");
  const uper = document.querySelector(".uper-menu-mobile");
  navbar.classList.toggle("resize");
  uper.classList.toggle("uper-space-changer");
  nav.classList.toggle("show");
}

const texts = ["ربات تلگرام", "فرانت اند"];
const job = document.querySelector(".job span");

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, index++);
  job.innerText = `${letter}`;

  const timeout = setTimeout(type, 250);

  if (letter.length === currentText.length) {
    // console.log(currentText.length);
    index = 0;
    count++;
    setTimeout(back, 800)
    clearTimeout(timeout);
  }
  console.log(letter);
}

let indexBack = texts[count].length
function back() {
  letter = letter.slice(0, indexBack--);
  job.innerText = `${letter}`;
  console.log(letter);
  const timeout2 = setTimeout(back, 250);
  if (letter.length === 0) {
    console.log("letter.length === 0");
    indexBack = currentText.length - 1
    type();
    clearTimeout(timeout2)
  }
}


type();